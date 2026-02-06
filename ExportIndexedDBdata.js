function exportIndexedDB() {
    return new Promise((resolve, reject) => {
        const dbRrequest = indexedDB.open("authorExcuTrust");
        //let dbRequest = indexedDB.open('your-database-name');
        dbRequest.onsuccess = function(event) {
            let db = event.target.result;
            let transaction = db.transaction(db.objectStoreNames, 'readonly');
            let exportObject = {};
            transaction.oncomplete = function() {
                resolve(JSON.stringify(exportObject));
            };
            transaction.onerror = function(event) {
                reject(event.target.error);
            };
            for (let storeName of db.objectStoreNames) {
                let allObjects = [];
                let objectStore = transaction.objectStore(storeName);
                objectStore.openCursor().onsuccess = function(event) {
                    let cursor = event.target.result;
                    if (cursor) {
                        allObjects.push(cursor.value);
                        cursor.continue();
                    } else {
                        exportObject[storeName] = allObjects;
                    }
                };
            }
        };
        dbRequest.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

exportIndexedDB().then(data => {
    console.log('Exported JSON:', data);
}).catch(error => {
    console.error('Export failed:', error);
});