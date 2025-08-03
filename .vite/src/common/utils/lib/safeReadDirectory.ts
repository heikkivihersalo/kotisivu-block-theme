import { readdirSync } from 'node:fs';

/**
 * Helper function to safely read directory contents
 */
export function safeReadDirectory(dirPath: string): {
	items: string[];
	error: string | null;
} {
	try {
		const items = readdirSync(dirPath);
		return { items, error: null };
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : String(error);

		return {
			items: [],
			error: `Could not read directory: ${errorMessage}`,
		};
	}
}
