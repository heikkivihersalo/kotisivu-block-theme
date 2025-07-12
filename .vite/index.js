// Feature-based exports for Vite configuration

// Input feature - block input configuration
export { createBlockInputs } from './features/input/index.js';

// Chunks feature - rollup chunking and file naming
export {
	createManualChunks,
	createChunkFileNames,
	isModuleUsedByEditor,
} from './features/chunks/index.js';

// Externals feature - external dependencies and globals
export {
	createExternalFunction,
	createGlobalsMapping,
} from './features/externals/index.js';

// Bundle feature - generateBundle and writeBundle phases
export {
	createBundleGenerator,
	createDirectOutputOrganizer,
} from './features/bundle/index.js';
