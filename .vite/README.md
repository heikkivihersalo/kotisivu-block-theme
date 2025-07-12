# Gutenberg Blocks Vite Plugin - Feature-Based Architecture

This plugin has been reorganized using a **feature-based design pattern** that maps directly to Vite configuration objects. Each feature corresponds to a specific aspect of the Vite build configuration.

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
│       ├── lib/            # Feature-specific functions
│       │   ├── generators.js
│       │   ├── organizers.js
│       │   └── css-utils.js
│       └── index.js        # Feature exports
└── shared/                 # Common utilities used across features
    ├── fileSystem.js       # File operations
    ├── wordpress.js        # WordPress-specific utilities
    └── pathUtils.js        # Path manipulation helpers
```

## 🎯 Features

### 1. **Blocks Feature** (`features/blocks/`)
**Vite Config**: `config.build.rollupOptions.input`

- **Purpose**: Block discovery and input configuration
- **Files**: 
  - `index.js` - Feature exports
  - `lib/createBlockInputs.js` - Block discovery and input configuration
  - `lib/getBlockJsonFiles.js` - Block.json file discovery
- **Exports**: `createBlockInputs()`, `getBlockJsonFiles()`
- **Responsibility**: Scans for block.json files and creates Vite input entries

### 2. **Chunks Feature** (`features/chunks/`)
**Vite Config**: `config.build.rollupOptions.output.manualChunks` + `chunkFileNames`

- **Purpose**: Rollup chunking strategy and file naming
- **Files**: 
  - `index.js` - Feature exports
  - `lib/createManualChunks.js` - Manual chunking logic
  - `lib/createChunkFileNames.js` - Chunk file naming strategy
  - `helpers.js` - Shared helper functions for chunk operations
- **Exports**: `createManualChunks()`, `createChunkFileNames()`, `isModuleUsedByEditor()`
- **Responsibility**: Dynamic chunking logic, editor dependency detection

### 3. **Externals Feature** (`features/externals/`)
**Vite Config**: `config.build.rollupOptions.external` + `output.globals`

- **Purpose**: External dependencies and globals mapping
- **Files**: 
  - `index.js` - Feature exports
  - `lib/createExternalFunction.js` - External dependency detection
  - `lib/createGlobalsMapping.js` - WordPress globals mapping
- **Exports**: `createExternalFunction()`, `createGlobalsMapping()`
- **Responsibility**: WordPress and React externalization, globals mapping

### 4. **Bundle Feature** (`features/bundle/`)
**Vite Config**: `generateBundle` + `writeBundle` plugin hooks

- **Purpose**: Bundle generation and output organization
- **Files**: 
  - `index.js` - Feature exports
  - `lib/generators.js` - Block.json and render.php copying
  - `lib/organizers.js` - File organization and asset generation
  - `lib/css-utils.js` - CSS processing utilities
- **Exports**: `createBundleGenerator()`, `createDirectOutputOrganizer()`
- **Responsibility**: WordPress asset files, CSS processing, file organization

## 📂 Feature Structure Pattern

Each feature follows a consistent structure:
- **`lib/`** folder contains individual function files
- **`index.js`** at feature root exports all functions from lib
- Each exported function has its own file in `lib/`
- Function-specific helpers stay in the same file as the main function
- Shared helpers within a feature go into a `helpers.js` file at the feature root
- Only shared/common utilities across all features are placed in the `shared/` folder

## 🔄 Plugin Flow

1. **Config Phase**: Features configure Vite build options
   ```javascript
   config.build.rollupOptions = {
     input: createBlockInputs(blocksDir),           // blocks feature
     external: createExternalFunction(),            // externals feature
     output: {
       globals: createGlobalsMapping(),             // externals feature  
       manualChunks: createManualChunks(),          // chunks feature
       chunkFileNames: createChunkFileNames(),      // chunks feature
     }
   }
   ```

2. **Bundle Phase**: Generate additional assets
   ```javascript
   generateBundle: createBundleGenerator()          // bundle feature
   ```

3. **Write Phase**: Organize output and process files
   ```javascript
   writeBundle: createDirectOutputOrganizer()      // bundle feature
   ```

## 🧩 Shared Utilities

### `shared/fileSystem.js`
- File operations used across multiple features
- Functions: `moveFile()`, `getAllFiles()`, `safeReadFile()`, `safeWriteFile()`

### `shared/wordpress.js`
- WordPress-specific functionality
- Functions: `generateAssetFileContent()`, `extractWordPressDependencies()`, `generateFileHash()`

### `shared/pathUtils.js`
- Path manipulation helpers
- Functions: `updateImportPathsWithMappings()`, `updateImportPathsForFinalLocation()`

## ✅ Benefits of Feature-Based Design

1. **Clear Separation**: Each feature maps to specific Vite configuration
2. **Single Responsibility**: Features handle one aspect of the build process
3. **Easy Navigation**: Find code by thinking about Vite config structure
4. **Modular**: Features can be developed/tested independently
5. **Scalable**: Easy to add new Vite configuration features
6. **Clean Imports**: Single entry point with feature-based organization

## 🚀 Usage

```javascript
import {
  // Blocks feature
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
