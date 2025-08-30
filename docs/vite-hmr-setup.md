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

### 2. Configure Environment

Create a `.env` file based on `example.env` and configure your development server:

```bash
# Vite Development Server Configuration
VITE_DEV_SERVER_HOST="http://localhost"    # Your local WordPress site URL
VITE_DEV_SERVER_PORT="5173"                # Vite dev server port
```

**For different local development environments:**

- **Local by Flywheel**: `VITE_DEV_SERVER_HOST="https://your-site.local"`
- **Laravel Valet**: `VITE_DEV_SERVER_HOST="http://your-site.test"`
- **DDEV**: `VITE_DEV_SERVER_HOST="http://your-site.ddev.site"`
- **Standard localhost**: `VITE_DEV_SERVER_HOST="http://localhost"`

> **Important**: The `VITE_DEV_SERVER_HOST` should match your WordPress site's URL for proper HMR functionality.

### 3. Development Workflow

1. Start Vite dev server with `pnpm dev`
2. The DevServer automatically detects the running server
3. Navigate to your WordPress site
4. Changes to JavaScript, CSS, and SCSS files will hot reload
5. PHP template changes will be served from source files

## Configuration

### Vite Configuration

The HMR setup reads environment variables and configures the server automatically in your `vite.config.js`:

```javascript
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  
  // Parse dev server configuration from environment
  const devServerHost = env.VITE_DEV_SERVER_HOST || 'http://localhost';
  const devServerPort = parseInt(env.VITE_DEV_SERVER_PORT || '5173', 10);
  
  return {
    // ... your existing config
    server: {
      host: new URL(devServerHost).hostname,
      port: devServerPort,
      strictPort: true,
      cors: true,
      fs: {
        allow: ['..', '.'],
      },
    },
  };
});
```

### PHP Configuration

The DevServer is automatically registered when `WP_DEBUG` is true and reads the same environment variables. It's configured in `app/Providers/ViteDevServerProvider.php`:

```php
protected function getDevServerHost(): string {
    // Allow override via environment or use site URL
    return $_ENV['VITE_DEV_SERVER_HOST'] ?? get_site_url();
}

protected function getDevServerPort(): int {
    // Allow override via environment or use default
    return (int) ($_ENV['VITE_DEV_SERVER_PORT'] ?? 5173);
}
```

## How Assets Are Resolved

1. **Production**: WordPress serves built assets from the `build/` directory
2. **Development with HMR**: 
   - DevServer detects Vite is running
   - Asset URLs are rewritten to point to the dev server (HTTP or HTTPS based on config)
   - Scripts are converted to ES modules
   - CSS is served via JavaScript imports for hot reloading

## SSL Configuration

The setup automatically detects if you're using HTTPS and configures SSL accordingly:

- **HTTPS**: When `VITE_DEV_SERVER_HOST` starts with `https://`, the `@vitejs/plugin-basic-ssl` plugin is automatically enabled
- **HTTP**: When using `http://`, no SSL is configured
- **Self-signed certificates**: The basic SSL plugin generates self-signed certificates automatically
- **WordPress integration**: The PHP DevServer disables SSL verification for local development to avoid certificate errors

## Debugging

### Check if HMR is Active

- Look for `vite-dev-server-is-active` class on the `<body>` element
- Check browser console for Vite client connection messages
- Verify your dev server URL returns configuration (e.g., `https://your-site.local:5173/vite-wordpress.json`)
- Check console output when starting Vite: `🚀 Dev server will run at: [URL]`

### Common Issues

1. **Environment Variable Mismatch**: 
   - Ensure `VITE_DEV_SERVER_HOST` in `.env` matches your WordPress site URL
   - WordPress site at `https://my-site.local` requires `VITE_DEV_SERVER_HOST="https://my-site.local"`

2. **Port conflicts**: Change port in `VITE_DEV_SERVER_PORT` environment variable

3. **CORS issues**: 
   - Ensure your local development environment allows cross-origin requests
   - For Local by Flywheel with SSL, use `https://` in `VITE_DEV_SERVER_HOST`

4. **Asset resolution**: Check that both PHP and JavaScript configs use the same host/port

5. **SSL/Certificate issues**: 
   - For HTTPS sites, the `@vitejs/plugin-basic-ssl` plugin automatically generates self-signed certificates
   - If you see SSL errors, ensure the plugin is installed: `pnpm add -D @vitejs/plugin-basic-ssl`
   - The PHP DevServer automatically disables SSL verification for local development

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
