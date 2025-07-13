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
├── processors/                # Build processors
│   ├── bundle.js              # Bundle generation (manifest, block.json copying)
│   └── css.js                 # CSS processing and splitting
├── tests/                     # Tests
    ├── config/                # Unit tests for configuration modules
    │   ├── chunks/           # Chunking logic tests
    │   ├── constants/        # Constants tests (.gitkeep)
    │   ├── externals/        # External dependencies tests (.gitkeep)
    │   └── input/            # Input discovery tests (.gitkeep)
    ├── processors/           # Unit tests for build processors
    │   ├── bundle/           # Bundle generation tests (.gitkeep)
    │   └── css/              # CSS processing tests (.gitkeep)
    ├── integration/          # Integration tests
    │   └── build-output/     # Build output validation tests
    │       ├── helpers.js    # Shared test utilities
    │       ├── structure/    # File structure tests
    │       ├── assets/       # Asset organization tests
    │       └── content/      # Content validation tests
    └── README.md             # Test documentation
```

## Features

- **Dynamic Block Discovery**: Automatically finds and processes all `block.json` files
- **CSS Validation**: Only generates `style-index.css` for blocks with meaningful frontend styles
- **Smart Chunking**: Explicit chunking configuration - dependencies only split when explicitly configured
- **Asset Organization**: 
  - `assets/common/` - Shared dependencies and common chunks
  - `assets/frontend/` - Frontend-specific chunks (when chunking enabled)
  - `assets/editor/` - Editor-specific chunks (when chunking enabled)
  - Block directories - Block-specific files (`index.js`, `style-index.css`, etc.)

## Chunking Behavior

The plugin follows an explicit chunking strategy:

- **No Chunking (Default)**: When `chunks.frontend`, `chunks.editor`, and `chunks.common` arrays are empty, all dependencies stay bundled with their entry files. Shared dependencies are placed in `assets/common/` for better organization.
- **Explicit Chunking**: When paths are specified in chunk configuration, only those specific paths are split into chunks in their designated folders.

### Example: No Chunking (Recommended for most projects)
```javascript
gutenbergBlocksPlugin({
  input: { 'block-library': 'resources/widgets/block-library/custom' },
  output: 'build/blocks',
  chunks: {
    frontend: [], // Empty - dependencies bundled with entries
    editor: [],   // Empty - dependencies bundled with entries
    common: [],   // Empty - shared dependencies in assets/common/
  },
})
```

### Example: Explicit Chunking
```javascript
gutenbergBlocksPlugin({
  input: { 'block-library': 'resources/widgets/block-library/custom' },
  output: 'build/blocks',
  chunks: {
    frontend: ['resources/shared/utils'], // Split utils to assets/frontend/
    editor: ['resources/shared/components'], // Split components to assets/editor/
    common: ['resources/shared/constants'], // Split constants to assets/common/
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
        common: [],   // No chunking (default) - shared dependencies in assets/common/
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

The plugin includes comprehensive tests in the `tests/` directory:

### Unit Tests
- **`config/chunks/createManualChunks.test.js`**: Tests chunking logic and configuration behavior
- **`config/chunks/createChunkFileNames.test.js`**: Tests chunk file naming patterns

### Integration Tests
- **`integration/build-output/structure/files.test.js`**: Tests block file structure and organization
- **`integration/build-output/assets/organization.test.js`**: Tests asset folder structure and chunking
- **`integration/build-output/content/validation.test.js`**: Tests file content and bundling validation

### Running Tests
```bash
# Run all tests
npm test

# Run only plugin unit tests
npx vitest run .vite/**/*.test.js

# Run specific test file
npx vitest run .vite/GutenbergPlugin/tests/createManualChunks.test.js
```

### Test Coverage
The tests verify:
- Correct chunking behavior (explicit vs. default bundling)
- Proper file naming conventions
- Correct file structure generation
- No unwanted `style-index.js` files
- Proper asset organization
- Valid block.json files
- Meaningful CSS content validation
