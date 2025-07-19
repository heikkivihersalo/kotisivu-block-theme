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
