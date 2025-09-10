import { defineConfig } from 'vite';
import { wp } from './.vite/index.ts';

export default defineConfig(({ mode }) => {
	return {
		plugins: [
			wp({
				// Build configuration
				build: {
					outDir: 'build',
					sourcemap: 'linked', // Enable source maps for easier debugging
					minify: 'terser', // Enable Terser minification
					generatePhpManifest: true,
					publicPath: '/',
					css: 'css',
					manifest: true,
				},

				// Server configuration
				server: {
					host: 'block-theme.local', // Development hostname
					port: 5173, // Development port
				},

				// Path configuration
				paths: {
					srcDir: 'resources',
					assetFiles: {
						'assets/admin': 'resources/app/scripts/admin.ts',
						'assets/dark-mode':
							'resources/app/scripts/dark-mode.ts',
						'assets/theme': 'resources/app/scripts/theme.ts',
					},
					inlineFiles: {
						'assets/inline': 'resources/app/scripts/inline.ts',
						'assets/sanitize': 'resources/app/scripts/sanitize.ts',
					},
					blocksDir: {
						'blocks/custom':
							'resources/widgets/block-library/custom',
						'blocks/parts': 'resources/widgets/block-library/parts',
						'template-parts': 'resources/widgets/template-parts',
						'page-templates': 'resources/widgets/page-templates',
					},
				},

				// WordPress configuration
				wordpress: {
					dependencies: ['react', 'react-dom'],
					namespace: 'ksd', // Block namespace for this theme
				},

				// HMR configuration
				hmr: {
					enabled: true,
					watch: {
						php: ['./resources/widgets/**/*.php'],
						css: ['./resources/app/styles/**/*.css'],
						scripts: ['./resources/app/scripts/**/*.{js,ts}'],
						blocks: ['./resources/widgets/**/*'],
						inline: ['./resources/app/styles/inline/**/*.css'],
					},
					scriptInjection: {
						method: 'inline',
						pollingInterval: 500,
					},
				},
			}),
		],
	};
});
