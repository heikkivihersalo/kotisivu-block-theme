import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { FILE_EXTENSIONS } from '../../../../../common/constants.js';

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
	const extensions = FILE_EXTENSIONS.SCRIPTS;
	const nameWithoutExt = fileName.replace(/\.(js|jsx|ts|tsx)$/, '');

	for (const ext of extensions) {
		const testPath = resolve(basePath, nameWithoutExt + ext);
		if (existsSync(testPath)) {
			return testPath;
		}
	}

	return null;
};
