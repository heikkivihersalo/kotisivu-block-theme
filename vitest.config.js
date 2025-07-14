import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		include: ['.vite/**/*.test.js', '.vite/**/*.test.ts'],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './resources'),
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
	},
});
