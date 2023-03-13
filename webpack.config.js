/**
 * Webpack config based on repository https://github.com/phil-sola/multi-block-plugin/blob/master/webpack.config.js
 * 
 */

const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const glob = require('glob');

const isProduction = process.env.NODE_ENV === 'development';

const getLiveReloadPort = (inputPort) => {
	const parsedPort = parseInt(inputPort, 10);
	return Number.isInteger(parsedPort) ? parsedPort : 35729;
};

function getBlocks() {
	const blocks = {};
	/**
	 * Add all blocks to the build
	 */
	glob.sync("./src/blocks/**/*.js").forEach(entry => {
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


module.exports = [
	/**
	 * WordPress blocks
	 */
	{
		...defaultConfig,
		entry: getBlocks,
		resolve: {
			alias: {
				'@features': path.resolve('src/features'),
				'@utils': path.resolve('src/utils')
			}
		},
		output: {
			filename: '[name].js',
			path: path.resolve(process.cwd(), 'build/blocks')
		},
		plugins: [
			new CleanWebpackPlugin({
				cleanAfterEveryBuildPatterns: ['!blocks/fonts/**', '!blocks/images/**'],
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css'
			}),
			process.env.WP_BUNDLE_ANALYZER && new BundleAnalyzerPlugin(),
			!isProduction &&
			new LiveReloadPlugin({
				port: getLiveReloadPort(process.env.WP_LIVE_RELOAD_PORT),
			}),
			!process.env.WP_NO_EXTERNALS &&
			new DependencyExtractionWebpackPlugin(),
		].filter(Boolean)
	},
	/**
	 * Theme spesific files
	 */
	{
		...defaultConfig,
		entry: {
			'theme': './src/assets/scripts/theme.js',
			'admin': './src/assets/scripts/admin.js'
		},
		output: {
			filename: '[name].js',
			path: path.resolve(process.cwd(), 'build/theme')
		},
		plugins: [
			new CleanWebpackPlugin({
				cleanAfterEveryBuildPatterns: ['!fonts/**', '!images/**'],
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css'
			}),
			process.env.WP_BUNDLE_ANALYZER && new BundleAnalyzerPlugin(),
			!isProduction &&
			new LiveReloadPlugin({
				port: getLiveReloadPort(process.env.WP_LIVE_RELOAD_PORT),
			}),
			!process.env.WP_NO_EXTERNALS &&
			new DependencyExtractionWebpackPlugin(),
		].filter(Boolean)
	}
]
