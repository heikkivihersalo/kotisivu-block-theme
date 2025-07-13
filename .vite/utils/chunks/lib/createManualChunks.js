import { getFrontendOnlyPackages } from './getFrontendOnlyPackages.js';

/**
 * Check if a module is a utility function (not a component)
 * @param {string} id - Module ID to check
 * @returns {boolean} True if module appears to be a utility function
 */
function isUtilityModule(id) {
	// Check if filename suggests it's a utility
	const utilityPatterns = [
		/\/get[A-Z]/, // getUrlParamValue, getTransformedMetadata
		/\/update[A-Z]/, // updateUrlParamValue
		/\/use[A-Z][^/]*\.tsx?$/, // useInfiniteQuery, but not components
		/\/helpers\./, // helper functions
		/\/constants\./, // constants
		/\/utils\//, // anything in utils folder
	];

	return utilityPatterns.some((pattern) => pattern.test(id));
}

/**
 * Check if a module is only used by view files (frontend-only)
 * @param {string} id - Module ID to check
 * @param {Function} getModuleInfo - Rollup function to get module info
 * @returns {boolean} True if module is only used by view files
 */
function isUsedOnlyByViewFiles(id, getModuleInfo) {
	const moduleInfo = getModuleInfo(id);
	if (!moduleInfo) return false;

	// Get all importers of this module
	const importers = moduleInfo.importers || [];
	if (importers.length === 0) return false;

	// Check if all importers are either:
	// 1. View files (contain 'view.js', 'view.ts', 'view.tsx')
	// 2. Other modules that are also only used by view files
	const checkImporter = (importerId, visited = new Set()) => {
		if (visited.has(importerId)) return true; // Avoid infinite recursion
		visited.add(importerId);

		// If this is a view file, it's frontend-only
		if (
			importerId.includes('/view.js') ||
			importerId.includes('/view.ts') ||
			importerId.includes('/view.tsx')
		) {
			return true;
		}

		// If this is an index file or editor file, it's not frontend-only
		if (
			importerId.includes('/index.js') ||
			importerId.includes('/index.ts') ||
			importerId.includes('/index.tsx') ||
			importerId.includes('/editor.') ||
			importerId.includes('/edit.')
		) {
			return false;
		}

		// Check the importers of this importer recursively
		const importerInfo = getModuleInfo(importerId);
		if (
			!importerInfo ||
			!importerInfo.importers ||
			importerInfo.importers.length === 0
		) {
			return false;
		}

		return importerInfo.importers.every((subImporterId) =>
			checkImporter(subImporterId, visited)
		);
	};

	return importers.every((importerId) => checkImporter(importerId));
}

/**
 * Creates manual chunks configuration for Rollup
 * @returns {Function} Manual chunks function for Rollup configuration
 */
export function createManualChunks() {
	const frontendOnlyPackages = getFrontendOnlyPackages();

	return (id, { getModuleInfo }) => {
		// Skip external modules
		if (!id.startsWith('/') && !id.startsWith('.')) {
			return null;
		}

		// Check if this module is from a frontend-only package
		const isFrontendOnlyPackage = frontendOnlyPackages.some(
			(packageName) =>
				id.includes(`node_modules/${packageName}/`) ||
				id.includes(`@${packageName}/`) ||
				id === packageName
		);

		if (isFrontendOnlyPackage) {
			// Extract package name for frontend-only packages
			const packageMatch = frontendOnlyPackages.find(
				(pkg) =>
					id.includes(`node_modules/${pkg}/`) ||
					id.includes(`@${pkg}/`)
			);
			if (packageMatch) {
				// Clean up scoped package names (e.g., @scope/package -> scope-package)
				return packageMatch.replace('@', '').replace('/', '-');
			}
		}

		// Only extract utility modules that are used only by view files
		if (isUtilityModule(id) && isUsedOnlyByViewFiles(id, getModuleInfo)) {
			// Extract a meaningful name for the chunk
			const match = id.match(/\/([^\/]+)\.(js|ts|tsx?)$/);
			if (match) {
				const fileName = match[1];
				// Use the actual filename for the chunk name
				return fileName;
			}
		}

		// For other dependencies (components, etc.), let them be bundled into their respective entry files
		return null;
	};
}
