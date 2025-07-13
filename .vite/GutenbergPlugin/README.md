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
- **Smart Chunking**: Separates editor and frontend dependencies automatically
- **Asset Organization**: 
  - `editor-assets/` - Shared editor dependencies and editor CSS
  - `frontend-assets/` - Shared frontend dependencies (view files only)
  - Block directories - Block-specific files (`index.js`, `style-index.css`, etc.)

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
      copyBlockJson: true,
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
