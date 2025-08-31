/**
 * External dependencies
 */
import type { BuildOptions, UserConfig } from 'vite';
import { loadEnv } from 'vite';
import fs from 'fs';

/**
 * Shared dependencies
 */
import { WORDPRESS_EXTERNALS } from '../../common/constants.js';

/**
 * Internal dependencies
 */
import type { ResolvedPluginConfig } from './index.ts';

/**
 * Generate optimized Vite 6 configuration for WordPress
 */
export function config(
	pluginConfig: ResolvedPluginConfig,
	mode: string = process.env.NODE_ENV || 'production'
): UserConfig {
	// Load environment variables
	const env = loadEnv(mode, process.cwd(), '');

	// Parse dev server configuration from environment
	const devServerHost = env.VITE_DEV_SERVER_HOST || pluginConfig.server.host;
	const devServerPort =
		parseInt(env.VITE_DEV_SERVER_PORT, 10) || pluginConfig.server.port;

	// Extract protocol and hostname from the URL
	const hostUrl = new URL(devServerHost);
	const hostname = hostUrl.hostname;
	const isHttps = hostUrl.protocol === 'https:';

	// Build full dev server URL
	const devServerUrl = `${devServerHost}:${devServerPort}`;

	// SSL configuration
	let httpsConfig: boolean | { key: Buffer; cert: Buffer } | undefined;
	if (isHttps) {
		const sslKeyPath = env.VITE_SSL_KEY;
		const sslCertPath = env.VITE_SSL_CERT;

		if (sslKeyPath && sslCertPath) {
			try {
				// Check if SSL files exist
				if (fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath)) {
					httpsConfig = {
						key: fs.readFileSync(sslKeyPath),
						cert: fs.readFileSync(sslCertPath),
					};
					console.log(`🔒 Using custom SSL certificates`);
					console.log(`   Key: ${sslKeyPath}`);
					console.log(`   Cert: ${sslCertPath}`);
				} else {
					console.warn(
						'⚠️  Custom SSL certificate files not found, falling back to basic SSL'
					);
					httpsConfig = true; // Fallback to basic SSL
				}
			} catch (error) {
				console.warn(
					'⚠️  Error reading SSL certificates, falling back to basic SSL:',
					(error as Error).message
				);
				httpsConfig = true; // Fallback to basic SSL
			}
		} else {
			console.warn(
				'⚠️  SSL paths not configured in environment, falling back to basic SSL'
			);
			httpsConfig = true; // Fallback to basic SSL
		}
	}

	console.log(`🚀 Dev server will run at: ${devServerUrl}`);
	console.log(`🔒 SSL enabled: ${isHttps ? 'Yes' : 'No'}`);

	// Use pre-resolved configuration (defaults already applied in index.ts)
	const buildSettings = pluginConfig.build!;
	const serverConfig = pluginConfig.server!;

	// These properties are guaranteed by index.ts default resolution
	const {
		outDir,
		minify,
		sourcemap,
		target,
		cssCodeSplit,
		terserOptions,
		resolve: resolveConfig,
	} = buildSettings;

	const buildConfig: BuildOptions = {
		outDir,
		minify,
		sourcemap:
			sourcemap === 'linked' ||
			sourcemap === 'external' ||
			sourcemap === 'both'
				? true
				: sourcemap === 'inline'
					? 'inline'
					: sourcemap,
		target,
		cssCodeSplit,

		// Use resolved manifest configuration
		manifest: buildSettings.manifest,

		// Rollup configuration optimized for WordPress
		rollupOptions: {
			// Provide virtual entry point to satisfy Vite's requirements
			// Actual building happens through WordPress plugin sideloading
			input: 'virtual:wordpress-entry',
			// Only externalize WordPress dependencies in production
			external: (id: string) => {
				// In development mode, don't externalize React/ReactDOM for HMR
				if (process.env.NODE_ENV === 'development') {
					// Allow React and ReactDOM to be bundled for HMR
					if (id === 'react' || id === 'react-dom') {
						return false;
					}
				}
				// Externalize other WordPress dependencies
				return Object.keys(WORDPRESS_EXTERNALS).includes(id);
			},
			output: {
				globals: WORDPRESS_EXTERNALS,
			},
			// Suppress unhelpful file overwrite warnings
			onwarn(warning: any, warn: any) {
				// Suppress warnings about overwriting previously emitted files
				if (warning.code === 'FILE_NAME_CONFLICT') {
					return;
				}
				// Use default warning behavior for other warnings
				warn(warning);
			},
		},

		// Terser options if specified
		...(minify === 'terser' &&
			terserOptions && {
				terserOptions: {
					compress: {
						drop_console: true,
						drop_debugger: true,
						...terserOptions.compress,
					},
					mangle: {
						properties: false,
						...terserOptions.mangle,
					},
					format: {
						comments: false,
						...terserOptions.format,
					},
				},
			}),
	};

	const viteConfig: UserConfig = {
		build: buildConfig,

		// Disable public directory copying for WordPress themes
		publicDir: false,

		// Resolve configuration with defaults from resolved config
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
			alias: {
				'@/app': '/resources/app',
				'@/shared': '/resources/shared',
				'@/widgets': '/resources/widgets',
			},
			// Spread resolved config values
			...resolveConfig,
		},

		// HMR configuration for WordPress development with environment support
		server: {
			...serverConfig,
			host: hostname,
			port: devServerPort,
			// Use resolved config values, override with env-specific values
			strictPort: serverConfig.strictPort,
			cors: serverConfig.cors,
			...(isHttps && httpsConfig && { https: httpsConfig as any }),
			// Allow serving files from outside the workspace
			fs: {
				allow: ['..', '.'],
			},
			// Configure HMR for WordPress
			hmr: {
				protocol: isHttps ? 'wss' : 'ws',
				host: hostname,
				port: devServerPort,
			},
		},

		// Optimized for WordPress development
		define: {
			'process.env.NODE_ENV': JSON.stringify(
				process.env.NODE_ENV || 'production'
			),
		},

		// Enhanced optimization for WordPress dependencies
		optimizeDeps: {
			include: [
				// In development, include React for HMR
				...(process.env.NODE_ENV === 'development'
					? ['react', 'react-dom']
					: []),
				// Only include dependencies that aren't provided by WordPress
			],
			exclude: Object.keys(WORDPRESS_EXTERNALS).filter((dep) => {
				// In development, don't exclude React for HMR
				if (process.env.NODE_ENV === 'development') {
					return dep !== 'react' && dep !== 'react-dom';
				}
				return true;
			}),
		},

		// CSS handling optimized for WordPress
		css: {
			devSourcemap: sourcemap !== false,
			preprocessorOptions: {
				scss: {
					// Basic SCSS configuration
				},
				sass: {
					// Basic Sass configuration
				},
			},
			postcss: {
				plugins: [
					// Add postcss plugins as needed
				],
			},
		},

		// Add Vite 6 future flags
		future: {
			removePluginHookSsrArgument: 'warn',
		},
	};

	return viteConfig;
}
