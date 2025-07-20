import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { viteBlocks } from './.vite/index.ts';

export default defineConfig({
	base: '/build/',
	plugins: [
		react(),
		laravel({
			input: ['resources/app/scripts/theme.ts'],
		}),
		viteBlocks({
			outDir: 'build',
			dependencies: [''],
			pathMappings: {
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
