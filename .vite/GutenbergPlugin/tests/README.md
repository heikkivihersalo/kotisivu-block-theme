# GutenbergPlugin Tests

This directory contains unit tests for the Gutenberg Plugin components.

## Test Structure

- `createManualChunks.test.js` - Tests for the manual chunks function
- `createChunkFileNames.test.js` - Tests for the chunk file naming function

## Running Tests

To run all tests:
```bash
npm test
```

To run only plugin tests:
```bash
npx vitest run .vite/**/*.test.js
```

To run a specific test file:
```bash
npx vitest run .vite/GutenbergPlugin/tests/createManualChunks.test.js
```

## Test Coverage

The tests cover:
- Default behavior when no chunking is configured
- Explicit chunking configuration
- Correct chunk naming and path handling
- Edge cases and error conditions
