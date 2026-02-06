# Project Analysis: typeScriptDevelopment2024-02-06

## 1. Project Overview
**Name:** typeScriptDevelopment2024-02-06
**Type:** Client-side Web Application (Single Page Application)
**Purpose:** A **Questionnaire Generator** that allows users to create, manage, and answer complex questionnaires with conditional display logic.
**Core Features:**
- Create Questions (Multiple types: Radio, Checkbox, Date, Modal, etc.)
- Define Rules (Logic for when to display questions)
- Build Questionnaires (Collections of questions and rules)
- Offline-first capability using local storage.

## 2. Technology Stack
- **Languages:**
    - **HTML5:** Structure (`questionGeneratorSelector.html`)
    - **CSS3:** Styling (Bootstrap 4 + Custom CSS)
    - **TypeScript:** Core Application Logic (compiled to JS)
- **Database:** **IndexedDB** (Browser-native NoSQL database)
- **Libraries:** jQuery, Bootstrap, Firebase (referenced but secondary to IndexedDB).

## 3. Architecture & Logic Flow
The application follows a monolithic, procedural architecture typical of "vanilla" web development without modern frameworks (like React/Angular).

### A. Entry Point
- **`questionGeneratorSelector.html`**: The main interface. It contains the HTML structure for all "screens" (Question Editor, Rule Editor, Questionnaire Builder), which are shown/hidden dynamically.

### B. Data Model (IndexedDB)
The database `authorExcuTrust` is defined in `setupIndexedDB.js`. It uses a **Key-Value** store approach with the following Object Stores:

| Object Store | Purpose |
| :--- | :--- |
| `questionStore` | Stores definitions of individual questions. |
| `ruleStore` | Stores logic rules (e.g., "Show Q2 if Q1 = 'Yes'"). |
| `questionnaireStore` | Stores the structure of questionnaires (lists of questions/rules). |
| `answerStore` | Stores user responses to questionnaires. |
| `groupruleStore` | Stores collections/groups of rules for complex logic. |

**Key Concepts:**
- **Composite Keys:** Uses `keyPathValue` arrays for unique identification.
- **Versioning:** Uses `versionDateSince1969` to track changes and manage updates.

### C. Core Logic (`typequestoinGeneratorSelector.ts`)
The TypeScript file contains the bulk of the application logic (~9000+ lines).

1.  **Initialization:**
    - Checks for IndexedDB support.
    - Creates/Upgrades the database schema if missing (`setupIndexedDB.js`).

2.  **UI State Management:**
    - **Visibility Toggling:** Uses CSS classes (e.g., `.hidealways`, `.missing`) to show/hide sections based on user actions (e.g., clicking "New Question").
    - **Direct DOM Manipulation:** Heavily relies on `document.getElementById()` to read inputs and update the UI.

3.  **Validation Logic:**
    - **"Missing" Class System:** A core mechanic where functions like `fixMissing()` iterate through required DOM elements. If a field is empty, it adds the `.missing` class, which visually flags the error and disables the "Save" button.

4.  **Data Persistence (CRUD):**
    - **Read:** Functions (e.g., `getDataAnswerByKeyPathValueV3`) open read-only transactions to fetch data.
    - **Write:** "Save" buttons trigger functions that scrape data from the DOM, construct a JSON object, and write it to the specific Object Store in IndexedDB.

5.  **Rule Engine:**
    - Supports **Simple Rules** (1-to-1 dependencies).
    - Supports **Group Rules** (Boolean logic: AND/OR conditions for multiple rules).

## 4. File Structure
- `questionGeneratorSelector.html`: Main UI file.
- `typequestoinGeneratorSelector.ts`: Main application logic.
- `setupIndexedDB.js`: Database schema definition and initialization.
- `questionGeneratorSelector.css`: Custom styling.
