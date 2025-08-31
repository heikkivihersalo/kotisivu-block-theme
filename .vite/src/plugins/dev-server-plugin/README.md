# Dev Server Plugin

A unified Vite plugin that combines development server functionality with inline assets HMR support for WordPress themes.

## Features

### Core Development Server
- **WordPress Integration**: Provides a `vite-wordpress.json` endpoint for PHP DevServer class integration
- **Build Map Management**: Tracks and manages build artifacts for HMR
- **PHP File Watching**: Triggers full page reloads when PHP files change

### Inline Assets HMR
- **CSS Hot Reload**: Monitors inline CSS files and updates them in real-time during development
- **Block Asset Discovery**: Automatically discovers and tracks CSS assets from WordPress blocks
- **Polling-based Updates**: Uses efficient polling to detect changes in inline assets
- **Smart Style ID Matching**: Intelligently matches CSS changes to the correct style elements

## Configuration

```typescript
import { DevServerPlugin } from './.vite/src/plugins/dev-server-plugin';

export default {
  plugins: [
    DevServerPlugin({
      // Core dev server options
      base: '/',
      srcDir: 'resources',
      outDir: 'build',
      css: 'css',
      manifest: true,
      
      // Inline assets configuration (optional)
      inlineAssets: {
        // Static inline assets to monitor
        inlineAssets: [
          'assets/sanitize.css',
          'assets/inline.css'
        ],
        
        // Watch patterns for source files
        watchPatterns: [
          'src/app/styles/inline/**/*.css',
          'resources/app/styles/inline/**/*.css'
        ],
        
        // Block configuration for auto-discovery
        blocksConfig: {
          blocksDir: {
            'blocks': 'src/blocks',
            'custom': 'src/custom-blocks'
          },
          outDir: 'build',
          blockNamespace: 'ksd'
        },
        
        // Script injection options
        scriptInjection: {
          method: 'inline', // 'inline' | 'external' | 'module'
          pollingInterval: 500,
          themePrefix: 'my-theme',
          viteServerUrl: 'http://localhost:5173'
        }
      }
    })
  ]
};
```

## API Endpoints

### Core Endpoints
- `/{plugin-name}.json` - Exposes plugin configuration and build map for PHP integration

### Inline Assets Endpoints (when configured)
- `/__vite_inline_assets` - Serves the HMR client script (inline method)
- `/__vite_inline_assets.js` - Serves the HMR client script (external method)  
- `/__vite_inline_assets.mjs` - Serves the HMR client script (module method)
- `/__vite_inline_content/status` - Returns modification timestamps for all monitored assets
- `/__vite_inline_content/{asset-path}` - Serves the content of specific inline assets

## How It Works

### Development Server Integration
1. **Configuration Exposure**: The plugin exposes its configuration via a JSON endpoint that the PHP DevServer class can consume
2. **Build Map Tracking**: Maintains a real-time map of built assets for HMR coordination
3. **File Watching**: Monitors file changes and updates the build map accordingly

### Inline Assets HMR
1. **Asset Discovery**: Automatically discovers inline CSS assets from configured directories and blocks
2. **Client Injection**: Injects an HMR client script into the browser that polls for changes
3. **Change Detection**: Monitors file modification times and detects when assets change
4. **Smart Updates**: Matches changed assets to their corresponding style elements in the DOM and updates them

### Block Asset Auto-Discovery
The plugin automatically discovers CSS assets from WordPress blocks by:
1. Scanning configured block directories for `block.json` files
2. Extracting block names and slugs from the block metadata
3. Looking for associated CSS files (`style.css`, `index.css`, `style-index.css`)
4. Creating mappings between source and build paths for HMR

## Directory Structure

```
dev-server-plugin/
├── index.ts                 # Main plugin entry point
├── types.ts                 # TypeScript type definitions
├── client/
│   └── hmr-client.ts       # Browser-side HMR client
├── server/
│   └── middleware.ts       # Server middleware functions
└── utils/
    ├── config.ts           # Configuration processing
    └── script-templates.ts # HMR script generation
```

**Note**: The `block-discovery.ts` file has been removed as block discovery is now handled directly by the BlocksPlugin API, eliminating duplication and ensuring consistency.

## Migration from Separate Plugins

If you were previously using separate `DevServerPlugin` and `InlineAssetsPlugin`, you can migrate by:

1. **Remove the separate plugins** from your Vite config
2. **Update the import** to use the unified plugin
3. **Move inline assets configuration** to the `inlineAssets` option
4. **Update any custom configuration** to match the new structure

### Before
```typescript
import { DevServerPlugin } from './dev-server-plugin';
import { InlineAssetsPlugin } from './inline-assets-plugin';

export default {
  plugins: [
    DevServerPlugin({ /* config */ }),
    InlineAssetsPlugin({ /* config */ })
  ]
};
```

### After
```typescript
import { DevServerPlugin } from './dev-server-plugin';

export default {
  plugins: [
    DevServerPlugin({
      // Previous dev server config
      base: '/',
      srcDir: 'resources',
      // ... other options
      
      // Previous inline assets config moved here
      inlineAssets: {
        // ... inline assets configuration
      }
    })
  ]
};
```

## Troubleshooting

### Common Issues

1. **HMR not working**: Check that the block namespace and asset paths are correctly configured
2. **Assets not discovered**: Verify that block directories exist and contain valid `block.json` files
3. **Style updates not applying**: Ensure style IDs in the DOM match the expected WordPress naming convention
4. **Performance issues**: Consider increasing the polling interval if experiencing high CPU usage

### Debug Mode

Enable debug logging by opening browser developer tools. The plugin logs all HMR activities to the console with `[DevServer]` and `[HMR]` prefixes.
