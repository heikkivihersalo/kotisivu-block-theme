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

const blockSourcePath = './src/blocks';

const getLiveReloadPort = (inputPort) => {
	const parsedPort = parseInt(inputPort, 10);
	return Number.isInteger(parsedPort) ? parsedPort : 35729;
};

/**
 * Get all core blocks
 */
function getCoreBlocks() {
	const src = glob.sync(blockSourcePath + "/core/**/*.js");
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
 * Get all custom blocks
 */
function getCustomBlocks() {
	const src = [...glob.sync(blockSourcePath + "/static/*/*.js"), ...glob.sync(blockSourcePath + "/dynamic/*/*.js")];
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


module.exports = [
	/**
	 * WordPress blocks
	 */
	{
		...defaultConfig,
		entry: getCustomBlocks,
		resolve: {
			alias: {
				'@features': path.resolve('src/features'),
				'@utils': path.resolve('src/utils'),
				'@hooks': path.resolve('src/hooks'),
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
			'theme': ['./src/assets/scripts/theme.js', ...getCoreBlocks()],
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
		].filter(Boolean),
		module: {
			rules: [
				{
					test: /\.css$/,
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
			]
		},
	}
];
