import { describe, it, expect } from 'vitest';
import { normaliseArray } from '../../../../src/common/utils/array/normaliseArray.ts';

describe('normaliseArray', () => {
	it('should return the same array when input is already an array', () => {
		const input = [1, 2, 3];
		const result = normaliseArray(input);
		expect(result).toBe(input);
		expect(result).toEqual([1, 2, 3]);
	});

	it('should wrap non-array values in an array', () => {
		expect(normaliseArray('hello')).toEqual(['hello']);
		expect(normaliseArray(42)).toEqual([42]);
		expect(normaliseArray(null)).toEqual([null]);
		expect(normaliseArray(undefined)).toEqual([undefined]);
		expect(normaliseArray({ key: 'value' })).toEqual([{ key: 'value' }]);
		expect(normaliseArray(true)).toEqual([true]);
	});

	it('should handle empty array', () => {
		const input: unknown[] = [];
		const result = normaliseArray(input);
		expect(result).toBe(input);
		expect(result).toEqual([]);
	});
});
