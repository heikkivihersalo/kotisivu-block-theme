# Render.php Test Suite Documentation

## Overview

This test suite ensures that `render.php` files are correctly copied from source directories to the build output during the Gutenberg plugin build process.

## Test Structure

### Integration Tests
**Location:** `.vite/GutenbergPlugin/tests/integration/build-output/content/`

#### Build Output Tests (`render-php.test.js`)
These tests verify that the build process correctly copies `render.php` files to the final output:

- **File Copying**: Ensures render.php files from source are copied to build output
- **Content Validation**: Verifies that copied files have valid PHP content
- **File Permissions**: Checks that files have proper permissions and structure
- **Directory Structure**: Ensures files are placed in correct directory hierarchy
- **Content Structure**: Validates PHP docblocks and variable usage
- **Encoding**: Ensures proper UTF-8 encoding and line endings

#### Bundle Generator Integration Tests (`renderPhpBundleGenerator.test.js`)
These tests verify that the bundle generator properly integrates render.php copying:

- **Function Calls**: Ensures copyRenderFile is called for each block
- **File Emission**: Tests that render.php files are emitted when they exist
- **Conditional Logic**: Verifies files are not emitted when they don't exist
- **Multiple Directories**: Tests handling of multiple input directories
- **Content Preservation**: Ensures different content types are handled correctly

### Unit Tests
**Location:** `.vite/GutenbergPlugin/tests/unit/processors/bundle/copyRenderFile-simple.test.js`

These tests verify the `copyRenderFile` utility function:

- **File Existence**: Tests behavior when render.php exists vs doesn't exist
- **Directory Handling**: Tests different directory structures
- **Content Copying**: Ensures exact content is preserved
- **Empty Files**: Handles empty render.php files correctly
- **UTF-8 Encoding**: Verifies proper encoding handling

## Test Coverage

### Blocks with render.php Files
The test suite automatically detects and validates render.php files in:
- `block-library/` - Custom blocks with server-side rendering
- `page-templates/` - Page template blocks
- `template-parts/` - Template part blocks

### What's Tested

1. **Copy Functionality**
   - Files are copied from source to build output
   - Only files that exist in source are copied
   - Files are not created if they don't exist in source

2. **Content Integrity**
   - File content is preserved exactly
   - PHP syntax is valid
   - Docblocks are maintained
   - UTF-8 encoding is preserved

3. **Directory Structure**
   - Files are placed in correct block directories
   - Proper hierarchical structure is maintained
   - No files are misplaced

4. **Error Handling**
   - Empty files are handled correctly
   - Missing files don't cause errors
   - Invalid paths are handled gracefully

## Running the Tests

### Run all render.php tests:
```bash
npm test -- --run .vite/GutenbergPlugin/tests/integration/build-output/content/render-php.test.js .vite/GutenbergPlugin/tests/integration/bundle-generator/renderPhpBundleGenerator.test.js .vite/GutenbergPlugin/tests/unit/processors/bundle/copyRenderFile.test.js
```

### Run using the test suite:
```bash
node .vite/GutenbergPlugin/tests/render-php-suite.js
```

### Run individual test files:
```bash
# Integration tests - Build output validation
npm test -- --run .vite/GutenbergPlugin/tests/integration/build-output/content/render-php.test.js

# Integration tests - Bundle generator integration
npm test -- --run .vite/GutenbergPlugin/tests/integration/bundle-generator/renderPhpBundleGenerator.test.js

# Unit tests - copyRenderFile function
npm test -- --run .vite/GutenbergPlugin/tests/unit/processors/bundle/copyRenderFile-simple.test.js
```

## Test Output

The tests provide detailed feedback including:
- Total number of blocks found
- Number of blocks with render.php files
- Number of blocks without render.php files
- Coverage percentage
- Individual test results for each validation

## Expected Results

As of the current implementation:
- **Total blocks**: 29
- **Blocks with render.php**: 13
- **Blocks without render.php**: 16
- **Coverage**: 44.8%

### Test Results Summary:
- **Integration Tests - Build Output**: 9 tests
- **Integration Tests - Bundle Generator**: 4 tests  
- **Unit Tests - copyRenderFile**: 5 tests
- **Total**: 18 tests

## Adding New Tests

To add new render.php tests:

1. **For integration tests**: Add new test cases to the existing describe blocks in the integration test file
2. **For unit tests**: Add new test cases to test different scenarios of the copyRenderFile function
3. **For new functionality**: Create new test files following the same pattern

## Troubleshooting

### Common Issues:
1. **Files not found**: Ensure the build has been run before integration tests
2. **Content mismatches**: Check that source files have proper PHP content
3. **Directory structure**: Verify block directory structure matches expectations

### Build Before Testing:
```bash
npm run build
```

This ensures all render.php files are properly copied to the build output before running integration tests.
