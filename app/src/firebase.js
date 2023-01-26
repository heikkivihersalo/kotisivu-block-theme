/**
 * Load enviroment variables 
 * 
 * @link https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/#provide-your-own-webpack-config
 * @link https://webpack.js.org/plugins/environment-plugin/
 * 
 * Use variables with following syntax: 'process.env.API_KEY'
 * 
 * Create new 'webpack.config.js' file to the root of your project with following content
 * 

--- START OF WEBPACK.CONFIG.JS ---

  const { EnvironmentPlugin } = require('webpack');
  const defaultConfig  = require('@wordpress/scripts/config/webpack.config');

  module.exports = {
    ...defaultConfig,
    plugins: [
      ...defaultConfig.plugins,
      new EnvironmentPlugin({
        API_KEY: "api_key_here"
      })
    ]
  };

--- END OF WEBPACK.CONFIG.JS ---
*/

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };