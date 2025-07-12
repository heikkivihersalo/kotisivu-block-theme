# Gutenberg Blocks Vite Plugin - Utils-Based Architecture

This plugin has been reorganized using a **utils-based design pattern** that maps directly to Vite configuration objects. Each util corresponds to a specific aspect of the Vite build configuration.

## 🏗️ Architecture Overview

```
.vite/
├── index.js                 # Main exports aggregator
├── GutenbergBlocksPlugin.js # Main plugin entry point
├── features/                # Feature-based modules
│   ├── blocks/             # Input configuration (config.build.rollupOptions.input)
│   │   ├── lib/            # Feature-specific functions
│   │   │   ├── createBlockInputs.js
│   │   │   └── getBlockJsonFiles.js
│   │   └── index.js        # Feature exports
│   ├── chunks/             # Chunking strategy (config.build.rollupOptions.output.manualChunks)
│   │   ├── lib/            # Feature-specific functions
│   │   │   ├── createManualChunks.js
│   │   │   └── createChunkFileNames.js
│   │   ├── helpers.js      # Shared chunk helper functions
│   │   └── index.js        # Feature exports
│   ├── externals/          # External deps (config.build.rollupOptions.external + globals)
│   │   ├── lib/            # Feature-specific functions
│   │   │   ├── createExternalFunction.js
│   │   │   └── createGlobalsMapping.js
│   │   └── index.js        # Feature exports
│   └── bundle/             # Bundle phases (generateBundle + writeBundle)
│       ├── helpers.js      # Shared utilities for bundle feature
│       ├── lib/            # Feature-specific functions
│       │   ├── createBundleGenerator.js
│       │   └── createDirectOutputOrganizer.js
│       ├── utils/          # CSS utilities sub-feature
│       │   ├── lib/        # Individual CSS utility functions
│       │   │   ├── fixCssFiles.js
│       │   │   ├── cleanupCssComments.js
│       │   │   └── removeCSSImportComments.js
│       │   └── index.js    # CSS utilities exports
│       └── index.js        # Feature exports
```

## 🎯 Features

### 1. **Input Feature** (`features/input/`)
**Vite Config**: `config.build.rollupOptions.input`

- **Purpose**: Block discovery and input configuration
- **Files**: 
  - `index.js` - Feature exports
  - `lib/createBlockInputs.js` - Block discovery and input configuration
- **Exports**: `createBlockInputs()`
- **Responsibility**: Scans for block.json files and creates Vite input entries

### 2. **Chunks Util** (`utils/chunks/`)
**Vite Config**: `config.build.rollupOptions.output.manualChunks` + `chunkFileNames`

- **Purpose**: Rollup chunking strategy and file naming
- **Files**: 
  - `index.js` - Util exports
  - `lib/createManualChunks.js` - Manual chunking logic
  - `lib/createChunkFileNames.js` - Chunk file naming strategy
  - `helpers.js` - Shared helper functions for chunk operations
- **Exports**: `createManualChunks()`, `createChunkFileNames()`
- **Responsibility**: Dynamic chunking logic, editor dependency detection

### 3. **Externals Util** (`utils/externals/`)
**Vite Config**: `config.build.rollupOptions.external` + `output.globals`

- **Purpose**: External dependencies and globals mapping
- **Files**: 
  - `index.js` - Util exports
  - `constants.js` - WordPress and third-party dependency constants
  - `lib/createExternalFunction.js` - External dependency detection
  - `lib/createGlobalsMapping.js` - WordPress globals mapping
- **Exports**: `createExternalFunction()`, `createGlobalsMapping()`
- **Responsibility**: WordPress and React externalization, globals mapping

### 4. **Bundle Util** (`utils/bundle/`)
**Vite Config**: `generateBundle` + `writeBundle` plugin hooks

