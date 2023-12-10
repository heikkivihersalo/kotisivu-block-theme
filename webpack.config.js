/**
 * Webpack configuration file for multi-block WordPress theme
 * @author Heikki Vihersalo
 * @link https://www.kotisivu.dev
 */

/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
1.0 Dependencies
2.0 Constants
3.0 Helper functions
4.0 Webpack configurations
--------------------------------------------------------------*/

/*--------------------------------------------------------------
  1.0 Dependencies
--------------------------------------------------------------*/
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const glob = require('glob');

// Import the @wordpress/scripts config.
const defaultConfig = require('@wordpress/scripts/config/webpack.config')

// Import the utility to auto-generate the entry points in the src directory.
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config')

/*--------------------------------------------------------------
  2.0 Constants
--------------------------------------------------------------*/
const BLOCK_SOURCE_PATH = './src/blocks';
const THEME_SOURCE_PATH = './src/theme/scripts';

/*--------------------------------------------------------------
  3.0 Helper functions
--------------------------------------------------------------*/
/**
 * Override the default WordPress plugins config.
 * @param {array} plugins
 * @returns {array}
 */
const getPlugins = (plugins) => {
    plugins.forEach((p, i) => {
        /**
         * Override the default CleanWebpackPlugin config.
         */
        if (p.constructor.name === 'CleanWebpackPlugin') {
            plugins.splice(i, 1, new CleanWebpackPlugin({
                ...p,
                cleanOnceBeforeBuildPatterns: [
                    '**/*',
                    '!fonts/**',
                    '!images/**',
                    '!icons/**',
                    '!theme/**'
                ],
                cleanAfterEveryBuildPatterns: ['!fonts/**', '!images/**', '!icons/**', '!theme/**']
            }));
        }
    })

    return plugins;
}

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

/*--------------------------------------------------------------
  4.0 Webpack configurations
--------------------------------------------------------------*/
module.exports = [
    //
    // Extend the default WordPress config.
    //
    {
        ...defaultConfig,
        entry: {
            ...getWebpackEntryPoints(),
            'blocks/core/core': getCoreBlocks(),
        },
        output: {
            path: path.resolve(process.cwd(), 'assets'),
        },
        resolve: {
            alias: {
                '@features': path.resolve('src/features'),
                '@utils': path.resolve('src/utils'),
                '@hooks': path.resolve('src/hooks')
            }
        },
        plugins: getPlugins(defaultConfig.plugins),
    },
    //
    // Theme config.
    //
    {
        entry: {
            'theme': [THEME_SOURCE_PATH + '/theme.js'],
            'admin': THEME_SOURCE_PATH + '/admin.js',
            'inline': THEME_SOURCE_PATH + '/inline.js',
            'sanitize': THEME_SOURCE_PATH + '/sanitize.js',
            'dark-mode': THEME_SOURCE_PATH + '/dark-mode.js',
        },
        output: {
            filename: 'theme/[name].js',
            path: path.resolve(process.cwd(), 'assets')
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    'theme/*'
                ],
            }),
            new MiniCssExtractPlugin({
                filename: 'theme/[name].css'
            }),
            new DependencyExtractionWebpackPlugin()
        ].filter(Boolean),
        module: {
            rules: [
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
            ]
        },
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin(),
            ],
        },
    }
]