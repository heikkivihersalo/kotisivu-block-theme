import { defineConfig, loadEnv } from 'vite';
import { wp } from './.vite/index.ts';

export default defineConfig(({ mode }) => {
	// Load environment variables
	const env = loadEnv(mode, process.cwd(), '');

	// Get devServer configuration from environment
	const devServerHost = env.VITE_DEV_SERVER_HOST || 'http://localhost';
	const devServerPort = parseInt(env.VITE_DEV_SERVER_PORT || '5173', 10);
	const devServerUrl = `${devServerHost}:${devServerPort}`;

	return {
		plugins: [
			wp({
				// Output configuration
				outDir: 'build',
				sourcemap: 'linked', // Enable source maps for easier debugging
				minify: 'terser', // Enable Terser minification

				// Development server configuration
				host: devServerHost.replace(/^https?:\/\//, ''),
				port: devServerPort,
				devServerUrl,

				// Directory mappings
				assetsDir: {
					'assets/admin': 'resources/app/scripts/admin.ts',
					'assets/dark-mode': 'resources/app/scripts/dark-mode.ts',
					'assets/inline': 'resources/app/scripts/inline.ts',
					'assets/sanitize': 'resources/app/scripts/sanitize.ts',
					'assets/theme': 'resources/app/scripts/theme.ts',
				},

				blocksDir: {
					'blocks/custom': 'resources/widgets/block-library/custom',
					'blocks/parts': 'resources/widgets/block-library/parts',
					'template-parts': 'resources/widgets/template-parts',
					'page-templates': 'resources/widgets/page-templates',
				},

				// File watching
				watch: ['./resources/widgets/**/*.php'],

				// WordPress dependencies
				dependencies: ['react', 'react-dom'],

				// Manifest configuration
				generatePhpManifest: true,
				publicPath: '/',

				// Dev server configuration
				base: '/',
				srcDir: 'resources',
				css: 'css',
				manifest: true,

				// Inline assets HMR configuration
				inlineAssets: {
					inlineAssets: [
						'build/assets/sanitize.css',
						'build/assets/inline.css',
					],
					watchPatterns: [
						'src/app/styles/inline/**/*.css',
						'resources/app/styles/inline/**/*.css',
					],
					blocksConfig: {
						blocksDir: {
							'blocks/custom':
								'resources/widgets/block-library/custom',
							'blocks/parts':
								'resources/widgets/block-library/parts',
						},
						blockNamespace: 'ksd',
					},
				},
			}),
		],
	};
});
