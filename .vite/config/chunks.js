import { readFileSync } from 'fs';
import { resolve } from 'path';
import { ASSET_FOLDERS } from './constants.js';

/**
 * Get frontend-only packages from package.json dependencies
 * @returns {string[]} Array of package names that should be treated as frontend-only
 */
function getFrontendOnlyPackages() {
	try {
		const packageJsonPath = resolve(process.cwd(), 'package.json');
		const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

		// List of packages that should be considered frontend-only
		// These are packages that are primarily used in view files, not editor files
		const frontendPackagePatterns = [
			'@tanstack/react-query',
			'query-string',
			'use-debounce',
			// Add more patterns as needed
		];

		const allDependencies = {
			...packageJson.dependencies,
			...packageJson.devDependencies,
		};

		return Object.keys(allDependencies).filter((pkg) =>
			frontendPackagePatterns.some((pattern) => pkg.includes(pattern))
		);
	} catch (error) {
		console.warn(
			'Could not read package.json for frontend package detection:',
			error.message
		);
		return [];
	}
}

/**
 * Get chunk names for frontend-only packages
 * @returns {string[]} Array of chunk names for frontend packages
 */
export function getFrontendOnlyChunkNames() {
	return getFrontendOnlyPackages().map((pkg) =>
		pkg.replace(/[@\/]/g, '-').replace(/^-/, '')
	);
}

/**
 * Create manual chunks configuration for Rollup
 * This separates shared utilities based on their usage patterns
 * @returns {Function} Manual chunks function for Rollup
 */
export function createManualChunks() {
	const frontendOnlyPackages = getFrontendOnlyPackages();

	return (id, { getModuleInfo }) => {
		// Handle npm packages
		if (id.includes('node_modules')) {
			const packageName = id.split('node_modules/')[1].split('/')[0];

			// Check if this is a scoped package
			if (packageName.startsWith('@')) {
				const scopedPackageName = id
					.split('node_modules/')[1]
					.split('/')
					.slice(0, 2)
					.join('/');
				if (frontendOnlyPackages.includes(scopedPackageName)) {
					return scopedPackageName
						.replace(/[@\/]/g, '-')
						.replace(/^-/, '');
				}
			} else if (frontendOnlyPackages.includes(packageName)) {
				return packageName.replace(/[@\/]/g, '-');
			}

			// Don't chunk other npm packages - let Vite handle them
			return undefined;
		}

		// Handle local utility modules that are used only by view files
		const moduleInfo = getModuleInfo(id);
		if (!moduleInfo) return undefined;

		// Get all importers recursively to determine usage
		const getAllImporters = (moduleId, visited = new Set()) => {
			if (visited.has(moduleId)) return new Set();
			visited.add(moduleId);

			const module = getModuleInfo(moduleId);
			if (!module) return new Set();

			const importers = new Set(module.importers);

			// Recursively get importers of importers
			for (const importer of module.importers) {
				const nestedImporters = getAllImporters(importer, visited);
				nestedImporters.forEach((imp) => importers.add(imp));
			}

			return importers;
		};

		const allImporters = getAllImporters(id);
		const importerArray = Array.from(allImporters);

		// Check if this module is used only by view files
		const usedOnlyByViewFiles =
			importerArray.length > 0 &&
			importerArray.every((importer) => importer.includes('/view.'));

		// Extract utility modules that are used only by view files
		if (
			usedOnlyByViewFiles &&
			(id.includes('/utils/') ||
				id.includes('/helpers/') ||
				id.includes('/constants/'))
		) {
			// Extract the utility name for chunking
			const segments = id.split('/');
			const utilityName = segments[segments.length - 1].replace(
				/\.(js|ts|jsx|tsx)$/,
				''
			);

			// Only chunk if it's a meaningful utility name (not index files)
			if (utilityName !== 'index' && utilityName.length > 2) {
				return utilityName;
			}
		}

		return undefined;
	};
}
