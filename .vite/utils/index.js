// Feature-based exports for Vite configuration

// Input feature - block input configuration
export { createBlockInputs } from './input/index.js';

// Chunks feature - rollup chunking
export { createManualChunks } from './chunks/index.js';

// Externals feature - external dependencies and globals
export {
	createExternalFunction,
	createGlobalsMapping,
} from './externals/index.js';

// Bundle feature - generateBundle phase
export { createBundleGenerator } from './bundle/index.js';

// CSS feature - CSS processing and splitting
export { splitEditorCSS } from './css/index.js';
