import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Get frontend-only packages from package.json dependencies
 * @returns {string[]} Array of package names that should be treated as frontend-only
 */
export function getFrontendOnlyPackages() {
	try {
		const packageJsonPath = join(process.cwd(), 'package.json');
		const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

		// Get all dependencies (not devDependencies or peerDependencies)
		// These are likely to be frontend-only runtime dependencies
		const dependencies = packageJson.dependencies || {};

		// You can also add a custom field to package.json for explicit frontend-only packages
		const frontendOnlyPackages = packageJson.frontendOnlyPackages || [];

		// Combine dependencies with explicit frontend-only packages
		return [...Object.keys(dependencies), ...frontendOnlyPackages];
	} catch (error) {
		console.warn(
			'Could not read package.json for frontend packages detection:',
			error.message
		);
		// Fallback to empty array if package.json reading fails
		return [];
	}
}

/**
 * Get chunk names that should be placed in frontend-assets
 * This includes both package-based chunks and utility-based chunks
 * @returns {string[]} Array of chunk names that should go to frontend-assets
 */
export function getFrontendOnlyChunkNames() {
	const frontendOnlyPackages = getFrontendOnlyPackages();

	// Convert package names to chunk names
	const packageChunkNames = frontendOnlyPackages.map((packageName) => {
		// Clean up scoped package names (e.g., @scope/package -> scope-package)
		return packageName.replace('@', '').replace('/', '-');
	});

	// Note: Utility-based chunks are detected dynamically by the manual chunking logic
	// No need to hardcode them here - they'll be detected based on actual usage

	return packageChunkNames;
}
