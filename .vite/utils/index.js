// Feature-based exports for Vite configuration

// Input feature - block input configuration
export { createBlockInputs } from './input/index.js';

// Chunks feature - rollup chunking and file naming
export {
	createManualChunks,
	createChunkFileNames,
} from './chunks/index.js';

// Externals feature - external dependencies and globals
export {
	createExternalFunction,
	createGlobalsMapping,
} from './externals/index.js';

// Bundle feature - generateBundle and writeBundle phases
export {
	createBundleGenerator,
	createDirectOutputOrganizer,
} from './bundle/index.js';
