# Development Server Configuration

This document explains how to configure the Vite development server for HMR (Hot Module Replacement) with different local development environments.

## Environment Variables

The development server configuration is controlled by two environment variables in your `.env` file:

### VITE_DEV_SERVER_HOST

The protocol and hostname for the development server. This should match your local WordPress site URL.

**Examples:**
- `http://localhost` - Standard localhost setup
- `https://block-theme.local` - Local by Flywheel with SSL
- `http://block-theme.test` - Laravel Valet
- `http://block-theme.ddev.site` - DDEV
- `http://my-site.wp.local` - Any custom local domain

### VITE_DEV_SERVER_PORT

The port number for the Vite development server. Default is `5173`.

## Configuration Examples

### Local by Flywheel (with SSL)
```env
VITE_DEV_SERVER_HOST="https://block-theme.local"
VITE_DEV_SERVER_PORT="5173"
```

### Laravel Valet
```env
VITE_DEV_SERVER_HOST="http://block-theme.test"
VITE_DEV_SERVER_PORT="5173"
```

### DDEV
```env
VITE_DEV_SERVER_HOST="http://block-theme.ddev.site"
VITE_DEV_SERVER_PORT="5173"
```

### Standard Localhost
```env
VITE_DEV_SERVER_HOST="http://localhost"
VITE_DEV_SERVER_PORT="5173"
```

## How It Works

1. **Vite Configuration**: The `vite.config.js` reads the environment variables and configures both:
   - The Vite dev server host and port
   - The DevServerPlugin with the full dev server URL

2. **Plugin Integration**: The DevServerPlugin includes the dev server information in the `/vite-wordpress.json` endpoint that WordPress queries for HMR configuration.

3. **WordPress Integration**: The PHP `DevServer` class in `app/Services/Vite/DevServer.php` uses the same environment variables to know where to find the Vite dev server.

## Development Workflow

1. Copy `example.env` to `.env`
2. Update `VITE_DEV_SERVER_HOST` to match your local WordPress site URL
3. Set `VITE_DEV_SERVER_PORT` if you need a different port (optional)
4. Start the Vite dev server: `npm run dev` or `pnpm dev`
5. Visit your WordPress site - HMR should now work with your local domain

## Troubleshooting

### HMR Not Working
- Ensure your `.env` file has the correct `VITE_DEV_SERVER_HOST` that matches your WordPress site URL
- Check that the Vite dev server is running on the specified port
- Verify that your WordPress site can reach the Vite dev server URL

### CORS Issues
If you encounter CORS issues, ensure your local development environment allows connections between your WordPress site and the Vite dev server.

### SSL/HTTPS
If your local WordPress site uses HTTPS, make sure `VITE_DEV_SERVER_HOST` uses `https://` and that your Vite dev server supports SSL.
