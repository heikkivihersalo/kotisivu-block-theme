import { join, dirname, basename, relative } from 'path';
import { safeReadFile, safeWriteFile } from './fileSystem.js';

/**
 * Updates import paths in a JavaScript file using provided mappings
 * @param {string} filePath - Path to the JS file
 * @param {Object} mappings - Map of old paths to new paths
 */
export function updateImportPathsWithMappings(filePath, mappings) {
	try {
		let content = safeReadFile(filePath);
		let hasChanges = false;

		for (const [oldPath, newPath] of Object.entries(mappings)) {
			const escapedOldPath = oldPath.replace(
				/[.*+?^${}()|[\]\\]/g,
				'\\$&'
			);

			// Handle minified imports (common pattern from Vite)
			const minifiedPattern = new RegExp(
				`(from")(\\./)?(${escapedOldPath})(")`,
				'g'
			);
			if (minifiedPattern.test(content)) {
				content = content.replace(minifiedPattern, `$1$2${newPath}$4`);
				hasChanges = true;
			}

			// Handle regular imports
			const patterns = [
				new RegExp(
					`(from\\s*["'])(\\./)?(${escapedOldPath})(["'])`,
					'g'
				),
				new RegExp(
					`(import\\s*["'])(\\./)?(${escapedOldPath})(["'])`,
					'g'
				),
			];

			for (const pattern of patterns) {
				if (pattern.test(content)) {
					content = content.replace(pattern, `$1$2${newPath}$4`);
					hasChanges = true;
				}
			}
		}

		if (hasChanges) {
			safeWriteFile(filePath, content);
			console.log(`📝 Updated import mappings in ${basename(filePath)}`);
		}
	} catch (error) {
		console.warn(
			`⚠️  Failed to update import mappings in ${filePath}:`,
			error.message
		);
	}
}

/**
 * Updates import paths based on the file's final location
 * @param {string} filePath - Path to the JS file
 * @param {string} outputDir - Main output directory for blocks
 * @param {string} editorDir - Editor directory
 * @param {string} buildRoot - Build root directory
 */
export function updateImportPathsForFinalLocation(
	filePath,
	outputDir,
	editorDir,
	buildRoot
) {
	try {
		let content = safeReadFile(filePath);
		let hasChanges = false;

		// Determine file location
		const isInBuildRoot =
			filePath.startsWith(buildRoot) &&
			!filePath.startsWith(editorDir) &&
			!filePath.startsWith(outputDir);
		const isInEditorDir = filePath.startsWith(editorDir);

		// Fix any remaining relative path issues
		if (isInEditorDir) {
			// Files in editor dir should reference other editor files and root files correctly
			content = content.replace(
				/from\s*["']\.\/([^"']+)__ROOT__\.js["']/g,
				(match, name) => {
					hasChanges = true;
					return match.replace(
						`./${name}__ROOT__.js`,
						`../${name}.js`
					);
				}
			);

			content = content.replace(
				/from\s*["']\.\/([^"']+)__EDITOR__\.js["']/g,
				(match, name) => {
					hasChanges = true;
					return match.replace(
						`./${name}__EDITOR__.js`,
						`./${name}.js`
					);
				}
			);
		}

		// Clean up any remaining marker patterns
		content = content.replace(/__ROOT__\.js/g, '.js');
		content = content.replace(/__EDITOR__\.js/g, '.js');

		if (content !== safeReadFile(filePath)) {
			hasChanges = true;
		}

		if (hasChanges) {
			safeWriteFile(filePath, content);
			console.log(`📝 Cleaned up final paths in ${basename(filePath)}`);
		}
	} catch (error) {
		console.warn(
			`⚠️  Failed to update final paths in ${filePath}:`,
			error.message
		);
	}
}
