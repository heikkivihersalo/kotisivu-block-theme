/**
 * Webpack configuration file for multi-block WordPress theme
 * @author Heikki Vihersalo
 * @link https://www.kotisivu.dev
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
const path = require('path');
const glob = require('glob');

// Import the @wordpress/scripts config.
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

// Import the utility to auto-generate the entry points in the src directory.
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');

/*--------------------------------------------------------------
  2.0 Helper functions
--------------------------------------------------------------*/
/**
 * Get all core blocks from source folder
 * @returns {array}
 */
function getCoreBlocks() {
    const src = glob.sync("./src/blocks/core/**/*.js");
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
  3.0 Webpack configurations
--------------------------------------------------------------*/
module.exports = {
    ...defaultConfig,
    entry: {
        ...getWebpackEntryPoints(),
        'blocks/core/core': getCoreBlocks(),
        'theme/admin': path.resolve(__dirname, 'src/theme/scripts/admin.js'),
        'theme/cpt': path.resolve(__dirname, 'src/theme/scripts/cpt.js'),
        'theme/dark-mode': path.resolve(__dirname, 'src/theme/scripts/dark-mode.js'),
        'theme/inline': path.resolve(__dirname, 'src/theme/scripts/inline.js'),
        'theme/sanitize': path.resolve(__dirname, 'src/theme/scripts/sanitize.js'),
        'theme/theme': path.resolve(__dirname, 'src/theme/scripts/theme.js'),
    },
    resolve: {
        alias: {
            '@features': path.resolve('src/features'),
            '@utils': path.resolve('src/utils'),
            '@hooks': path.resolve('src/hooks')
        }
    }
}