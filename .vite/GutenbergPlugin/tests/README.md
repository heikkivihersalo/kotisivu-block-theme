# GutenbergPlugin Tests

This directory contains unit tests for the Gutenberg Plugin components, organized by module structure.

## Test Structure

```
tests/
├── config/                          # Configuration module tests
│   ├── chunks/                      # Chunking logic tests
│   │   ├── createManualChunks.test.js
│   │   └── createChunkFileNames.test.js
│   ├── constants/                   # Constants tests (.gitkeep)
│   ├── externals/                   # External dependencies tests (.gitkeep)
│   └── input/                       # Input discovery tests (.gitkeep)
└── processors/                      # Build processor tests
    ├── bundle/                      # Bundle generation tests (.gitkeep)
    └── css/                         # CSS processing tests (.gitkeep)
```

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
npx vitest run .vite/GutenbergPlugin/tests/config/chunks/createManualChunks.test.js
```

## Test Coverage

The tests cover:
- **Chunking Logic**: Manual chunks and file naming behavior
- Default behavior when no chunking is configured
- Explicit chunking configuration
- Correct chunk naming and path handling
- Edge cases and error conditions

## Future Test Areas

The directory structure is prepared for testing:
- **Constants**: Shared constants and patterns
- **Externals**: WordPress external dependencies handling  
- **Input**: Block input discovery and validation
- **Bundle Processor**: Manifest generation and block.json copying
- **CSS Processor**: CSS splitting and processing logic
