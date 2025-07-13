# Gutenberg Blocks Plugin

A Vite plugin for building WordPress Gutenberg blocks with optimal chunking and asset organization.

## Directory Structure

```
GutenbergPlugin/
├── index.js                    # Main plugin entry point
├── config/                     # Configuration modules
│   ├── constants.js           # Shared constants and patterns
│   ├── input.js               # Block input discovery and validation
│   ├── externals.js           # WordPress external dependencies
│   └── chunks.js              # Chunking logic for frontend/editor separation
└── processors/                # Build processors
    ├── bundle.js              # Bundle generation (manifest, block.json copying)
    └── css.js                 # CSS processing and splitting
```

## Features

- **Dynamic Block Discovery**: Automatically finds and processes all `block.json` files
- **CSS Validation**: Only generates `style-index.css` for blocks with meaningful frontend styles
- **Smart Chunking**: Explicit chunking configuration - dependencies only split when explicitly configured
- **Asset Organization**: 
  - `editor-assets/` - Shared editor dependencies and editor CSS (when chunking enabled)
  - `frontend-assets/` - Shared frontend dependencies (when chunking enabled)
  - Block directories - Block-specific files (`index.js`, `style-index.css`, etc.)

## Chunking Behavior

The plugin follows an explicit chunking strategy:

- **No Chunking (Default)**: When `chunks.frontend` and `chunks.editor` arrays are empty, all dependencies stay bundled with their entry files. This results in simpler builds with fewer files.
- **Explicit Chunking**: When paths are specified in chunk configuration, only those specific paths are split into chunks.

### Example: No Chunking (Recommended for most projects)
```javascript
gutenbergBlocksPlugin({
  input: { 'block-library': 'resources/widgets/block-library/custom' },
  output: 'build/blocks',
  chunks: {
    frontend: [], // Empty - no chunking
    editor: [],   // Empty - no chunking
  },
})
```

### Example: Explicit Chunking
```javascript
gutenbergBlocksPlugin({
  input: { 'block-library': 'resources/widgets/block-library/custom' },
  output: 'build/blocks',
  chunks: {
    frontend: ['resources/shared/utils/frontend'], // Only split this specific path
    editor: ['resources/shared/components/inspector'], // Only split this specific path
  },
})

## Usage

```javascript
import { gutenbergBlocksPlugin } from './.vite/index.js';

export default defineConfig({
  plugins: [
    gutenbergBlocksPlugin({
      input: {
        'block-library': 'resources/widgets/block-library/custom',
        'page-templates': 'resources/widgets/page-templates',
        'template-parts': 'resources/widgets/template-parts',
      },
      output: 'build/blocks',
      chunks: {
        frontend: [], // No chunking (default) - all dependencies bundled with entry files
        editor: [],   // No chunking (default) - all dependencies bundled with entry files
      },
    }),
  ],
});
```

## File Generation Rules

- **`index.js`**: Generated for all blocks with editor functionality
- **`index.css`**: Generated for blocks with editor styles
- **`style-index.css`**: Generated ONLY for blocks with meaningful frontend styles
- **`view.js`**: Generated for blocks with frontend JavaScript
- **`render.php`**: Copied if present in source
- **`block.json`**: Always copied to output

## Testing

The plugin includes comprehensive tests to verify:
- Correct file structure generation
- No unwanted `style-index.js` files
- Proper asset organization
- Valid block.json files
- Meaningful CSS content validation

Run tests with: `npm test`
