/**
 * Mock File Path Resolver for Testing
 *
 * This mock implementation allows for predictable testing of file path
 * resolution without dependencies on the actual file system.
 */
export class MockFilePathResolver {
	private static mockFileMap: Map<string, string> = new Map();
	private static existingFiles: Set<string> = new Set();

	/**
	 * Set up mock file mappings for testing
	 */
	static setMockFileMap(mappings: Record<string, string>): void {
		this.mockFileMap.clear();
		Object.entries(mappings).forEach(([key, value]) => {
			this.mockFileMap.set(key, value);
		});
	}

	/**
	 * Set up files that should be considered as existing
	 */
	static setExistingFiles(files: string[]): void {
		this.existingFiles.clear();
		files.forEach((file) => this.existingFiles.add(file));
	}

	/**
	 * Mock implementation of findActualStylePath
	 */
	static findActualStylePath(
		basePath: string,
		fileName: string
	): string | null {
		const key = `${basePath}/${fileName}`;
		if (this.mockFileMap.has(key)) {
			return this.mockFileMap.get(key)!;
		}

		// Check if the direct path exists in our mock
		if (this.existingFiles.has(key)) {
			return key;
		}

		return null;
	}

	/**
	 * Mock implementation of findActualFilePath
	 */
	static findActualFilePath(
		basePath: string,
		fileName: string
	): string | null {
		const key = `${basePath}/${fileName}`;
		if (this.mockFileMap.has(key)) {
			return this.mockFileMap.get(key)!;
		}

		if (this.existingFiles.has(key)) {
			return key;
		}

		return null;
	}

	/**
	 * Mock implementation of fileExists
	 */
	static fileExists(filePath: string): boolean {
		return this.existingFiles.has(filePath);
	}

	/**
	 * Reset all mock state
	 */
	static reset(): void {
		this.mockFileMap.clear();
		this.existingFiles.clear();
	}
}
