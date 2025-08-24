/**
 * Normalize unknown value to array
 * @param source - The value to normalize
 * @return An array containing the source value or the source value itself if it's already an array
 */
export const normaliseArray = (source: unknown): unknown[] =>
	Array.isArray(source) ? source : [source];
