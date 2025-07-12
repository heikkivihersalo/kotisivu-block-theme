// Discovery modules
export {
	createBlockInputs,
	getBlockJsonFiles,
} from './discovery/blockDiscovery.js';

// Generator modules
export { createBundleGenerator } from './generators/bundleGeneration.js';

// Utility modules
export {
	createManualChunks,
	createChunkFileNames,
	isModuleUsedByEditor,
} from './utils/chunking.js';

export {
	createExternalFunction,
	createGlobalsMapping,
} from './utils/externals.js';

export {
	moveFile,
	getAllFiles,
	safeReadFile,
	safeWriteFile,
} from './utils/fileSystem.js';

export {
	generateAssetFileContent,
	generateFileHash,
	extractWordPressDependencies,
} from './utils/wordpress.js';

export {
	updateImportPathsWithMappings,
	updateImportPathsForFinalLocation,
} from './utils/pathUtils.js';

export {
	fixCssFiles,
	cleanupCssComments,
	removeCSSImportComments,
} from './utils/cssProcessor.js';

// Organizer modules
export { createDirectOutputOrganizer } from './organizers/directOutputOrganizer.js';

export { createPostBuildOrganizer } from './organizers/postBuildOrganizer.js';
