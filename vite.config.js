import { defineConfig, loadEnv } from 'vite';
import { wp } from './.vite/index.ts';
import fs from 'fs';

export default defineConfig(({ mode }) => {
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
	let httpsConfig = false;
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
					error.message
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

	return {
		plugins: [
			wp({
				build: {
					outDir: 'build',
					sourcemap: 'linked', // Enable source maps for easier debugging
					minify: 'terser', // Enable Terser minification in wp plugin
					assetsDir: {
						'assets/admin': 'resources/app/scripts/admin.ts',
						'assets/dark-mode':
							'resources/app/scripts/dark-mode.ts',
						'assets/inline': 'resources/app/scripts/inline.ts',
						'assets/sanitize': 'resources/app/scripts/sanitize.ts',
						'assets/theme': 'resources/app/scripts/theme.ts',
					},
					blocksDir: {
						'blocks/custom':
							'resources/widgets/block-library/custom',
						'blocks/parts': 'resources/widgets/block-library/parts',
						'template-parts': 'resources/widgets/template-parts',
						'page-templates': 'resources/widgets/page-templates',
					},
					watch: ['./resources/widgets/**/*.php'],
				},
				// Pass dev server configuration to plugins
				devServer: {
					host: hostname,
					port: devServerPort,
					devServerUrl: devServerUrl,
				},
			}),
		],
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
			alias: {
				'@/app': '/resources/app',
				'@/shared': '/resources/shared',
				'@/widgets': '/resources/widgets',
			},
		},
		// HMR configuration
		server: {
			host: hostname,
			port: devServerPort,
			strictPort: true,
			cors: true,
			https: httpsConfig,
			// Allow serving files from outside the workspace
			fs: {
				allow: ['..', '.'],
			},
		},
	};
});
