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

function getEntries() {
	const out = {};
	glob.sync("./src/blocks/**/index.js").forEach(entry => {
		out[entry.split('/')[4]] = entry;
	});

	return out;
};


module.exports = {
	...defaultConfig,
	entry: getEntries,
	resolve: {
		alias: {
			'@common-components': path.resolve('src/components'),
			'@utilities': path.resolve('src/utilities')
		}
	},
	output: {
		filename: '[name].js',
		path: path.resolve(process.cwd(), 'build')
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
