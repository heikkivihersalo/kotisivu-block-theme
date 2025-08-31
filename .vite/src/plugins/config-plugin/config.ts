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
import type { PluginConfig } from '../../common/types/plugin-config.ts';

/**
 * Generate optimized Vite 6 configuration for WordPress
 */
export function config(
	pluginConfig: PluginConfig,
	mode: string = process.env.NODE_ENV || 'production'
): UserConfig {
	// Load environment variables
	const env = loadEnv(mode, process.cwd(), '');

	// Parse dev server configuration from environment
	const devServerHost = env.VITE_DEV_SERVER_HOST || 'http://localhost';
	const devServerPort = parseInt(env.VITE_DEV_SERVER_PORT || '5173', 10);

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

	const {
		build: {
			outDir = 'build',
			minify = 'esbuild',
			sourcemap = false,
			target = 'es2018',
			cssCodeSplit = true,
			terserOptions = {},
			resolve: resolveConfig = {},
		} = {},
		server: serverConfig = {},
	} = pluginConfig;

	const buildConfig: BuildOptions = {
		outDir,
		minify,
		sourcemap:
			sourcemap === 'linked' ||
			sourcemap === 'external' ||
			sourcemap === 'both'
				? true
				: sourcemap,
		target,
		cssCodeSplit,

		// Vite 6 enhanced manifest generation
		manifest: true,

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
		...(minify === 'terser' && {
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

		// Resolve configuration with defaults from vite.config.js
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
			alias: {
				'@/app': '/resources/app',
				'@/shared': '/resources/shared',
				'@/widgets': '/resources/widgets',
			},
			...resolveConfig,
		},

		// HMR configuration for WordPress development with environment support
		server: {
			host: hostname,
			port: devServerPort,
			strictPort: true,
			cors: true,
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
			...serverConfig,
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
