/* Help System JavaScript - 2026-02-11 */

// Help Modal System
class HelpSystem {
    constructor() {
        this.modals = {};
        this.contextMenu = null;
        this.init();
    }

    init() {
        // Create modal container if it doesn't exist
        if (!document.getElementById('helpModalContainer')) {
            const container = document.createElement('div');
            container.id = 'helpModalContainer';
            document.body.appendChild(container);
        }

        // Create context menu if it doesn't exist
        if (!document.getElementById('contextMenu')) {
            const menu = document.createElement('div');
            menu.id = 'contextMenu';
            menu.className = 'context-menu';
            document.body.appendChild(menu);
            this.contextMenu = menu;

            // Close context menu on click outside
            document.addEventListener('click', () => {
                this.hideContextMenu();
            });
        }

        // Close modals on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
                this.hideContextMenu();
            }
        });
    }

    // Create and show a help modal
    showModal(id, title, content) {
        // Create modal if it doesn't exist
        if (!this.modals[id]) {
            const modal = document.createElement('div');
            modal.id = `helpModal_${id}`;
            modal.className = 'help-modal';
            modal.innerHTML = `
                <div class="help-modal-content">
                    <div class="help-modal-header">
                        <h2 class="help-modal-title">${title}</h2>
                        <button class="help-modal-close" onclick="helpSystem.closeModal('${id}')">&times;</button>
                    </div>
                    <div class="help-modal-body">
                        ${content}
                    </div>
                </div>
            `;
            document.getElementById('helpModalContainer').appendChild(modal);
            this.modals[id] = modal;

            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(id);
                }
            });
        }

        // Show the modal
        this.modals[id].classList.add('active');
    }

    // Close specific modal
    closeModal(id) {
        if (this.modals[id]) {
            this.modals[id].classList.remove('active');
        }
    }

    // Close all modals
    closeAllModals() {
        Object.values(this.modals).forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // Show context menu
    showContextMenu(x, y, items) {
        if (!this.contextMenu) return;

        this.contextMenu.innerHTML = items.map(item => {
            if (item.divider) {
                return '<div class="context-menu-divider"></div>';
            }
            return `
                <div class="context-menu-item" onclick="${item.action}">
                    <span class="context-menu-item-icon">${item.icon || ''}</span>
                    <span>${item.label}</span>
                </div>
            `;
        }).join('');

        this.contextMenu.style.left = `${x}px`;
        this.contextMenu.style.top = `${y}px`;
        this.contextMenu.classList.add('active');

        // Adjust position if menu goes off-screen
        setTimeout(() => {
            const rect = this.contextMenu.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                this.contextMenu.style.left = `${x - rect.width}px`;
            }
            if (rect.bottom > window.innerHeight) {
                this.contextMenu.style.top = `${y - rect.height}px`;
            }
        }, 0);
    }

    // Hide context menu
    hideContextMenu() {
        if (this.contextMenu) {
            this.contextMenu.classList.remove('active');
        }
    }

    // Add tooltip to element
    addTooltip(element, text, multiline = false) {
        element.classList.add('tooltip-trigger');
        if (multiline) {
            element.classList.add('tooltip-multiline');
        }
        element.setAttribute('data-tooltip', text);
    }

    // Create help icon
    createHelpIcon(helpId, title, content, warning = false) {
        const icon = document.createElement('span');
        icon.className = `help-icon ${warning ? 'help-icon-warning' : ''}`;
        icon.innerHTML = '?';
        icon.title = 'Click for help';
        icon.onclick = () => this.showModal(helpId, title, content);
        return icon;
    }
}

// Initialize help system
const helpSystem = new HelpSystem();

