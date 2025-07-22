import { defineConfig } from 'vite';
import { wp } from './.vite/index.ts';

export default defineConfig({
	plugins: [
		wp({
			sourcemap: 'linked', // Enable source maps for easier debugging
			minify: 'terser', // Enable Terser minification in wp plugin
			build: {
				outDir: 'build',
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
				watch: ['./resources/widgets/**/*.php'],
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
});
