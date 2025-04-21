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
 * Import the getWebpackEntryPoints function from WordPress scripts
 * @type {import('@wordpress/scripts').WebpackUtils}
 */
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');

/**
 * Import custom Webpack packages
 *
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
	const src = glob.sync('./src/block-library/core/**/*.ts');
	const blocks = [];

	src.forEach((entry) => {
		switch (entry.split('/')[5]) {
			case 'index.ts':
				blocks.push(entry);
				break;
			default:
				break;
		}
	});

	return blocks;
}

/*--------------------------------------------------------------
  3.0 Webpack configurations
--------------------------------------------------------------*/
module.exports = {
	...defaultConfig,
	entry: {
		...getWebpackEntryPoints(),
		'block-library/core/core': getCoreBlocks(),
		'assets/admin': path.resolve(__dirname, 'src/app/scripts/admin.ts'),
		'assets/dark-mode': path.resolve(
			__dirname,
			'src/app/scripts/dark-mode.ts'
		),
		'assets/inline': path.resolve(
			__dirname,
			'src/app/scripts/inline.ts'
		),
		'assets/sanitize': path.resolve(
			__dirname,
			'src/app/scripts/sanitize.ts'
		),
		'assets/theme': path.resolve(__dirname, 'src/app/scripts/theme.ts'),
		'assets/store': path.resolve(__dirname, 'src/app/data-stores/index.ts'),
		'options/index': path.resolve(__dirname, 'src/widgets/admin-pages/index.tsx'),
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
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
					from: path.resolve(__dirname, 'src', 'widgets', 'admin-pages', 'render.php'),
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
