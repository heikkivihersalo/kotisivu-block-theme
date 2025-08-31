# Unified Plugin Configuration

The unified configuration system provides a single, categorized configuration object that all WordPress Vite plugins share. This eliminates scattered configurations and provides clear organization.

## Configuration Structure

The configuration is organized into logical categories:

- **`build`**: Build process and asset compilation settings
- **`server`**: Development server configuration  
- **`paths`**: Directory and file path settings
- **`wordpress`**: WordPress-specific settings
- **`environment`**: Environment and runtime configuration

## Example Configuration

```typescript
import { wp } from '@kotisivu/vite-wordpress';

export default {
  plugins: [
    ...wp({
      // Build configuration
      build: {
        outDir: 'build',
        sourcemap: true,
        minify: 'esbuild',
        target: 'es2020',
        cssCodeSplit: true,
        manifest: true,
        generatePhpManifest: true,
        publicPath: '/wp-content/themes/my-theme/build/',
        css: 'css',
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
        resolve: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            '@': './resources',
          },
        },
      },

      // Server configuration
      server: {
        host: 'localhost',
        port: 5173,
        devServerUrl: 'http://localhost:5173',
        strictPort: true,
        cors: true,
        https: false,
        base: '/',
      },

      // Path configuration
      paths: {
        srcDir: 'resources',
        assetsDir: {
          'resources/styles': 'assets',
          'resources/scripts': 'assets',
        },
        blocksDir: {
          'resources/blocks': 'blocks',
        },
      },

      // WordPress configuration
      wordpress: {
        dependencies: ['wp-blocks', 'wp-element', 'wp-editor'],
        textDomain: 'my-theme',
        discoveredBlocks: [], // Auto-populated during build
      },

      // Environment configuration
      environment: {
        mode: 'development',
        watch: ['**/*.php', '**/*.json'],
        env: {
          NODE_ENV: 'development',
        },
      },

      // Inline assets configuration (optional)
      inlineAssets: {
        inlineAssets: ['build/blocks/*/style.css'],
        watchPatterns: ['resources/blocks/**/style.scss'],
        blocksConfig: {
          blocksDir: {
            'resources/blocks': 'blocks',
          },
          outDir: 'build',
          blockNamespace: 'my-theme',
        },
      },
    }),
  ],
};
```

## Configuration Access

Access configuration properties directly from the unified config object:

```typescript
import type { PluginConfig } from '@kotisivu/vite-wordpress';

// Access specific categories directly
const buildOptions = config.build;
const serverOptions = config.server;
const pathsOptions = config.paths;
const wordpressOptions = config.wordpress;
const environmentOptions = config.environment;
const hmrOptions = config.hmr;

// Access specific properties with optional chaining
const outDir = config.build?.outDir;
const host = config.server?.host;
const srcDir = config.paths?.srcDir;
const dependencies = config.wordpress?.dependencies;
const hmrEnabled = config.hmr?.enabled;
```

## Required Configuration

The only required configuration is `paths.blocksDir` for multi-block builds:

```typescript
wp({
  paths: {
    blocksDir: {
      'resources/blocks': 'blocks',
    },
  },
})
```

All other configuration options have sensible defaults.
