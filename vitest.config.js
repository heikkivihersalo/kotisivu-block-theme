import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		include: ['tests/**/*.test.js', 'tests/**/*.test.ts'],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './resources'),
		},
	},
});
