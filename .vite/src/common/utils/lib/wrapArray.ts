/**
 * Wrap a value in an array if it's not already an array
 * @param maybeArray - The value to wrap
 * @return The wrapped array
 */
export function wrapArray<T>(maybeArray: T | T[]): T[] {
	return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
