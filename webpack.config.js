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
	const src = glob.sync('./src/block-library/core/**/*.js');
	const blocks = [];

	src.forEach((entry) => {
		switch (entry.split('/')[5]) {
			case 'index.js':
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
		'assets/admin': path.resolve(__dirname, 'src/assets/scripts/admin.js'),
		'assets/cpt': path.resolve(__dirname, 'src/assets/scripts/cpt.ts'),
		'assets/dark-mode': path.resolve(
			__dirname,
			'src/assets/scripts/dark-mode.ts'
		),
		'assets/inline': path.resolve(
			__dirname,
			'src/assets/scripts/inline.js'
		),
		'assets/sanitize': path.resolve(
			__dirname,
			'src/assets/scripts/sanitize.js'
		),
		'assets/theme': path.resolve(__dirname, 'src/assets/scripts/theme.js'),
		'assets/store': path.resolve(__dirname, 'src/stores/index.js'),
		'admin/index': path.resolve(__dirname, 'src/admin/index.js'),
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
		alias: {
			'@components': path.resolve(__dirname, 'src', 'components'),
			'@hooks': path.resolve(__dirname, 'src', 'hooks'),
			'@icons': path.resolve(__dirname, 'src', 'icons'),
			'@stores': path.resolve(__dirname, 'src', 'stores'),
			'@utils': path.resolve(__dirname, 'src', 'utils'),
			'@admin': path.resolve(__dirname, 'src', 'admin', 'components'),
		},
	},
	plugins: [
		...defaultConfig.plugins,
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src', 'admin', 'render.php'),
					to: path.resolve(__dirname, 'build', 'admin', 'render.php'),
				},
			],
		}),
	],
};
