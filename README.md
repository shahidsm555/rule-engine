# Question Generator Application

A web-based questionnaire and rule generation application with IndexedDB storage.

## Prerequisites

- Node.js installed on your system (for npx command)
- A modern web browser (Chrome, Firefox, Edge, or Safari)

## Running the Application

### Using npx http-server

The easiest way to run this application is using `npx http-server`, which serves static files without requiring installation.

First, navigate to the project directory:

```bash
cd PossibleWorkingQuestionnaires\typeScriptDevelopment2024-02-06
```

Then start the server:

```bash
npx http-server
```

This will:
- Start a local web server on port 8080 (default)
- Display the server URL in the terminal
- Serve all files from the current directory

### Custom Port

To run on a different port (e.g., 3000):

```bash
npx http-server -p 3000
```

### Additional Options

```bash
# Enable CORS
npx http-server --cors

# Open browser automatically
npx http-server -o

# Disable caching (useful for development)
npx http-server -c-1

# Combine options
npx http-server -p 3000 -o -c-1 --cors
```

## Accessing the Application

Once the server is running, open your browser and navigate to:

```
http://localhost:8080
```

Or use the specific port number if you specified a custom port.

## Main Application Files

- **index.html** - Main entry point
- **questionGeneratorSelector.html** - Question generator interface
- **ManageRules.html** - Rule management interface
- **ManageCollections.html** - Collection management interface
- **GroupRuleDemo.html** - Group rule demonstrations
- **setupIndexedDB.js** - Database initialization

## Features

- Create and manage questionnaires
- Define custom rules for question generation
- IndexedDB-based local storage
- Collection management
- Group rule support

## Development

The application uses:
- Pure JavaScript/TypeScript
- IndexedDB for data persistence
- CSS for styling
- No build process required for basic HTML/CSS/JS files

## Notes

- The application stores data locally in your browser using IndexedDB
- No backend server is required for basic functionality
- All data is stored client-side

## Stopping the Server

Press `Ctrl + C` in the terminal to stop the http-server.
