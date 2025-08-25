# Vite HMR Setup for WordPress

This setup provides Hot Module Replacement (HMR) support for your WordPress block theme development, similar to the vite-wordpress-php plugin.

## How it Works

The HMR setup consists of two main components:

### 1. Vite DevServer Plugin (JavaScript/TypeScript)

Located in `.vite/src/plugins/dev-server-plugin/`, this plugin:

- Creates a `/vite-wordpress.json` endpoint that serves configuration to PHP
- Tracks file changes and maintains a build map for asset resolution
- Only runs during development (`vite dev`)

### 2. PHP DevServer Class

Located in `app/Services/Vite/DevServer.php`, this class:

- Detects when Vite dev server is running
- Injects the Vite client script for HMR
- Rewrites asset URLs to point to the dev server
- Converts script tags to use `type="module"` for ES modules support
- Resolves block template paths to source files

## Features

- **Automatic Detection**: Only activates when Vite dev server is running
- **Asset URL Rewriting**: Automatically points WordPress assets to dev server
- **Module Support**: Converts scripts to ES modules for proper HMR
- **Block Template Resolution**: Resolves block.json render paths to source files
- **Body Class**: Adds `vite-dev-server-is-active` class for CSS targeting
- **Elementor Support**: Works with Elementor editor (if needed)

## Usage

### 1. Start Development

```bash
# Start Vite dev server
pnpm dev

# Or
npm run dev
```

### 2. Configure Environment (Optional)

Create a `.env` file based on `example.env`:

```bash
# Vite Development Server Configuration
VITE_DEV_SERVER_HOST="http://localhost"
VITE_DEV_SERVER_PORT="5173"
```

### 3. Development Workflow

1. Start Vite dev server with `pnpm dev`
2. The DevServer automatically detects the running server
3. Navigate to your WordPress site
4. Changes to JavaScript, CSS, and SCSS files will hot reload
5. PHP template changes will be served from source files

## Configuration

### Vite Configuration

The HMR setup is configured in your `vite.config.js`:

```javascript
export default defineConfig({
  // ... your existing config
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    cors: true,
    fs: {
      allow: ['..', '.'],
    },
  },
});
```

### PHP Configuration

The DevServer is automatically registered when `WP_DEBUG` is true. You can customize it in `bootstrap/theme.php`:

```php
$devServer = new DevServer();
$devServer
    ->setHost('http://localhost')
    ->setPort(5173)
    ->register();
```

## How Assets Are Resolved

1. **Production**: WordPress serves built assets from the `build/` directory
2. **Development with HMR**: 
   - DevServer detects Vite is running
   - Asset URLs are rewritten to point to `http://localhost:5173`
   - Scripts are converted to ES modules
   - CSS is served via JavaScript imports for hot reloading

## Debugging

### Check if HMR is Active

- Look for `vite-dev-server-is-active` class on the `<body>` element
- Check browser console for Vite client connection messages
- Verify `http://localhost:5173/vite-wordpress.json` returns configuration

### Common Issues

1. **Port conflicts**: Change port in both Vite config and environment variables
2. **CORS issues**: Ensure `cors: true` in Vite server config
3. **Asset resolution**: Check that `base` path matches your WordPress setup

## File Structure

```
.vite/
├── src/plugins/dev-server-plugin/
│   ├── index.ts          # Main DevServer plugin
│   └── types.ts          # TypeScript interfaces
app/Services/Vite/
└── DevServer.php         # PHP DevServer class
```

This setup provides the same HMR capabilities as external plugins but is fully integrated into your custom Vite build system.