- **Purpose**: Bundle generation and output organization
- **Files**: 
  - `index.js` - Util exports
  - `lib/createBundleGenerator.js` - Block.json and render.php copying
  - `lib/createDirectOutputOrganizer.js` - File organization and asset generation
  - `utils/` - CSS utilities and helpers sub-util
    - `index.js` - CSS utilities and helpers exports
    - `lib/` - Individual function files
      - `fixCssFiles.js` - CSS file extension fixing and renaming
      - `cleanupCssComments.js` - CSS comment cleanup from JS files
      - `removeCSSImportComments.js` - Single file CSS comment removal
      - `getBlockJsonFiles.js` - Block.json file discovery
      - `moveFile.js` - File moving utilities
      - `getAllFiles.js` - Recursive file discovery
      - `safeReadFile.js` - Safe file reading
      - `safeWriteFile.js` - Safe file writing
      - `generateAssetFileContent.js` - WordPress asset file generation
      - `generateFileHash.js` - File hash generation for versioning
      - `extractWordPressDependencies.js` - WordPress dependency analysis
    - `lib/removeCSSImportComments.js` - Single file CSS comment removal
- **Exports**: `createBundleGenerator()`, `createDirectOutputOrganizer()`
- **Responsibility**: WordPress asset files, CSS processing, file organization

## 📂 Util Structure Pattern

Each util follows a consistent structure:
- **`lib/`** folder contains individual function files
- **`index.js`** at util root exports all functions from lib
- Each exported function has its own file in `lib/`
- Function-specific helpers stay in the same file as the main function
- Shared helpers within a util go into a `helpers.js` file at the util root
- Utils can have sub-utils (like `bundle/utils/`) with their own `lib/` and `index.js`

## 🔄 Plugin Flow

1. **Config Phase**: Utils configure Vite build options
   ```javascript
   config.build.rollupOptions = {
     input: createBlockInputs(blocksDir),           // input util
     external: createExternalFunction(),            // externals util
     output: {
       globals: createGlobalsMapping(),             // externals util  
       manualChunks: createManualChunks(),          // chunks util
       chunkFileNames: createChunkFileNames(),      // chunks util
     }
   }
   ```

2. **Bundle Phase**: Generate additional assets
   ```javascript
   generateBundle: createBundleGenerator()          // bundle util
   ```

3. **Write Phase**: Organize output and process files
   ```javascript
   writeBundle: createDirectOutputOrganizer()      // bundle util
   ```

## 🧩 Utilities

### Bundle Util Functions (`utils/bundle/utils/lib/`)
- All helper and CSS utility functions are at the same level in the lib folder
- Each function has its own file for better modularity and maintainability
- CSS utilities: `fixCssFiles()`, `cleanupCssComments()`, `removeCSSImportComments()`
- Helper functions: `getBlockJsonFiles()`, `moveFile()`, `getAllFiles()`, `safeReadFile()`, `safeWriteFile()`
- WordPress functions: `generateAssetFileContent()`, `extractWordPressDependencies()`, `generateFileHash()`
- `removeCSSImportComments()` - Single file CSS comment removal

## ✅ Benefits of Utils-Based Design

1. **Clear Separation**: Each util maps to specific Vite configuration
2. **Single Responsibility**: Utils handle one aspect of the build process
3. **Easy Navigation**: Find code by thinking about Vite config structure
4. **Modular**: Utils can be developed/tested independently
5. **Scalable**: Easy to add new Vite configuration utils
6. **Clean Imports**: Single entry point with feature-based organization

## 🚀 Usage

```javascript
import {
  // Input feature
  createBlockInputs,
  
  // Chunks feature  
  createManualChunks,
  createChunkFileNames,
  
  // Externals feature
  createExternalFunction,
  createGlobalsMapping,
  
  // Bundle feature
  createBundleGenerator,
  createDirectOutputOrganizer
} from './index.js';
```

This architecture makes the codebase intuitive for anyone familiar with Vite configuration!
