/**
 * External dependencies
 */
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

/**
 * Shared dependencies
 */
import { FILE_EXTENSIONS, FILE_NAMES } from '../constants';

/**
 * File Path Resolver Service
 *
 * This service handles file path resolution logic, making it easier to test
 * and reuse across different handlers.
 */
export class FilePathResolver {
	/**
	 * Find the actual style file path considering different extensions and filename patterns
	 * Supports .css, .scss, .sass, .less extensions
	 */
	static findActualStylePath(
		basePath: string,
		fileName: string
	): string | null {
		// If the file exists as specified, return it
		const originalPath = resolve(basePath, fileName);
		if (existsSync(originalPath)) {
			return originalPath;
		}

		// Try different extensions on the original filename
		const extensions = FILE_EXTENSIONS.STYLES;
		const nameWithoutExt = fileName.replace(/\.(css|scss|sass|less)$/, '');

		for (const ext of extensions) {
			const testPath = resolve(basePath, nameWithoutExt + ext);
			if (existsSync(testPath)) {
				return testPath;
			}
		}

		// Try common WordPress block filename patterns
		const commonPatterns: string[] = [];

		// If looking for index.css (editor styles), try editor.*
		if (fileName === FILE_NAMES.DEFAULT_STYLE_ENTRY) {
			commonPatterns.push('editor');
		}

		// If looking for style-index.css (frontend styles), try style.*
		if (fileName === FILE_NAMES.STYLE_INDEX) {
			commonPatterns.push('style');
		}

		// Try the common patterns with all extensions
		for (const pattern of commonPatterns) {
			for (const ext of extensions) {
				const testPath = resolve(basePath, pattern + ext);
				if (existsSync(testPath)) {
					return testPath;
				}
			}
		}

		return null;
	}

	/**
	 * Find the actual file path considering different extensions
	 * Supports .js, .jsx, .ts, .tsx extensions
	 */
	static findActualFilePath(
		basePath: string,
		fileName: string
	): string | null {
		// If the file exists as specified, return it
		const originalPath = resolve(basePath, fileName);
		if (existsSync(originalPath)) {
			return originalPath;
		}

		// Try different extensions
		const extensions = FILE_EXTENSIONS.SCRIPTS;
		const nameWithoutExt = fileName.replace(/\.(js|jsx|ts|tsx)$/, '');

		for (const ext of extensions) {
			const testPath = resolve(basePath, nameWithoutExt + ext);
			if (existsSync(testPath)) {
				return testPath;
			}
		}

		return null;
	}

	/**
	 * Check if a file exists at the given path
	 */
	static fileExists(filePath: string): boolean {
		return existsSync(filePath);
	}
}
