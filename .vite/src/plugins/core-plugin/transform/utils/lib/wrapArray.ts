/**
 * 
 */
export function wrapArray<T>(maybeArray: T | T[]): T[] {
	return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
