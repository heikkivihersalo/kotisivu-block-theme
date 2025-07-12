# Gutenberg Blocks Vite Plugin - Utils-Based Architecture

This plugin has been reorganized using a **utils-based design pattern** that maps directly to Vite configuration objects. Each util corresponds to a specific aspect of the Vite build configuration.

## 🏗️ Architecture Overview

```
.vite/
├── GutenbergBlocksPlugin.js # Main plugin entry point
├── utils/                   # Utils-based modules (renamed from features/)
│   ├── index.js            # Main exports aggregator
│   ├── constants.js        # Shared constants across utils
│   ├── input/              # Input configuration (config.build.rollupOptions.input)
│   │   ├── lib/            # Util-specific functions
│   │   │   └── createBlockInputs.js
│   │   └── index.js        # Util exports
│   ├── chunks/             # Chunking strategy (config.build.rollupOptions.output.manualChunks)
│   │   ├── lib/            # Util-specific functions
│   │   │   ├── createManualChunks.js
│   │   │   └── createChunkFileNames.js
│   │   ├── helpers.js      # Shared chunk helper functions
│   │   └── index.js        # Util exports
│   ├── externals/          # External deps (config.build.rollupOptions.external + globals)
│   │   ├── lib/            # Util-specific functions
│   │   │   ├── createExternalFunction.js
│   │   │   └── createGlobalsMapping.js
│   │   ├── constants.js    # External dependencies constants
│   │   └── index.js        # Util exports
│   └── bundle/             # Bundle phases (generateBundle + writeBundle)
│       ├── lib/            # Util-specific functions
│       │   ├── createBundleGenerator.js
│       │   └── createDirectOutputOrganizer.js
│       ├── utils/          # CSS utilities sub-util
│       │   ├── lib/        # Individual helper functions (flat structure)
│       │   │   ├── fixCssFiles.js
│       │   │   ├── cleanupCssComments.js
│       │   │   ├── removeCSSImportComments.js
│       │   │   ├── generateAssetFileContent.js
│       │   │   ├── generateFileHash.js
│       │   │   ├── extractWordPressDependencies.js
│       │   │   ├── getBlockJsonFiles.js
│       │   │   ├── getAllFiles.js
│       │   │   ├── moveFile.js
│       │   │   ├── safeReadFile.js
│       │   │   └── safeWriteFile.js
│       │   └── index.js    # Helper utilities exports
│       └── index.js        # Util exports
```

## 🎯 Utils

### 1. **Input Util** (`utils/input/`)
**Vite Config**: `config.build.rollupOptions.input`

- **Purpose**: Block discovery and input configuration
- **Files**: 
  - `index.js` - Util exports
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
    - `index.js` - All helper utilities exports
    - `lib/` - Individual function files (flat structure)
      - `fixCssFiles.js` - CSS file extension fixing and renaming
      - `cleanupCssComments.js` - CSS comment cleanup from JS files
      - `removeCSSImportComments.js` - Single file CSS comment removal
      - `generateAssetFileContent.js` - WordPress asset file generation
- **Exports**: `createBundleGenerator()`, `createDirectOutputOrganizer()`
- **Responsibility**: WordPress asset files, CSS processing, file organization

## 🌍 Shared Constants

The `utils/constants.js` file contains shared constants used across multiple utils:
- **`BLOCK_PATTERNS`**: File patterns for block discovery (*.json, script extensions)
- **`WORDPRESS_FILES`**: WordPress file naming conventions (block.json, render.php, etc.)
- **`OUTPUT_PATTERNS`**: Build output conventions (index-css, style-index, etc.)
- **`CHUNK_PATTERNS`**: Chunk naming patterns for file organization (__ROOT__, __EDITOR__)

## 📂 Util Structure Pattern

Each util follows a consistent structure:
- **`lib/`** folder contains individual function files
- **`index.js`** at util root exports all functions from lib
- Each exported function has its own file in `lib/`
- Function-specific helpers stay in the same file as the main function
- Shared helpers within a util go into a `helpers.js` file at the util root
- Utils can have sub-utils (like `bundle/utils/`) with their own `lib/` and `index.js`
- Constants specific to one util go in that util's `constants.js` file

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
   writeBundle: createDirectOutputOrganizer()      // bundle util
   ```

## ✅ Benefits of Utils-Based Design

1. **Clear Separation**: Each util maps to specific Vite configuration
2. **Single Responsibility**: Utils handle one aspect of the build process
3. **Easy Navigation**: Find code by thinking about Vite config structure
4. **Modular**: Utils can be developed/tested independently
5. **Scalable**: Easy to add new Vite configuration utils
6. **Clean Imports**: Single entry point with util-based organization
7. **No Cross-Dependencies**: Utils are isolated and don't depend on each other
8. **Shared Constants**: Common patterns centralized for consistency

## 🚀 Usage

```javascript
import {
  // Input util
  createBlockInputs,
  
  // Chunks util  
  createManualChunks,
  createChunkFileNames,
  
  // Externals util
  createExternalFunction,
  createGlobalsMapping,
  
  // Bundle util
  createBundleGenerator,
  createDirectOutputOrganizer
} from './utils/index.js';
```

This architecture makes the codebase intuitive for anyone familiar with Vite configuration!
