import { describe, it, expect } from 'vitest';
import { wrapArray } from '../../../../src/common/utils/array/wrapArray.ts';

describe('wrapArray', () => {
	it('should return the same array when input is already an array', () => {
		const input = [1, 2, 3];
		const result = wrapArray(input);
		expect(result).toBe(input);
	});

	it('should wrap non-array values in an array', () => {
		expect(wrapArray('hello')).toEqual(['hello']);
		expect(wrapArray(42)).toEqual([42]);
		expect(wrapArray(false)).toEqual([false]);
		expect(wrapArray({ name: 'test' })).toEqual([{ name: 'test' }]);
		expect(wrapArray(null)).toEqual([null]);
		expect(wrapArray(undefined)).toEqual([undefined]);
	});

	it('should handle empty array', () => {
		const input: string[] = [];
		const result = wrapArray(input);
		expect(result).toBe(input);
	});
});
