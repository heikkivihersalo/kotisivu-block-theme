# Gutenberg Blocks Vite Plugin - Lib Structure

This directory contains the refactored and organized plugin codebase, structured for better maintainability and cleaner imports.

## Structure

```
lib/
├── index.js                 # Main export file - imports everything from subdirectories
├── discovery/               # Block discovery modules
│   └── blockDiscovery.js   # Functions to find and analyze block.json files
├── generators/              # Content generation modules
│   └── bundleGeneration.js # Bundle generation for block.json and render.php files
├── organizers/              # Output organization modules
│   ├── directOutputOrganizer.js  # Direct output during build (writeBundle)
│   └── postBuildOrganizer.js     # Post-build organization (legacy)
└── utils/                   # Utility modules
    ├── index.js            # Utility exports aggregator
    ├── chunking.js         # Rollup chunking configuration
    ├── cssProcessor.js     # CSS file processing and cleanup
    ├── externals.js        # External dependencies configuration
    ├── fileSystem.js       # File system operations
    ├── pathUtils.js        # Path manipulation utilities
    └── wordpress.js        # WordPress-specific utilities (asset files, dependencies)
```

## Usage

Import everything you need from the main index file:

```javascript
import {
	createBlockInputs,
	createBundleGenerator,
	createManualChunks,
	createChunkFileNames,
	createDirectOutputOrganizer,
	generateAssetFileContent,
	moveFile,
	// ... etc
} from './lib/index.js';
```

## Key Features

### Discovery
- **`createBlockInputs()`**: Scans for block.json files and creates Vite input configuration
- **`getBlockJsonFiles()`**: Returns array of all block.json file paths

### Generators
- **`createBundleGenerator()`**: Generates bundle files including block.json and render.php

### Organizers
- **`createDirectOutputOrganizer()`**: Handles writeBundle phase organization with direct output
- **`createPostBuildOrganizer()`**: Legacy post-build organization (kept for compatibility)

### Utilities
- **Chunking**: Dynamic chunk creation and file naming
- **CSS Processing**: Convert empty JS files to CSS, rename editor styles, clean up comments
- **WordPress Integration**: Asset file generation, dependency extraction
- **File System**: Safe file operations, directory traversal
- **Externals**: WordPress and React externalization

## Benefits

1. **Clean Imports**: Single import point with organized exports
2. **Separation of Concerns**: Each module has a specific responsibility
3. **Reusability**: Utility functions can be used independently
4. **Maintainability**: Clear structure makes code easier to understand and modify
5. **No Duplication**: Shared functionality is in utilities, referenced by organizers
