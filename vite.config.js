import { defineConfig } from 'vite';
import { wp } from './.vite/index.ts';

export default defineConfig({
	base: '/build/',
	publicDir: false, // Disable public directory copying
	plugins: [
		wp({
			outDir: 'build',
			dependencies: [''],
			assetPaths: {
				'assets/admin': 'resources/app/scripts/admin.ts',
				'assets/dark-mode': 'resources/app/scripts/dark-mode.ts',
				'assets/inline': 'resources/app/scripts/inline.ts',
				'assets/sanitize': 'resources/app/scripts/sanitize.ts',
				'assets/theme': 'resources/app/scripts/theme.ts',
			},
			blockPaths: {
				'blocks/custom': 'resources/widgets/block-library/custom',
				'blocks/parts': 'resources/widgets/block-library/parts',
				'template-parts': 'resources/widgets/template-parts',
				'page-templates': 'resources/widgets/page-templates',
			},
			watch: ['./resources/widgets/**/*.php'],
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
