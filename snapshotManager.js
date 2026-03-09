/**
 * snapshotManager.js
 * 2026-02-26
 *
 * Implements the Two-Folder snapshot architecture:
 *  - Historical folder  → existing questionStore / ruleStore / groupruleStore
 *                         (author-managed, mirrors Firestore)
 *  - Snapshot folder    → snapshotStore (per-document frozen JSON in IndexedDB)
 *  - Audit trail        → diffLogStore
 *
 * rendering pipeline:
 *  1. Priority-sort manifest (triggersComplete first, then displayed, then indent)
 *  2. Embed displayedData (~6-12%) into DocumentFragment — single DOM paste
 *  3. IntersectionObserver lazy-loads pendingChunks on scroll
 *
 * Version deduplication:  items already in local store at same versionDateSince1969
 * are NOT re-downloaded from Firestore.
 *
 * Depends on: setupIndexedDB.js (must be loaded first)
 */

'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const SNAPSHOT_DB        = 'authorExcuTrust';
const SNAPSHOT_STORE     = 'snapshotStore';
const DIFF_LOG_STORE     = 'diffLogStore';
const QUESTION_STORE     = 'questionStore';
const RULE_STORE         = 'ruleStore';
const QUESTIONNAIRE_STORE = 'questionnaireStore';
const ANSWER_STORE       = 'answerStore';

/**
 * Starting chunk size for lazy loading.
 * Experiment: increase toward 200 if device profiling allows.
 * We handle 1,000-element arrays fine today — 100/chunk is conservative.
 */
const DEFAULT_CHUNK_SIZE = 100;

// ─────────────────────────────────────────────────────────────────────────────
// Low-level IndexedDB helpers (Promise wrappers)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Open authorExcuTrust and return a Promise<IDBDatabase>.
 */
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(SNAPSHOT_DB);
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}

/**
 * Read one record from a store by keyPathValue array or string key.
 * @param {string} storeName
 * @param {Array|string} key
 * @returns {Promise<any>}
 */
async function dbGet(storeName, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req   = store.get(key);
    tx.oncomplete = () => { db.close(); resolve(req.result); };
    tx.onerror    = () => { db.close(); reject(tx.error); };
  });
}

/**
 * Read ALL records from a store.
 * @param {string} storeName
 * @returns {Promise<Array>}
 */
async function dbGetAll(storeName) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req   = store.getAll();
    tx.oncomplete = () => { db.close(); resolve(req.result || []); };
    tx.onerror    = () => { db.close(); reject(tx.error); };
  });
}

/**
 * Write one record (put — insert or replace).
 * @param {string} storeName
 * @param {Object} record
 * @returns {Promise<void>}
 */
async function dbPut(storeName, record) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    store.put(record);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror    = () => { db.close(); reject(tx.error); };
  });
}

/**
 * Batch-put an array of records into one store in a single transaction.
 * @param {string} storeName
 * @param {Array<Object>} records
 * @returns {Promise<void>}
 */
async function dbBatchPut(storeName, records) {
  if (!records || records.length === 0) return;
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    records.forEach(r => store.put(r));
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror    = () => { db.close(); reject(tx.error); };
  });
}

/**
 * Read multiple records from multiple stores in a single transaction.
 * Returns { storeName: { itemKey: record, ... }, ... }
 * @param {Array<{ store: string, key: Array|string }>} requests
 * @returns {Promise<Object>}
 */
