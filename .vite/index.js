// Feature-based exports for Vite configuration

// Blocks feature - input configuration
export {
	createBlockInputs,
	getBlockJsonFiles,
} from './features/blocks/index.js';

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
