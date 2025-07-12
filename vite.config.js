import { defineConfig } from 'vite';
import { wordpressPlugin } from '@roots/vite-plugin';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import gutenbergBlocksPlugin from './.vite/GutenbergBlocksPlugin.js';

export default defineConfig({
	base: '/build/',
	plugins: [
		react(),
		laravel({
			input: ['resources/app/scripts/theme.ts'],
			refresh: false, // Disable automatic refresh
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
			blocksDir: 'resources/widgets/block-library/custom',
			outputDir: 'build/test/block-library/custom',
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
