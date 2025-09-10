# HMR Client

This directory contains the browser-side Hot Module Replacement (HMR) client for the WordPress block theme development environment.

## Files

### `hmr-client.js`

The main HMR client implementation that runs in the browser. This file:

- **Provides syntax highlighting** - Being a separate `.js` file, IDEs can provide proper JavaScript syntax highlighting and IntelliSense
- **Includes comprehensive JSDoc** - All classes and methods are documented with type information
- **Handles asset updates** - Monitors for changes in CSS and JavaScript files
- **Updates styles in real-time** - Replaces inline styles and reloads linked stylesheets without page refresh

## Features

### CSS Hot Reloading
- **Inline CSS**: Updates `<style>` elements with `data-vite-dev-id` attributes
- **CSS Files**: Reloads `<link rel="stylesheet">` elements with cache-busting timestamps

### JavaScript Monitoring
- Detects JavaScript file changes (full HMR requires more complex implementation)
- Logs changes for debugging purposes

### Error Handling
- Graceful degradation when dev server is unavailable
- Comprehensive error logging for debugging

## Usage

The HMR client is automatically injected into pages when the dev server is running. It initializes itself when the DOM is ready and starts polling for changes.

## Configuration

The client reads configuration from `window.__KOTISIVU_DEV_CONFIG__` with these options:

```javascript
{
  blockAssets: new Map(),        // Map of block assets
  blockNamespace: 'kotisivu',    // WordPress block namespace
  pollingInterval: 1000,         // Polling interval in milliseconds
  viteServerUrl: 'http://localhost:5173'  // Vite dev server URL
}
```

## Development Benefits

Having the HMR client as a separate file provides several developer experience improvements:

1. **Syntax Highlighting**: Full JavaScript syntax highlighting in IDEs
2. **IntelliSense**: Auto-completion and type information
3. **Code Navigation**: Jump-to-definition and find-references functionality
4. **Debugging**: Easier to debug with proper source maps and error locations
5. **Maintainability**: Easier to modify and extend the HMR functionality

## Architecture

The client uses a handler pattern with three main handlers:

- `InlineCSSHandler`: Handles inline `<style>` elements
- `CSSFileHandler`: Handles linked CSS files
- `JSFileHandler`: Handles JavaScript file changes

Each handler implements `canHandle()` and `update()` methods for processing specific asset types.
