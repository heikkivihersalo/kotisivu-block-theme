/**
 * Webpack configuration file for multi-block WordPress theme
 * @author Heikki Vihersalo
 * {@link https://www.kotisivu.dev www.kotisivu.dev}
 */

/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
1.0 Dependencies
2.0 Helper functions
3.0 Webpack configurations
--------------------------------------------------------------*/

/*--------------------------------------------------------------
  1.0 Dependencies
--------------------------------------------------------------*/
/**
 * Import path and glob modules
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob');

/**
 * Import the default Webpack configuration from WordPress scripts
 * @type {import('webpack').Configuration}
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

/**
 * Import custom Webpack packages
 * @type {import('webpack').Configuration}
 */
const CopyPlugin = require('copy-webpack-plugin');

/*--------------------------------------------------------------
  2.0 Helper functions
--------------------------------------------------------------*/
/**
 * Get all core blocks from source folder
 * @return {string[]} List of core block paths
 */
function getCoreBlocks() {
	const src = glob.sync('./src/widgets/block-library/core/**/*.ts');
	const blocks = [];

	src.forEach((entry) => {
		switch (entry.split('/')[6]) {
			case 'index.ts':
				blocks.push(entry);
				break;
			default:
				break;
		}
	});

	return blocks;
}

/**
 * Merge the file extensions with the default WordPress extensions
 * @return {string[]} Merged list of file extensions
 */
function mergeFileExtensions() {
	// Merge the extensions setting with whatever WordPress has in their config
	const defaultExtensions = defaultConfig.resolve.extensions || [
		'.js',
		'.jsx',
	];

	// Add TypeScript extensions to the default extensions
	const mergedExtensions = ['.ts', '.tsx'];

	return [...mergedExtensions, ...defaultExtensions];
}

/*--------------------------------------------------------------
  3.0 Webpack configurations
--------------------------------------------------------------*/
module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		'app/admin': path.resolve(__dirname, 'src/app/scripts/admin.ts'),
		'app/dark-mode': path.resolve(
			__dirname,
			'src/app/scripts/dark-mode.ts'
		),
		'app/inline': path.resolve(__dirname, 'src/app/scripts/inline.ts'),
		'app/sanitize': path.resolve(__dirname, 'src/app/scripts/sanitize.ts'),
		'app/theme': path.resolve(__dirname, 'src/app/scripts/theme.ts'),
		'app/store': path.resolve(__dirname, 'src/app/stores/index.ts'),
		'widgets/block-library/core/core': getCoreBlocks(),
		'options/index': path.resolve(
			__dirname,
			'src/widgets/admin-pages/index.tsx'
		),
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.tsx?$/, // Match both `.ts` and `.tsx`
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.json',
							transpileOnly: true, // Speeds up by skipping type-checking.
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: mergeFileExtensions(),
		alias: {
			'@/app': path.resolve(__dirname, 'src', 'app'),
			'@/shared': path.resolve(__dirname, 'src', 'shared'),
			'@/widgets': path.resolve(__dirname, 'src', 'widgets'),
		},
	},
	plugins: [
		...defaultConfig.plugins,
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(
						__dirname,
						'src',
						'widgets',
						'admin-pages',
						'render.php'
					),
					to: path.resolve(
						__dirname,
						'build',
						'options',
						'render.php'
					),
				},
			],
		}),
	],
};
