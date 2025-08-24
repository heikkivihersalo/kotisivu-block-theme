/**
 * External dependencies
 */
import type { Plugin } from 'esbuild';

/**
 * Shared dependencies
 */
import { readStylesheet } from '../utils/lib/readStylesheet.ts';

/**
 * ESBuild plugin to handle SCSS/Sass files
 */
export const scssPlugin: Plugin = {
	name: 'scss',
	setup(build) {
		// Handle .scss and .sass files
		build.onLoad({ filter: /\.(scss|sass)$/ }, (args) => {
			try {
				// Use the existing readStylesheet utility to compile SCSS to CSS
				const css = readStylesheet(args.path);
				return {
					contents: css,
					loader: 'css',
				};
			} catch (error) {
				return {
					errors: [
						{
							text: `Failed to compile SCSS file: ${error instanceof Error ? error.message : 'Unknown error'}`,
							location: { file: args.path },
						},
					],
				};
			}
		});
	},
};
