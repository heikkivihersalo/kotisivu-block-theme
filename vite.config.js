import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { createViteBlock } from './.vite/index.ts';

export default defineConfig({
	base: '/build/',
	plugins: [
		react({
			jsxRuntime: 'classic',
		}),
		laravel({
			input: ['resources/app/scripts/theme.ts'],
		}),
		createViteBlock({
			outDir: 'build',
			dependencies: ['shadpress-editor'],
			// Option 1: Use the original blockFolders format (backward compatible)
			/*
			blockFolders: [
				'resources/widgets/block-library/custom',
				'resources/widgets/template-parts',
				'resources/widgets/page-templates',
				'resources/widgets/block-library/parts',
			],
			*/
			// Option 2: Use the new pathMappings format for custom output paths
			pathMappings: {
				'blocks/custom': 'resources/widgets/block-library/custom',
				'blocks/parts': 'resources/widgets/block-library/parts',
				'template-parts': 'resources/widgets/template-parts',
				'page-templates': 'resources/widgets/page-templates',
			},
			watch: [
				'./src/template.php',
				'./src/render.php',
				'./resources/widgets/**/*.php',
			],
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
