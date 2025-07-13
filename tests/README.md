# Build Tests

This directory contains integration tests that verify the complete build output of the Gutenberg Blocks Plugin.

## Test Structure

```
tests/
├── build/                           # Build output integration tests
│   ├── helpers.js                   # Shared test utilities
│   ├── structure/                   # File structure tests
│   │   └── files.test.js           # Block files and organization
│   ├── assets/                      # Asset organization tests
│   │   └── organization.test.js    # Asset folder structure and chunking
│   └── content/                     # Content validation tests
│       └── validation.test.js      # File content and bundling validation
└── build-output.test.js            # Legacy combined test file (to be removed)
```

## Test Categories

### Structure Tests (`structure/`)
- **files.test.js**: Validates that each block has required files (`block.json`, `index.js`) and only allowed files
- Tests for proper file organization and absence of unwanted files

### Asset Tests (`assets/`)
- **organization.test.js**: Validates asset folder structure, chunking behavior, and manifest files
- Tests for proper separation of editor/frontend assets based on configuration

### Content Tests (`content/`)
- **validation.test.js**: Validates file contents, bundling behavior, and meaningful CSS generation
- Tests for proper block registration and dependency bundling

## Running Tests

```bash
# Run all build tests
npm test

# Run specific test category
npx vitest run tests/build/structure/
npx vitest run tests/build/assets/
npx vitest run tests/build/content/

# Run specific test file
npx vitest run tests/build/structure/files.test.js
```

## Shared Utilities

The `helpers.js` file provides common utilities:
- `getBlockDirectories()` - Get all block directories from build output
- `hasFile(blockDir, filename)` - Check if a file exists in a block directory
- `getBlockName(blockDir)` - Extract block name from directory path
- `readBlockFile(blockDir, filename)` - Read file content from block directory

These utilities ensure consistency across all build tests and reduce code duplication.
