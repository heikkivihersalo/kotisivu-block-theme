# GutenbergPlugin Tests

This directory contains both unit and integration tests for the Gutenberg Plugin components, organized by module structure.

## Test Structure

```
tests/
├── config/                          # Unit tests for configuration modules
│   ├── chunks/                      # Chunking logic tests
│   │   ├── createManualChunks.test.js
│   │   └── createChunkFileNames.test.js
│   ├── constants/                   # Constants tests (.gitkeep)
│   ├── externals/                   # External dependencies tests (.gitkeep)
│   └── input/                       # Input discovery tests (.gitkeep)
├── processors/                      # Unit tests for build processors
│   ├── bundle/                      # Bundle generation tests (.gitkeep)
│   └── css/                         # CSS processing tests (.gitkeep)
└── integration/                     # Integration tests
    └── build-output/                # Build output validation tests
        ├── helpers.js               # Shared test utilities
        ├── structure/               # File structure tests
        ├── assets/                  # Asset organization tests
        └── content/                 # Content validation tests
```

## Running Tests

To run all tests:
```bash
npm test
```

To run only plugin unit tests:
```bash
npx vitest run .vite/GutenbergPlugin/tests/config/
npx vitest run .vite/GutenbergPlugin/tests/processors/
```

To run only integration tests:
```bash
npx vitest run .vite/GutenbergPlugin/tests/integration/
```

To run a specific test file:
```bash
npx vitest run .vite/GutenbergPlugin/tests/config/chunks/createManualChunks.test.js
```

## Test Coverage

### Unit Tests Cover:
- **Chunking Logic**: Manual chunks and file naming behavior
- Default behavior when no chunking is configured
- Explicit chunking configuration
- Correct chunk naming and path handling
- Edge cases and error conditions

### Integration Tests Cover:
- **Build Structure**: Complete file structure validation
- **Asset Organization**: Chunking behavior and asset folder structure  
- **Content Validation**: File contents and bundling verification
- Block file requirements and organization
- CSS processing and meaningful content validation

## Future Test Areas

The directory structure is prepared for testing:
- **Constants**: Shared constants and patterns
- **Externals**: WordPress external dependencies handling  
- **Input**: Block input discovery and validation
- **Bundle Processor**: Manifest generation and block.json copying
- **CSS Processor**: CSS splitting and processing logic
