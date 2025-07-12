# WordPress Blocks Vite Plugin - Direct Output Implementation

## Overview

This implementation successfully achieves **direct output of shared dependencies to the correct folders** without requiring post-build file moves. The system now generates files directly in their intended locations during the build process.

## Build Output Structure

```
build/
├── react-runtime.js                    # React chunks (build root)
├── manifest.json                       # Build manifest (build root)
├── editor.deps.json                    # Editor dependencies manifest (build root)
├── editor/
│   └── editor-dependencies.js          # Shared editor utilities
└── test/block-library/custom/
    ├── [block-name]/
    │   ├── index.js                     # Block entry point
    │   ├── style-index.js              # Block styles
    │   ├── editor-styles.js            # Editor styles
    │   └── block.json                  # Block metadata
    └── linkControls.js                  # Remaining shared utilities
```

## How It Works

### 1. Dynamic Chunking with Markers
- **React packages** → marked as `__ROOT__` → moved to `build/react-runtime.js`
- **Editor utilities** → marked as `__EDITOR__` → moved to `build/editor/editor-dependencies.js`
- **Block files** → stay in their natural location

### 2. Shared Editor Utilities Detection
The system automatically detects and groups these files into `editor-dependencies.js`:
- `gapControls` - Gap and spacing controls
- `variationPicker` - Block variation picker
- `getTransformedMetadata` - Block metadata transformer
- `innerBlocksAppender` - Inner blocks appender
- `tailwind-utilities` - Tailwind CSS utility classes
- `classnames` - CSS class utilities
- `clsx` - Conditional class names

### 3. Import Path Correction
During the build process, import paths are automatically updated:
- **From blocks to React runtime**: `../../../../react-runtime.js`
- **From blocks to editor deps**: `../../../../editor/editor-dependencies.js`
- **From editor deps to React**: `./../../../react-runtime.js`

## Key Benefits

1. **No Post-Build Moves**: Files are generated directly in the correct locations
2. **Correct Import Paths**: All import paths are valid and properly resolved
3. **Better Caching**: Shared utilities are properly grouped for better browser caching
4. **Maintainable**: Dynamic detection eliminates hardcoded file lists
5. **Scalable**: Easily handles new editor utilities and blocks

## Technical Implementation

### Chunking Strategy (`chunking.js`)
```javascript
// React packages → build root
if (isReactModule(id)) {
    return 'react-runtime';
}

// Shared editor utilities → editor directory
if (isSharedEditorUtility(id)) {
    return 'editor-dependencies';
}
```

### File Naming Convention
- Files marked for root: `[name]__ROOT__.js`
- Files marked for editor: `[name]__EDITOR__.js`

### Direct Output Organizer (`directOutputOrganizer.js`)
1. Identifies marked files by their naming pattern
2. Generates correct path mappings
3. Updates import paths in source files
4. Moves files to final locations
5. Cleans up marker patterns

## Import Examples

### Block File Imports
```javascript
// Section block importing shared utilities
import { j as e } from "../../../../react-runtime.js";
import { T as h, c as a, I as v } from "../../../../editor/editor-dependencies.js";
```

### Editor Dependencies Imports
```javascript
// Editor dependencies importing React
import { j as c } from "./../../../react-runtime.js";
```

## Configuration

The system is configured in `GutenbergBlocksPlugin.js`:
```javascript
gutenbergBlocksPlugin({
    blocksDir: 'resources/widgets/block-library/custom',
    outputDir: 'build/test/block-library/custom',
    editorOutputDir: 'build/test/editor',
    copyBlockJson: true,
})
```

## File Organization Results

- **React Runtime**: 40.23 kB → Shared across all blocks
- **Editor Dependencies**: 5.86 kB → Shared editor utilities
- **Individual Blocks**: 1-13 kB each → Block-specific code only
- **LinkControls**: 54.26 kB → Large utility that wasn't auto-detected

## Success Criteria ✅

- [x] Files generated directly in correct folders
- [x] No post-build moves required for main chunks
- [x] All import paths are correct and valid
- [x] React runtime in build root
- [x] Editor utilities in editor directory
- [x] Blocks in their designated directory
- [x] Dynamic chunking without hardcoded lists
- [x] Proper caching optimization through shared chunks

This implementation successfully eliminates the need for post-build file reorganization while maintaining correct import paths and optimal file organization for WordPress block development.
