import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

/**
 * Find the actual file path considering different extensions
 * Supports .js, .jsx, .ts, .tsx extensions
 */
export const findActualFilePath = (
	basePath: string,
	fileName: string
): string | null => {
	// If the file exists as specified, return it
	const originalPath = resolve(basePath, fileName);
	if (existsSync(originalPath)) {
		return originalPath;
	}

	// Try different extensions
	const extensions = ['.js', '.jsx', '.ts', '.tsx'];
	const nameWithoutExt = fileName.replace(/\.(js|jsx|ts|tsx)$/, '');

	for (const ext of extensions) {
		const testPath = resolve(basePath, nameWithoutExt + ext);
		if (existsSync(testPath)) {
			return testPath;
		}
	}

	return null;
};

/**
 * Find the actual style file path considering different extensions and filename patterns
 * Supports .css, .scss, .sass, .less extensions
 */
export const findActualStylePath = (
	basePath: string,
	fileName: string
): string | null => {
	// If the file exists as specified, return it
	const originalPath = resolve(basePath, fileName);
	if (existsSync(originalPath)) {
		return originalPath;
	}

	// Try different extensions on the original filename
	const extensions = ['.css', '.scss', '.sass', '.less'];
	const nameWithoutExt = fileName.replace(/\.(css|scss|sass|less)$/, '');

	for (const ext of extensions) {
		const testPath = resolve(basePath, nameWithoutExt + ext);
		if (existsSync(testPath)) {
			return testPath;
		}
	}

	// Try common WordPress block filename patterns
	const commonPatterns: string[] = [];

	// If looking for index.css, try multiple alternatives
	if (fileName === 'index.css') {
		commonPatterns.push('editor', 'style', 'index');
	}

	// If looking for style-index.css, try multiple alternatives
	if (fileName === 'style-index.css') {
		commonPatterns.push('style', 'style-index', 'index');
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
};
