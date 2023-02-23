/**
 * Load enviroment variables 
 * 
 * @link https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/#provide-your-own-webpack-config
 * @link https://webpack.js.org/plugins/environment-plugin/
 *
 * Use variables with following syntax: 'process.env.API_KEY'
 * Create new 'webpack.config.js' file to the root of your project with following content
 * 
 * 

  const { EnvironmentPlugin } = require('webpack');
  const defaultConfig  = require('@wordpress/scripts/config/webpack.config');

  module.exports = {
    ...defaultConfig,
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    },
    plugins: [
      ...defaultConfig.plugins,
      new EnvironmentPlugin({
        API_KEY: "api_key_here"
      })
    ]
  };
  */

const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  ...defaultConfig,
  entry: {
    theme: [path.resolve(__dirname, "src", "theme", "index.js")],
    react: [path.resolve(__dirname, "src", "react-app", "index.js")],
    admin: [path.resolve(__dirname, "src", "admin", "index.js")],
  },
  optimization: {
    ...defaultConfig.optimization,
    splitChunks: {
        cacheGroups: {
            theme: {
                name: 'theme',
                test: /theme\.s?css$/,
                chunks: 'all',
                enforce: true,
            },
            react: {
                name: 'react',
                test: /react\.s?css$/,
                chunks: 'all',
                enforce: true,
            },
        },
    },
},
  plugins: [
    ...defaultConfig.plugins,
    new MiniCssExtractPlugin({
      filename: ({ chunk }) => `${chunk.name.replace('/js/', '/css/')}.css`,
    })
  ],
  module: {
    ...defaultConfig.module,
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
};