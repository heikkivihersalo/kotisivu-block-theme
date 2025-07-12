# Gutenberg Blocks Vite Plugin - Feature-Based Architecture

This plugin has been reorganized using a **feature-based design pattern** that maps directly to Vite configuration objects. Each feature corresponds to a specific aspect of the Vite build configuration.

## 🏗️ Architecture Overview

```
.vite/
├── index.js                 # Main exports aggregator
├── GutenbergBlocksPlugin.js # Main plugin entry point
├── features/                # Feature-based modules
│   ├── blocks/             # Input configuration (config.build.rollupOptions.input)
│   ├── chunks/             # Chunking strategy (config.build.rollupOptions.output.manualChunks)
│   ├── externals/          # External deps (config.build.rollupOptions.external + globals)
│   └── bundle/             # Bundle phases (generateBundle + writeBundle)
└── shared/                 # Common utilities used across features
    ├── fileSystem.js       # File operations
    ├── wordpress.js        # WordPress-specific utilities
    └── pathUtils.js        # Path manipulation helpers
```

## 🎯 Features

### 1. **Blocks Feature** (`features/blocks/`)
**Vite Config**: `config.build.rollupOptions.input`

- **Purpose**: Block discovery and input configuration
- **Files**: `index.js`
- **Exports**: `createBlockInputs()`, `getBlockJsonFiles()`
- **Responsibility**: Scans for block.json files and creates Vite input entries

### 2. **Chunks Feature** (`features/chunks/`)
**Vite Config**: `config.build.rollupOptions.output.manualChunks` + `chunkFileNames`

- **Purpose**: Rollup chunking strategy and file naming
- **Files**: `index.js`
- **Exports**: `createManualChunks()`, `createChunkFileNames()`, `isModuleUsedByEditor()`
- **Responsibility**: Dynamic chunking logic, editor dependency detection

### 3. **Externals Feature** (`features/externals/`)
**Vite Config**: `config.build.rollupOptions.external` + `output.globals`

- **Purpose**: External dependencies and globals mapping
- **Files**: `index.js`
- **Exports**: `createExternalFunction()`, `createGlobalsMapping()`
- **Responsibility**: WordPress and React externalization, globals mapping

### 4. **Bundle Feature** (`features/bundle/`)
**Vite Config**: `generateBundle` + `writeBundle` plugin hooks

- **Purpose**: Bundle generation and output organization
- **Files**: 
  - `index.js` - Main exports
  - `generators.js` - Block.json and render.php copying
  - `organizers.js` - File organization and asset generation
  - `css-utils.js` - CSS processing utilities
- **Exports**: `createBundleGenerator()`, `createDirectOutputOrganizer()`
- **Responsibility**: WordPress asset files, CSS processing, file organization

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
