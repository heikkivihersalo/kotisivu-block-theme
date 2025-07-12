# Vite Plugin Architecture

## Overview

This directory contains a modular Vite plugin architecture for building WordPress blocks with proper chunking and file organization.

## Structure

```
.vite/
├── GutenbergBlocksPlugin.js    # Main plugin entry point
├── scripts/                    # Helper modules
│   ├── blockDiscovery.js      # Block entry point detection
│   ├── bundleGeneration.js    # Block.json and render.php generation
│   ├── chunking.js            # Dynamic chunk organization
│   ├── externals.js           # WordPress dependency externalization
│   └── postBuildOrganizer.js  # Post-build file organization
└── README.md                  # This file
```

## Key Features

### Dynamic Chunking Logic (`chunking.js`)

The chunking system uses **truly dynamic detection** instead of hardcoded patterns:

- **Runtime Detection**: Uses Rollup's `getModuleInfo()` to analyze actual module dependencies and imports
- **Three-Tier Categorization**: 
  - **React packages**: Goes to build root (`root-assets/react-runtime`)
  - **WordPress editor packages**: Goes to editor deps (`editor-deps/wp-editor`)  
  - **Everything else used by editors**: Goes to general editor dependencies (`editor-deps/editor-dependencies`)
- **Zero Hardcoding**: No predefined arrays of library names - everything is detected based on actual usage
- **Recursive Analysis**: Follows the import chain to detect which modules are actually used by editor files

### Post-build Organization (`postBuildOrganizer.js`)

Automatically moves files to their final destinations:

- **Editor Dependencies**: `build/test/editor/` (configurable via `editorOutputDir`)
- **Build Root Assets**: `manifest.json`, `editor.deps.json`, `react-runtime.js` → `build/`
- **Block-specific Files**: Remain in their block directories

### External Dependencies (`externals.js`)

Properly externalizes WordPress and React dependencies to prevent bundling conflicts.

### Bundle Generation (`bundleGeneration.js`)

Generates WordPress-compatible `block.json` files and PHP render templates for each block.

## Configuration

The main plugin accepts these options:

```javascript
GutenbergBlocksPlugin({
  outputDir: 'test/block-library/custom',      // Block output directory
  editorOutputDir: 'test/editor',              // Editor dependencies directory
  namespace: 'kotisivu-block-theme',           // WordPress namespace
  textDomain: 'kotisivu-block-theme'           // Text domain for i18n
})
```

## Benefits

1. **Maintainable**: Separated concerns into focused helper modules
2. **Flexible**: Easy to modify patterns and behavior without touching core logic
3. **Scalable**: Can handle any number of blocks and dependencies
4. **WordPress-compliant**: Generates proper WordPress block structure
5. **Performance-optimized**: Smart chunking reduces bundle size and improves loading

## Usage

The plugin is automatically integrated into the Vite build process. Simply run:

```bash
npm run build
```

## File Organization Results

After build completion:

```
build/
├── editor.deps.json           # Editor dependency manifest
├── manifest.json              # Block library manifest
├── react-runtime.js           # React runtime (if not externalized)
└── test/
    ├── editor/                # Editor-specific dependencies
    │   ├── classnames.js
    │   ├── project-utils.js
    │   └── ...
    └── block-library/custom/   # Individual blocks
        ├── section/
        ├── container/
        └── ...
```
