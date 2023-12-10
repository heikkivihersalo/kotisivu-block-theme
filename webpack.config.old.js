/**
 * Webpack configuration file for multi-block WordPress theme
 * @author Heikki Vihersalo
 * @link https://www.kotisivu.dev
 * 
 * Forked from Phil Solas multi-block plugin and modified to fit theme
 * @link https://github.com/phil-sola/multi-block-plugin/blob/master/webpack.config.js
 */

/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
1.0 Dependencies
2.0 Constants
3.0 Helper functions
4.0 Common module configurations
5.0 Webpack configurations
--------------------------------------------------------------*/

/*--------------------------------------------------------------
  1.0 Dependencies
--------------------------------------------------------------*/
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const glob = require('glob');

/*--------------------------------------------------------------
  2.0 Constants
--------------------------------------------------------------*/
const BLOCK_SOURCE_PATH = './src/blocks';
const THEME_SOURCE_PATH = './src/assets/scripts';
const IS_PRODUCTION = process.env.NODE_ENV === 'development';

/*--------------------------------------------------------------
  3.0 Helper functions
--------------------------------------------------------------*/
/**
 * Get live reload port
 * @param {string} inputPort
 * @returns {number}
 */
const getLiveReloadPort = (inputPort) => {
	const parsedPort = parseInt(inputPort, 10);
	return Number.isInteger(parsedPort) ? parsedPort : 35729;
};

/**
 * Get all core blocks from source folder
 * @returns {array}
 */
function getCoreBlocks() {
	const src = glob.sync(BLOCK_SOURCE_PATH + "/core/**/*.js");
	const blocks = [];

	src.forEach(entry => {
		switch (entry.split('/')[5]) {
			case 'index.js':
				blocks.push(entry);
				break;
			default:
				break;
		}
	});

	return blocks;
};

/**
 * Get all custom blocks from source folder
 * @returns {object}
 */
function getCustomBlocks() {
	const src = [...glob.sync(BLOCK_SOURCE_PATH + "/static/*/*.js"), ...glob.sync(BLOCK_SOURCE_PATH + "/dynamic/*/*.js")];
	const blocks = {};

	src.forEach(entry => {
		switch (entry.split('/')[5]) {
			case 'index.js':
				blocks[`${entry.split('/')[4]}`] = entry;
				break;
			case 'view.js':
				blocks[`${entry.split('/')[4]}-view-script`] = entry;
			default:
				break;
		}
	});

	return blocks;
};

/**
 * Get editor styles for custom blocks
 */
function getEditorStyles() {
	const src = [...glob.sync(BLOCK_SOURCE_PATH + "/static/*/*.js"), ...glob.sync(BLOCK_SOURCE_PATH + "/dynamic/*/*.js")];
	const styles = {};

	src.forEach(entry => {
		switch (entry.split('/')[5]) {
			case 'edit.js':
				styles[`${entry.split('/')[4]}-editor`] = entry;
				break;
			default:
				break;
		}
	});

	console.log(styles);

	return styles;
}

/*--------------------------------------------------------------
  4.0 Common module configurations
--------------------------------------------------------------*/
const rules = [
	{
		test: /\.css$/i,
		use: [
			MiniCssExtractPlugin.loader,
			'css-loader'
		]
	},
	{
		test: /\.js$|jsx/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: {
				presets: ['@wordpress/babel-preset-default']
			}
		}
	}
];

const alias = {
	'@features': path.resolve('src/features'),
	'@utils': path.resolve('src/utils'),
	'@hooks': path.resolve('src/hooks'),
}

/*--------------------------------------------------------------
  4.0 Webpack configurations
--------------------------------------------------------------*/
module.exports = [
	/* WordPress blocks */
	{
		...defaultConfig,
		entry: getCustomBlocks,
		resolve: {
			alias
		},
		output: {
			filename: 'js/blocks/[name].js',
			path: path.resolve(process.cwd(), 'assets')
		},
		plugins: [
			new CleanWebpackPlugin({
				cleanOnceBeforeBuildPatterns: [
					'css/blocks/*',
					'js/blocks/*'
				],
			}),
			new MiniCssExtractPlugin({
				filename: 'css/blocks/style-[name].css'
			}),
			!IS_PRODUCTION &&
			new LiveReloadPlugin({
				port: getLiveReloadPort(process.env.WP_LIVE_RELOAD_PORT),
			}),
			new DependencyExtractionWebpackPlugin(),
		].filter(Boolean),
		module: {
			rules
		},
		optimization: {
			minimize: true,
			minimizer: [
				new CssMinimizerPlugin(),
				new TerserPlugin(),
			],
		},
	},
	/* Editor styles for custom blocks */
	{
		...defaultConfig,
		entry: getEditorStyles,
		resolve: {
			alias
		},
		output: {
			filename: 'js/blocks/[name].js',
			path: path.resolve(process.cwd(), 'assets')
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/blocks/[name].css'
			}),
			!IS_PRODUCTION &&
			new LiveReloadPlugin({
				port: getLiveReloadPort(process.env.WP_LIVE_RELOAD_PORT),
			}),
			new DependencyExtractionWebpackPlugin(),
		].filter(Boolean),
		module: {
			rules
		},
		optimization: {
			minimize: true,
			minimizer: [
				new CssMinimizerPlugin(),
				new TerserPlugin(),
			],
		},
	},
	/* Theme spesific files */
	{
		...defaultConfig,
		entry: {
			'theme': [THEME_SOURCE_PATH + '/theme.js', ...getCoreBlocks()],
			'admin': THEME_SOURCE_PATH + '/admin.js',
			'inline': THEME_SOURCE_PATH + '/inline.js',
			'sanitize': THEME_SOURCE_PATH + '/sanitize.js',
			'dark-mode': THEME_SOURCE_PATH + '/dark-mode.js',
		},
		output: {
			filename: 'js/theme/[name].js',
			path: path.resolve(process.cwd(), 'assets')
		},
		plugins: [
			new CleanWebpackPlugin({
				cleanOnceBeforeBuildPatterns: [
					'css/theme/*',
					'js/theme/*'
				],
			}),
			new MiniCssExtractPlugin({
				filename: 'css/theme/[name].css'
			}),
			!IS_PRODUCTION &&
			new LiveReloadPlugin({
				port: getLiveReloadPort(process.env.WP_LIVE_RELOAD_PORT),
			}),
			new DependencyExtractionWebpackPlugin()
		].filter(Boolean),
		module: {
			rules
		},
		optimization: {
			minimize: true,
			minimizer: [
				new CssMinimizerPlugin(),
				new TerserPlugin(),
			],
		},
	}
];
