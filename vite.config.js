import { defineConfig } from 'vite';
import { wordpressPlugin } from '@roots/vite-plugin';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { gutenbergBlocksPlugin } from './.vite/index.js';

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
			chunks: {
				// Explicit chunking configuration:
				// - Empty arrays (default): All dependencies bundled with entry files
				// - Specified paths: Only those paths are split into chunks
				frontend: [
					// Example: Split frontend-only utilities into chunks
					// 'resources/shared/utils/frontend',
					// 'resources/widgets/block-library/custom/product-grid/utils/frontend'
				],
				editor: [
					// Example: Split editor-only utilities into chunks
					// 'resources/shared/components/inspector',
					// 'resources/shared/utils/editor'
				],
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
