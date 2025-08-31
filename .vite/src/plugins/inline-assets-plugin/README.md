# Inline Assets Plugin

A Vite plugin that provides Hot Module Replacement (HMR) support for WordPress inline CSS assets. This plugin is specifically designed to work with WordPress block themes that use inline styles.

## Features

- **Hot Module Replacement**: Automatically updates inline CSS assets during development without full page reloads
- **Multiple Connection Methods**: Supports WebSocket, polling, and Vite context-based HMR
- **Block Asset Discovery**: Automatically discovers and monitors CSS files from WordPress blocks
- **Flexible Script Injection**: Multiple methods for injecting HMR client code
- **Template-Based Generation**: Uses external templates for maintainable client-side code

## Architecture

The plugin has been refactored into several modules for better maintainability:

```
inline-assets-plugin/
├── index.ts                 # Main plugin entry point
├── types.ts                 # TypeScript type definitions
├── client/                  # Client-side HMR code
│   └── hmr-client.ts       # TypeScript client functions
├── server/                  # Server-side middleware
│   └── middleware.ts       # Express-style middleware functions
├── utils/                   # Utility functions
│   ├── block-discovery.ts  # Block asset discovery logic
│   ├── config.ts           # Configuration processing
│   └── script-templates.ts # Script generation system
└── templates/               # JavaScript templates
    └── hmr-client.js       # Client script template
```

## Configuration

### Basic Configuration

```javascript
import { InlineAssetsPlugin } from './path/to/plugin';

export default {
  plugins: [
    InlineAssetsPlugin({
      inlineAssets: [
        'build/assets/sanitize.css',
        'build/assets/inline.css'
      ],
      watchPatterns: [
        'resources/app/styles/inline/**/*.css'
      ],
      blocksConfig: {
        blocksDir: {
          'blocks/custom': 'resources/widgets/block-library/custom',
          'blocks/parts': 'resources/widgets/block-library/parts'
        },
        outDir: 'build',
        blockNamespace: 'ksd'
      }
    })
  ]
};
```

### Advanced Configuration

```javascript
InlineAssetsPlugin({
  // ... basic config
  scriptInjection: {
    method: 'external',        // 'inline' | 'external' | 'module'
    pollingInterval: 1000      // Polling interval in milliseconds
  }
})
```

## Script Injection Methods

### 1. Inline (Default)

Injects the HMR client code directly into the response. This is the most compatible method.

```javascript
scriptInjection: {
  method: 'inline'
}
```

### 2. External

Serves the HMR client as a separate JavaScript file. Better for caching and debugging.

```javascript
scriptInjection: {
  method: 'external'
}
```

### 3. Module

Serves the HMR client as an ES module. Modern and efficient, but requires modern browser support.

```javascript
scriptInjection: {
  method: 'module'
}
```

## How It Works

### 1. Asset Discovery

The plugin automatically discovers CSS assets from:
- Static inline assets specified in configuration
- WordPress blocks with `block.json` files
- CSS files following naming conventions (`style.css`, `index.css`, `style-index.css`)

### 2. File Watching

The plugin monitors:
- Source CSS files that generate inline assets
- Built CSS files used as inline assets
- Block CSS files in source directories

### 3. HMR Implementation

When a file changes:
1. The plugin detects the change via Vite's file watching
2. Determines which inline asset is affected
3. Sends an HMR update event to connected clients
4. Client-side code updates the corresponding `<style>` tag

### 4. Client-Side Updates

The client uses multiple strategies:
1. **Polling** (Primary): Polls the server for file modification times
2. **WebSocket** (Secondary): Connects to Vite's WebSocket for instant updates
3. **Vite Context** (Fallback): Uses Vite's built-in HMR context when available

## WordPress Integration

The plugin is specifically designed for WordPress environments where:
- CSS is injected inline via `wp_add_inline_style()`
- Style tags have predictable IDs following WordPress conventions
- Multiple Vite dev server setups may be used

### Style ID Generation

The plugin generates WordPress-compatible style IDs:

```javascript
// Block assets
'ksd-block-name-style-inline-css'
'ksd-block-name-index-inline-css'

// Theme assets
'kotisivu-sanitize-css'
'kotisivu-inline-css'
```

## Development

### Adding New Templates

1. Create a new template file in `templates/`
2. Use `window.__VITE_INLINE_ASSETS_CONFIG__` to access configuration data
3. Update the template loading logic in `script-templates.ts`

### Extending Script Generation

The script generation system supports:
- Template-based generation with global configuration injection
- External script file serving
- ES module generation
- Custom configuration per generation method

### Testing

The plugin provides several endpoints for testing:

- `/__vite_inline_assets` - HMR client script (inline method)
- `/__vite_inline_assets.js` - HMR client script (external method)
- `/__vite_inline_assets.mjs` - HMR client script (module method)
- `/__vite_inline_content/status` - Asset modification status
- `/__vite_inline_content/{asset}` - Asset content

## Troubleshooting

### Common Issues

1. **HMR not working**: Check that the WordPress site can connect to the Vite dev server
2. **Style IDs not matching**: Verify the `blockNamespace` configuration matches your block names
3. **Assets not discovered**: Check that `block.json` files exist and have valid `name` properties

### Debug Information

The plugin logs useful information to the browser console:
- HMR connection status
- Asset discovery results
- Update events and their results

### Performance Considerations

- Polling interval can be adjusted based on your needs (default: 500ms)
- External/module script injection reduces initial payload size
- Template system allows for optimized client code generation

## Migration from Previous Version

If upgrading from the previous monolithic version:

1. Configuration structure remains the same
2. Add `scriptInjection` config if you want external scripts
3. No changes needed to WordPress integration
4. Client behavior remains identical

The refactored version maintains full backward compatibility while providing better maintainability and extensibility.
