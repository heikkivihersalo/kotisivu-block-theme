// Export the modular plugins from their respective folders
export { BlocksPlugin } from './blocks-plugin/index.js';
export { AssetsPlugin } from './assets-plugin/index.js';
export { CorePlugin } from './core-plugin/index.js';
export { ConfigPlugin } from './config-plugin/index.js';
export { ManifestPlugin } from './manifest-plugin/index.js';
export { DevServerPlugin } from './dev-server-plugin/index.js';

// Export the external plugins generator
export { default as generatePlugins } from './external-plugins/index.js';
