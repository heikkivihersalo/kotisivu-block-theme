import { defineConfig } from 'vite';
import { wordpressPlugin } from '@roots/vite-plugin';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import gutenbergBlocksPlugin from './.vite/GutenbergBlocksPlugin.js';

export default defineConfig({
	base: '/build/',
	plugins: [
		react({
			jsxRuntime: 'classic',
		}),
		laravel({
			input: ['resources/app/scripts/theme.ts'],
		}),
		wordpressPlugin({
			hmr: {
				// Enable/disable HMR (default: true)
				enabled: false,

				// Pattern to match editor entry points (default: /editor/)
				editorPattern: /editor/,

				// Name of the editor iframe element (default: 'editor-canvas')
				iframeName: 'editor-canvas',
			},
		}),
		gutenbergBlocksPlugin({
			input: {
				'block-library': 'resources/widgets/block-library/custom',
				'page-templates': 'resources/widgets/page-templates',
				'template-parts': 'resources/widgets/template-parts',
			},
			output: 'build/blocks',
			copyBlockJson: true,
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