async function dbBatchGetMultiStore(requests) {
  if (!requests || requests.length === 0) return {};
  // Group by store so we can open a minimal transaction
  const byStore = {};
  requests.forEach(r => {
    if (!byStore[r.store]) byStore[r.store] = [];
    byStore[r.store].push(r.key);
  });
  const storeNames = Object.keys(byStore);
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx      = db.transaction(storeNames, 'readonly');
    const results = {};
    storeNames.forEach(sn => { results[sn] = {}; });
    const pending = [];
    storeNames.forEach(sn => {
      const store = tx.objectStore(sn);
      byStore[sn].forEach(key => {
        const req = store.get(key);
        pending.push({ sn, key, req });
      });
    });
    tx.oncomplete = () => {
      db.close();
      pending.forEach(p => {
        const keyStr = JSON.stringify(p.key);
        results[p.sn][keyStr] = p.req.result;
      });
      resolve(results);
    };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Indent-aware sort key
// Converts "3.2.1" → [3, 2, 1] for correct numeric ordering
// So "3.10" sorts after "3.9", not before "3.2"
// ─────────────────────────────────────────────────────────────────────────────

function indentSortKey(rowId) {
  return String(rowId).split('.').map(n => parseInt(n, 10) || 0);
}

function compareIndent(a, b) {
  const ka = indentSortKey(a);
  const kb = indentSortKey(b);
  for (let i = 0; i < Math.max(ka.length, kb.length); i++) {
    const diff = (ka[i] || 0) - (kb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// sourceRef field builder
// Added to any questionnaireStore row that was inserted from another questionnaire
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build a sourceRef object when inserting a row from a source questionnaire.
 * @param {Object} opts
 * @param {string} opts.sourceStore          - "questionnaireStore"
 * @param {string} opts.sourceAuthor
 * @param {string} opts.sourceQuestionnaireId
 * @param {string} opts.sourceRowPosition    - e.g. "3.2.1" in the source
 * @param {number} opts.sourceVersionDate    - versionDateSince1969 at time of pull
 * @param {string} opts.insertedBy           - current user/author
 * @returns {Object}
 */
function buildSourceRef(opts) {
  return {
    sourceStore:           opts.sourceStore          || 'questionnaireStore',
    sourceAuthor:          opts.sourceAuthor          || '',
    sourceQuestionnaireId: opts.sourceQuestionnaireId || '',
    sourceRowPosition:     opts.sourceRowPosition     || '',
    sourceVersionDate:     opts.sourceVersionDate     || 0,
    insertedAt:            Date.now(),
    insertedBy:            opts.insertedBy            || ''
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Manifest sort
// Order: 1) triggersComplete=true  2) displayed=true  3) indent asc
// ─────────────────────────────────────────────────────────────────────────────

function sortManifest(manifest) {
  return [...manifest].sort((a, b) => {
    // 1. Rows whose triggers are completed come first
    if (a.triggersComplete !== b.triggersComplete)
      return a.triggersComplete ? -1 : 1;
    // 2. Displayed rows before hidden
    if (a.displayed !== b.displayed)
      return a.displayed ? -1 : 1;
    // 3. Indent order within each group
    return compareIndent(a.rowId, b.rowId);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// buildSnapshot
// Assembles a snapshotStore record from the questionnaire's row manifest.
// Checks local store versions first — only fetches stale/missing items.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build and save a snapshot for a document.
 * Call this when a user opens a new report/engagement document for the first time,
 * or explicitly chooses "Refresh Snapshot".
 *
 * @param {Object} opts
 * @param {string}  opts.snapshotId       - unique ID, e.g. "DrSmith!1!Engagement2026!1!report01"
 * @param {string}  opts.documentTitle
 * @param {Array}   opts.questionnaireKeyPath - keyPathValue of the source questionnaire
 * @param {Function} [opts.onProgress]    - optional callback(loaded, total)
 * @param {Function} [opts.fetchFromCloud] - async fn(itemKeys[]) → records[]
 *                                           Provide this when Firestore integration is active.
 *                                           If omitted, only local IndexedDB is used.
 * @param {number}  [opts.chunkSize]      - rows per lazy-load chunk (default 100)
 * @returns {Promise<Object>} the saved snapshot record
 */
async function buildSnapshot(opts) {
  const {
    snapshotId,
    documentTitle,
    questionnaireKeyPath,
    onProgress,
    fetchFromCloud,
    chunkSize = DEFAULT_CHUNK_SIZE
  } = opts;

  console.log(`[snapshotManager] buildSnapshot START  snapshotId=${snapshotId}`);

  // 1. Load the questionnaire definition from local store
  const qnRecord = await dbGet(QUESTIONNAIRE_STORE, questionnaireKeyPath);
  if (!qnRecord) {
    throw new Error(`[snapshotManager] Questionnaire not found: ${JSON.stringify(questionnaireKeyPath)}`);
  }

  // 2. Build raw manifest from the questionnaire's row list
  //    questionnaireStore rows are expected to have a structure like:
  //    { rowId, itemKey (keyPathValueFireBase string), displayed, triggersComplete, ... }
  //    We tolerate the existing flat array format and normalise below.
  const rawRows = _extractRows(qnRecord);
  console.log(`[snapshotManager] rawRows count: ${rawRows.length}`);

  // 3. Check local stores for each item — collect version dates in one batch read
  const localVersionMap = await _batchGetLocalVersions(rawRows);

  // 4. Determine which items are stale/missing vs. already up to date
  const toFetchKeys    = [];
  const localItems     = {};

  for (const row of rawRows) {
    const cloudVersion = row.cloudVersionDate || 0;
    const localRecord  = localVersionMap[row.itemKey];
    const localVersion = localRecord ? (localRecord.versionDateSince1969 || 0) : 0;

    if (!localRecord || localVersion < cloudVersion) {
      toFetchKeys.push(row);
    } else {
      localItems[row.itemKey] = localRecord;
    }
  }

  console.log(`[snapshotManager] local hits: ${Object.keys(localItems).length}  ` +
              `need cloud fetch: ${toFetchKeys.length}`);

  // 5. Fetch stale/missing items from cloud (if fetchFromCloud provided)
  let fetchedItems = {};
  if (toFetchKeys.length > 0 && typeof fetchFromCloud === 'function') {
    const fetched = await fetchFromCloud(toFetchKeys.map(r => r.itemKey));
    for (const record of fetched) {
      const key = _itemKeyFromRecord(record);
      fetchedItems[key] = record;
      // Persist to local store immediately so next snapshot doesn't re-fetch
      const storeName = _storeNameFromItemKey(key);
      if (storeName) {
        await dbPut(storeName, record);
      }
    }
    console.log(`[snapshotManager] fetched from cloud & saved: ${fetched.length}`);
  } else if (toFetchKeys.length > 0 && typeof fetchFromCloud !== 'function') {
    // No cloud function — use whatever local data exists (offline mode)
    for (const row of toFetchKeys) {
      if (localVersionMap[row.itemKey]) {
        fetchedItems[row.itemKey] = localVersionMap[row.itemKey];
      }
    }
  }

  // 6. Merge all available data
  const allItems = Object.assign({}, localItems, fetchedItems);

  // 7. Load current answer states to determine triggersComplete
  const answerMap = await _loadAnswerTriggers(snapshotId);

  // 8. Annotate rows with display/trigger state
  const annotatedRows = rawRows.map(row => ({
    rowId:            row.rowId,
    itemKey:          row.itemKey,
    displayed:        row.displayed || false,
    triggersComplete: answerMap[row.rowId] || false,
    chunkId:          0  // assigned below
  }));

  // 9. Sort manifest
  const sortedManifest = sortManifest(annotatedRows);

  // 10. Separate displayed vs. pending
  const displayedRows = sortedManifest.filter(r => r.displayed);
  const pendingRows   = sortedManifest.filter(r => !r.displayed);

  // 11. Build displayedData — embed full objects for displayed rows only
  const displayedData = {};
  for (const row of displayedRows) {
    if (allItems[row.itemKey]) {
      displayedData[row.itemKey] = allItems[row.itemKey];
    }
  }

  // 12. Build pendingChunks
  const pendingChunks = [];
  for (let i = 0; i < pendingRows.length; i += chunkSize) {
    const slice   = pendingRows.slice(i, i + chunkSize);
    const chunkId = pendingChunks.length + 1;
    slice.forEach(r => { r.chunkId = chunkId; });
    pendingChunks.push({
      chunkId,
      rowIds:   slice.map(r => r.rowId),
      itemKeys: slice.map(r => r.itemKey),
      loaded:   false
    });
  }

  // 13. Assemble snapshot record
  const snapshot = {
    snapshotId,
    documentTitle,
    snapshotVersion:  Date.now(),
    builtFromSource:  JSON.stringify(questionnaireKeyPath),
    chunkSize,
    manifest:         sortedManifest,
    displayedData,
    pendingChunks
  };

  // 14. Save to snapshotStore
  await dbPut(SNAPSHOT_STORE, snapshot);
  console.log(`[snapshotManager] buildSnapshot DONE  ` +
    `displayed=${displayedRows.length}  pending=${pendingRows.length}  ` +
    `chunks=${pendingChunks.length}`);

  if (typeof onProgress === 'function') {
    onProgress(rawRows.length, rawRows.length);
  }

  return snapshot;
}

// ─────────────────────────────────────────────────────────────────────────────
// renderSnapshotToDOM
// Renders the displayed portion via DocumentFragment (single DOM paste),
// then lazy-loads pendingChunks with IntersectionObserver.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render a snapshot into a container element.
 *
 * @param {Object}      snapshotRecord   - from snapshotStore
 * @param {HTMLElement} containerEl      - DOM container to render into
 * @param {Function}    [buildRowElement] - fn(rowId, itemKey, data) → HTMLElement
 *                                          If omitted a default renderer is used.
 * @returns {Promise<void>}
 */
async function renderSnapshotToDOM(snapshotRecord, containerEl, buildRowElement) {
  if (!snapshotRecord || !containerEl) {
    console.error('[snapshotManager] renderSnapshotToDOM: missing snapshotRecord or containerEl');
    return;
  }

  const renderer = typeof buildRowElement === 'function' ? buildRowElement : _defaultRowRenderer;

  const displayedRows = snapshotRecord.manifest.filter(r => r.displayed);
  console.log(`[snapshotManager] rendering ${displayedRows.length} displayed rows via DocumentFragment`);

  // ── Step 1: Build DocumentFragment for displayed rows ─────────────────────
  const frag = document.createDocumentFragment();
  for (const row of displayedRows) {
    const data  = snapshotRecord.displayedData[row.itemKey];
    const rowEl = renderer(row.rowId, row.itemKey, data, row);
    frag.appendChild(rowEl);
  }
  // Single DOM write for all displayed content
  containerEl.appendChild(frag);

  // ── Step 2: Insert sentinel divs for each pending chunk ───────────────────
  for (const chunk of snapshotRecord.pendingChunks) {
    if (chunk.loaded) continue;
    const sentinel = document.createElement('div');
    sentinel.className            = 'lazy-sentinel';
    sentinel.dataset.chunkId      = chunk.chunkId;
    sentinel.dataset.snapshotId   = snapshotRecord.snapshotId;
    sentinel.style.height         = '1px';
    sentinel.style.pointerEvents  = 'none';
    containerEl.appendChild(sentinel);
  }

  // ── Step 3: IntersectionObserver lazy-loads chunks as they near viewport ──
  if (snapshotRecord.pendingChunks.length > 0) {
    _attachLazyLoader(snapshotRecord, containerEl, renderer);
  }
}

/**
 * Attach an IntersectionObserver to lazy-load pending chunks.
 * Internal — called by renderSnapshotToDOM.
 */
function _attachLazyLoader(snapshotRecord, containerEl, renderer) {
  const observer = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const chunkId = Number(entry.target.dataset.chunkId);
      const chunk   = snapshotRecord.pendingChunks.find(c => c.chunkId === chunkId);
      if (!chunk || chunk.loaded) continue;

      chunk.loaded = true;
      observer.unobserve(entry.target);

      console.log(`[snapshotManager] lazy-loading chunk ${chunkId} (${chunk.itemKeys.length} items)`);
      await _loadAndRenderChunk(chunk, entry.target, snapshotRecord, containerEl, renderer);
    }
  }, { rootMargin: '200px' });  // start loading 200px before item enters viewport

  containerEl.querySelectorAll('.lazy-sentinel').forEach(s => observer.observe(s));
}

/**
 * Fetch a chunk's items from local IndexedDB and insert them before the sentinel.
 */
async function _loadAndRenderChunk(chunk, sentinelEl, snapshotRecord, containerEl, renderer) {
  // Build batch-get requests: resolve each itemKey to store + key
  const requests = chunk.itemKeys.map(itemKey => {
    const storeName = _storeNameFromItemKey(itemKey);
    const key       = _keyPathFromItemKey(itemKey);
    return { store: storeName, key };
  });

  const results = await dbBatchGetMultiStore(requests);

  const frag = document.createDocumentFragment();
  chunk.rowIds.forEach((rowId, idx) => {
    const itemKey  = chunk.itemKeys[idx];
    const storeName = _storeNameFromItemKey(itemKey);
    const keyStr    = JSON.stringify(_keyPathFromItemKey(itemKey));
    const data      = results[storeName] ? results[storeName][keyStr] : undefined;
    const manifestRow = snapshotRecord.manifest.find(m => m.rowId === rowId);
    const rowEl     = renderer(rowId, itemKey, data, manifestRow || {});
    frag.appendChild(rowEl);
  });

  // Insert before sentinel so the visual order is preserved
  containerEl.insertBefore(frag, sentinelEl);

  // Update snapshot in IndexedDB so reloads know this chunk was loaded
  snapshotRecord.pendingChunks.find(c => c.chunkId === chunk.chunkId).loaded = true;
  await dbPut(SNAPSHOT_STORE, snapshotRecord);
}

// ─────────────────────────────────────────────────────────────────────────────
// updateSnapshotDisplayState
// Call this when a trigger answer changes and reveals a new row.
// Moves the row from pendingChunks into displayedData and re-sorts manifest.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Mark a row as displayed (trigger fired) and update the snapshot.
 * Render the newly displayed row immediately via DocumentFragment.
 *
 * @param {string}      snapshotId
 * @param {string}      rowId
 * @param {HTMLElement} containerEl
 * @param {Function}    [buildRowElement]
 * @returns {Promise<void>}
 */
async function updateSnapshotDisplayState(snapshotId, rowId, containerEl, buildRowElement) {
  const snapshot = await dbGet(SNAPSHOT_STORE, snapshotId);
  if (!snapshot) {
    console.error(`[snapshotManager] updateSnapshotDisplayState: snapshot not found ${snapshotId}`);
    return;
  }

  const manifestRow = snapshot.manifest.find(m => m.rowId === rowId);
  if (!manifestRow || manifestRow.displayed) return;  // already displayed or not found

  // Mark as displayed
  manifestRow.displayed        = true;
  manifestRow.triggersComplete = true;

  // Fetch the full data object from local store
  const storeName = _storeNameFromItemKey(manifestRow.itemKey);
  const key       = _keyPathFromItemKey(manifestRow.itemKey);
  const data      = await dbGet(storeName, key);

  // Add to displayedData
  if (data) {
    snapshot.displayedData[manifestRow.itemKey] = data;
  }

  // Remove from whichever pendingChunk it lives in
  for (const chunk of snapshot.pendingChunks) {
    const idx = chunk.rowIds.indexOf(rowId);
    if (idx !== -1) {
      chunk.rowIds.splice(idx, 1);
      chunk.itemKeys.splice(idx, 1);
      break;
    }
  }

  // Re-sort manifest
  snapshot.manifest = sortManifest(snapshot.manifest);

  // Persist updated snapshot
  await dbPut(SNAPSHOT_STORE, snapshot);

  // Render the newly visible row immediately via DocumentFragment
  if (containerEl && data) {
    const renderer = typeof buildRowElement === 'function' ? buildRowElement : _defaultRowRenderer;
    const frag  = document.createDocumentFragment();
    const rowEl = renderer(rowId, manifestRow.itemKey, data, manifestRow);
    frag.appendChild(rowEl);

    // Find the correct insertion point by indent order
    const allRows = containerEl.querySelectorAll('[data-row-id]');
    let insertBefore = null;
    for (const existing of allRows) {
      if (compareIndent(rowId, existing.dataset.rowId) < 0) {
        insertBefore = existing;
        break;
      }
    }
    if (insertBefore) {
      containerEl.insertBefore(frag, insertBefore);
    } else {
      containerEl.appendChild(frag);
    }
  }

  console.log(`[snapshotManager] row ${rowId} marked displayed in snapshot ${snapshotId}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// generateDiffReport
// Compares a snapshot's displayedData against a current-version map.
// Returns a report object + saves it to diffLogStore.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Compare snapshot against current Historical versions.
 *
 * @param {Object} snapshotRecord
 * @param {Object} currentHistoricalVersionMap
 *        { itemKey: { versionDateSince1969, ...fields } }
 *        Build this by reading the current questionStore/ruleStore after a cloud sync.
 * @returns {Promise<Object>} diff report (also saved to diffLogStore)
 */
async function generateDiffReport(snapshotRecord, currentHistoricalVersionMap) {
  const report = {
    keyPathValue:      ['diffLogStore', snapshotRecord.snapshotId, Date.now()],
    documentId:        snapshotRecord.snapshotId,
    documentTitle:     snapshotRecord.documentTitle,
    snapshotVersion:   snapshotRecord.snapshotVersion,
    reportGeneratedAt: Date.now(),
    summary: {
      identical:  0,
      updated:    0,
      deletedFromHistorical: 0,
      newInHistorical: 0
    },
    items: []
  };

  const snapshotKeys  = new Set(Object.keys(snapshotRecord.displayedData));
  const historicalKeys = new Set(Object.keys(currentHistoricalVersionMap));

  // Items in snapshot — check if updated or deleted in Historical
  for (const key of snapshotKeys) {
    const snap    = snapshotRecord.displayedData[key];
    const current = currentHistoricalVersionMap[key];

    if (!current) {
      report.items.push({
        itemKey:         key,
        status:          'deleted_from_historical',
        snapshotVersion: snap.versionDateSince1969 || 0,
        currentVersion:  null
      });
      report.summary.deletedFromHistorical++;
    } else if ((current.versionDateSince1969 || 0) !== (snap.versionDateSince1969 || 0)) {
      report.items.push({
        itemKey:         key,
        status:          'updated',
        snapshotVersion: snap.versionDateSince1969     || 0,
        currentVersion:  current.versionDateSince1969  || 0,
        isNewer:         (current.versionDateSince1969 || 0) > (snap.versionDateSince1969 || 0)
      });
      report.summary.updated++;
    } else {
      report.summary.identical++;
      // Don't store identical items by default — verbose mode would add them
    }
  }

  // Items new in Historical that the snapshot doesn't contain
  for (const key of historicalKeys) {
    if (!snapshotKeys.has(key)) {
      report.items.push({
        itemKey:        key,
        status:         'new_in_historical',
        snapshotVersion: null,
        currentVersion: currentHistoricalVersionMap[key].versionDateSince1969 || 0
      });
      report.summary.newInHistorical++;
    }
  }

  await dbPut(DIFF_LOG_STORE, report);
  console.log(`[snapshotManager] diff report saved  ` +
    `identical=${report.summary.identical}  updated=${report.summary.updated}  ` +
    `deleted=${report.summary.deletedFromHistorical}  new=${report.summary.newInHistorical}`);

  return report;
}

// ─────────────────────────────────────────────────────────────────────────────
// getDiffReportsForDocument
// Return all saved diff reports for a given document.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {string} snapshotId
 * @returns {Promise<Array>}
 */
async function getDiffReportsForDocument(snapshotId) {
  const all = await dbGetAll(DIFF_LOG_STORE);
  return all.filter(r => r.documentId === snapshotId)
            .sort((a, b) => b.reportGeneratedAt - a.reportGeneratedAt);
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Extract a normalised row list from a questionnaireStore record.
 * Handles the existing flat-array format.
 * Each row gets: { rowId, itemKey, displayed, cloudVersionDate }
 */
function _extractRows(qnRecord) {
  // The existing format stores rows in questionnaireRow (a flat array).
  // Each element is expected to have at least:
  //   keyPathValue (array)  — the full IndexedDB key of the question/rule
  //   id or rowId           — the visible indent number, e.g. "3.2.1"
  //   displayed             — boolean
  //   versionDateSince1969  — the author's version when this questionnaire was built
  //
  // We also accept keyPathValueFireBase (string) as itemKey directly.

  const rawArray = qnRecord.questionnaireRow || qnRecord.rows || [];
  return rawArray.map((row, idx) => {
    const itemKey = row.keyPathValueFireBase
      || (Array.isArray(row.keyPathValue) ? row.keyPathValue.join('!1!') : String(row.keyPathValue || idx));

    return {
      rowId:            String(row.rowId || row.id || (idx + 1)),
      itemKey,
      displayed:        row.displayed       || false,
      cloudVersionDate: row.versionDateSince1969 || 0
    };
  });
}

/**
 * Batch-read versionDateSince1969 from local questionStore + ruleStore
 * for an array of rows. Returns { itemKey: localRecord, ... }.
 */
async function _batchGetLocalVersions(rows) {
  const requests = rows.map(row => {
    const storeName = _storeNameFromItemKey(row.itemKey);
    const key       = _keyPathFromItemKey(row.itemKey);
    return { store: storeName, key };
  });

  const rawResults = await dbBatchGetMultiStore(requests);
  const versionMap = {};

  rows.forEach(row => {
    const storeName = _storeNameFromItemKey(row.itemKey);
    const keyStr    = JSON.stringify(_keyPathFromItemKey(row.itemKey));
    const record    = rawResults[storeName] && rawResults[storeName][keyStr];
    if (record) versionMap[row.itemKey] = record;
  });

  return versionMap;
}

/**
 * Load completed trigger answers from answerStore for a given document.
 * Returns { rowId: true } for rows whose triggers have fired.
 */
async function _loadAnswerTriggers(snapshotId) {
  try {
    const all = await dbGetAll(ANSWER_STORE);
    const map = {};
    // Answers whose keyPathValue includes the snapshotId are for this document.
    // If the answer has a trueFalseValues containing a true entry, the trigger is complete.
    all.forEach(answer => {
      const kp = answer.keyPathValue;
      if (!Array.isArray(kp)) return;
      // Find the rowId pattern — it's contextual; store the rowId if this answer is truthy
      if (answer.trueFalseValues) {
        let hasTruth = false;
        const tv = answer.trueFalseValues;
        if (typeof tv === 'string') {
          try { hasTruth = JSON.parse(tv).some(v => v === true); } catch(e) {}
        } else if (Array.isArray(tv)) {
          hasTruth = tv.some(v => v === true);
        }
        if (hasTruth && answer.questionDestination) {
          const dest = Array.isArray(answer.questionDestination)
            ? answer.questionDestination : [answer.questionDestination];
          dest.forEach(d => { map[String(d)] = true; });
        }
      }
    });
    return map;
  } catch (e) {
    console.warn('[snapshotManager] _loadAnswerTriggers error (non-fatal):', e);
    return {};
  }
}

/**
 * Derive the store name from a !1!-separated itemKey string.
 * e.g. "questionStore!1!DrSmith!1!Q-intro" → "questionStore"
 *      "ruleStore!1!DrSmith!1!R-risk" → "ruleStore"
 */
function _storeNameFromItemKey(itemKey) {
  if (!itemKey) return QUESTION_STORE;
  const first = itemKey.split('!1!')[0];
  if (first === RULE_STORE || first === 'ruleStore')            return RULE_STORE;
  if (first === 'groupruleStore')                               return 'groupruleStore';
  if (first === QUESTIONNAIRE_STORE || first === 'questionnaireStore') return QUESTIONNAIRE_STORE;
  return QUESTION_STORE;  // default
}

/**
 * Convert a !1!-separated itemKey back to the IndexedDB keyPathValue array.
 * e.g. "questionStore!1!DrSmith!1!1!1!Q-intro" → ["questionStore",1,"DrSmith",1,"Q-intro"]
 */
function _keyPathFromItemKey(itemKey) {
  if (!itemKey) return [];
  return itemKey.split('!1!').map(part => {
    const n = Number(part);
    return isNaN(n) ? part : n;
  });
}

/**
 * Derive itemKey from a record using keyPathValueFireBase or keyPathValue.
 */
function _itemKeyFromRecord(record) {
  if (record.keyPathValueFireBase) return record.keyPathValueFireBase;
  if (Array.isArray(record.keyPathValue)) return record.keyPathValue.join('!1!');
  return String(record.keyPathValue || '');
}

/**
 * Default row renderer — creates a minimal div with data attributes.
 * Replace with your real question/rule renderer.
 *
 * @param {string} rowId
 * @param {string} itemKey
 * @param {Object|undefined} data
 * @param {Object} manifestRow
 * @returns {HTMLElement}
 */
function _defaultRowRenderer(rowId, itemKey, data, manifestRow) {
  const div = document.createElement('div');
  div.className        = 'questionnaire-row';
  div.dataset.rowId    = rowId;
  div.dataset.itemKey  = itemKey;

  // Indent depth = number of dots in rowId
  const depth = (rowId.match(/\./g) || []).length;
  div.style.marginLeft = `${depth * 1.5}rem`;

  if (data) {
    const label = document.createElement('div');
    label.className   = 'questionnaire-row-label';
    label.textContent = `${rowId}. ${data.questionContent || data.ruleContent || data.groupruleContent || itemKey}`;
    div.appendChild(label);
  } else {
    div.textContent = `${rowId}. [loading…]`;
    div.classList.add('row-loading');
  }

  if (manifestRow && manifestRow.triggersComplete) {
    div.classList.add('trigger-complete');
  }

  return div;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

window.snapshotManager = {
  // Core operations
  buildSnapshot,
  renderSnapshotToDOM,
  updateSnapshotDisplayState,

  // Diff / audit trail
  generateDiffReport,
  getDiffReportsForDocument,

  // Utilities (exposed for testing / extension)
  buildSourceRef,
  sortManifest,
  compareIndent,

  // Low-level DB helpers (exposed so existing code can reuse them)
  dbGet,
  dbGetAll,
  dbPut,
  dbBatchPut,
  dbBatchGetMultiStore,

  // Constants
  SNAPSHOT_STORE,
  DIFF_LOG_STORE,
  DEFAULT_CHUNK_SIZE
};