// Help Content Library
const HelpContent = {
    keyPath: {
        title: "🔑 Understanding KeyPaths",
        content: `
            <div class="help-section">
                <h3>What are KeyPaths?</h3>
                <p>KeyPaths are unique identifiers used to locate records in the database. They work differently for IndexedDB and Firestore.</p>
            </div>
            
            <div class="info-box info-box-info">
                <div class="info-box-icon">💡</div>
                <div class="info-box-content">
                    <strong>Dual-Format System:</strong> The system automatically maintains two formats for compatibility with both databases.
                </div>
            </div>
            
            <h3>IndexedDB Format (Array)</h3>
            <p>Uses an array structure:</p>
            <pre><code>["groupruleStore", 1, "AUTHOR_NAME", 1, "RULE_ID", timestamp]</code></pre>
            <ul>
                <li><strong>Store Type:</strong> "groupruleStore", "trueruleStore", "questionStore"</li>
                <li><strong>Separator:</strong> 1 (numeric separator)</li>
                <li><strong>Author:</strong> Author identifier</li>
                <li><strong>ID:</strong> Record identifier</li>
                <li><strong>Timestamp:</strong> Negative version for sorting (newest first)</li>
            </ul>
            
            <h3>Firestore Format (String)</h3>
            <p>Converts the array to a string using special separators:</p>
            <pre><code>"groupruleStore!1!AUTHOR_NAME!1!RULE_ID!1! 13284567890!1!"</code></pre>
            <p>Uses <code>!1!</code> as the separator since Firestore doesn't support arrays as document IDs.</p>
            
            <div class="info-box info-box-tip">
                <div class="info-box-icon">💡</div>
                <div class="info-box-content">
                    <strong>Automatic Handling:</strong> The <code>createDualKeyPath()</code> function handles this conversion automatically. You don't need to manually manage both formats.
                </div>
            </div>
        `
    },
    
    logicTypes: {
        title: "🎯 Rule Evaluation Logic",
        content: `
            <div class="help-section">
                <h3>How Rules Are Evaluated</h3>
                <p>Collections can evaluate their rules in different ways to determine if content should be displayed.</p>
            </div>
            
            <h3>Logic Type Options:</h3>
            
            <h4>📋 ANY (Greater than 0 true)</h4>
            <p>Display content if <strong>at least one</strong> rule is true.</p>
            <div class="info-box info-box-success">
                <div class="info-box-icon">✓</div>
                <div class="info-box-content">
                    <strong>Example:</strong> Show premium features if user has ANY premium subscription.
                </div>
            </div>
            
            <h4>📋 ALL (100% true)</h4>
            <p>Display content only if <strong>all rules</strong> are true.</p>
            <div class="info-box info-box-success">
                <div class="info-box-icon">✓</div>
                <div class="info-box-content">
                    <strong>Example:</strong> Show checkout button only if ALL requirements (payment method, shipping address, items selected) are met.
                </div>
            </div>
            
            <h4>📋 Number True (Count-based)</h4>
            <ul>
                <li><strong>Greater than (>):</strong> More than X rules must be true</li>
                <li><strong>Greater than or equal (≥):</strong> At least X rules must be true</li>
                <li><strong>Less than (<):</strong> Fewer than Y rules must be true</li>
                <li><strong>Equal (=):</strong> Exactly X rules must be true</li>
            </ul>
            <div class="info-box info-box-success">
                <div class="info-box-icon">✓</div>
                <div class="info-box-content">
                    <strong>Example:</strong> Show advanced settings if ≥ 3 of 5 permission rules are true.
                </div>
            </div>
            
            <h4>📋 Percent True (% of total)</h4>
            <p>Display content if a certain <strong>percentage</strong> of rules are true.</p>
            <div class="info-box info-box-success">
                <div class="info-box-icon">✓</div>
                <div class="info-box-content">
                    <strong>Example:</strong> Show "Profile 80% Complete" badge if ≥ 80% of profile fields are filled.
                </div>
            </div>
            
            <div class="info-box info-box-warning">
                <div class="info-box-icon">⚠️</div>
                <div class="info-box-content">
                    <strong>Note:</strong> The system automatically calculates equivalent percentages and counts as you select rules.
                </div>
            </div>
        `
    },
    
    timestamps: {
        title: "⏰ Version Timestamps",
        content: `
            <div class="help-section">
                <h3>How Timestamps Work</h3>
                <p>Every record includes a timestamp to track versions and enable sorting.</p>
            </div>
            
            <h3>Negative Version Numbers</h3>
            <p>Timestamps are converted to negative numbers for sorting (newest first):</p>
            <pre><code>negativeVersion = 9999999999999 - Date.now()</code></pre>
            
            <div class="info-box info-box-info">
                <div class="info-box-icon">💡</div>
                <div class="info-box-content">
                    <strong>Why negative?</strong> IndexedDB sorts in ascending order by default. Using negative timestamps ensures newest records appear first.
                </div>
            </div>
            
            <h3>Version Storage</h3>
            <ul>
                <li><strong>versionDateSince1969:</strong> Original timestamp (milliseconds since Unix epoch)</li>
                <li><strong>firebaseVersionDateSince1969:</strong> String format for Firestore</li>
                <li><strong>localTimeString:</strong> Human-readable local time</li>
                <li><strong>UTCstring:</strong> Human-readable UTC time</li>
            </ul>
            
            <div class="info-box info-box-tip">
                <div class="info-box-icon">💡</div>
                <div class="info-box-content">
                    <strong>Automatic:</strong> The system handles timestamp conversion automatically when you save records.
                </div>
            </div>
        `
    },
    
    authors: {
        title: "👤 Authors and Ownership",
        content: `
            <div class="help-section">
                <h3>Author Management</h3>
                <p>Every record must have an author to track ownership and enable organization.</p>
            </div>
            
            <h3>Author Format</h3>
            <ul>
                <li>Must be <strong>uppercase</strong></li>
                <li>No spaces (use underscores: JOHN_DOE)</li>
                <li>Alphanumeric characters only</li>
            </ul>
            
            <div class="info-box info-box-warning">
                <div class="info-box-icon">⚠️</div>
                <div class="info-box-content">
                    <strong>Important:</strong> Author names are part of the keyPath and cannot be changed after creation.
                </div>
            </div>
            
            <h3>Best Practices</h3>
            <ul>
                <li>Use consistent naming (e.g., FIRSTNAME_LASTNAME)</li>
                <li>Consider using organizational IDs (e.g., DEPT_ADMIN)</li>
                <li>Document author meanings in your team</li>
            </ul>
        `
    },
    
    ids: {
        title: "🆔 Record IDs",
        content: `
            <div class="help-section">
                <h3>ID Requirements</h3>
                <p>IDs uniquely identify records within an author's namespace.</p>
            </div>
            
            <h3>Format Rules</h3>
            <ul>
                <li>Must be <strong>uppercase</strong></li>
                <li>Use underscores instead of spaces</li>
                <li>Should be descriptive (e.g., USER_ELIGIBILITY_RULES)</li>
                <li>Cannot be changed after creation</li>
            </ul>
            
            <div class="info-box info-box-info">
                <div class="info-box-icon">💡</div>
                <div class="info-box-content">
                    <strong>Auto-generation:</strong> Some forms auto-generate IDs from titles. You can modify them before saving.
                </div>
            </div>
            
            <h3>Best Practices</h3>
            <ul>
                <li>Use clear, descriptive names</li>
                <li>Include purpose in name (e.g., PREMIUM_USER_CHECK)</li>
                <li>Keep consistent naming conventions across your project</li>
                <li>Avoid generic names like "RULE1" or "TEST"</li>
            </ul>
        `
    }
};

// Utility functions for context menus
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard:', text);
        // You could show a toast notification here
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function showItemDetails(type, author, id) {
    console.log(`Show details for ${type}: ${author}/${id}`);
    // This would open a detail view
}

// Initialize tooltips on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add tooltips to elements with data-help attribute
    document.querySelectorAll('[data-help]').forEach(element => {
        const helpText = element.getAttribute('data-help');
        helpSystem.addTooltip(element, helpText, element.hasAttribute('data-help-multiline'));
    });
});
