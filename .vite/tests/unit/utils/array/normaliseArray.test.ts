import { describe, it, expect } from 'vitest';
import { normaliseArray } from '../../../../src/common/utils/array/normaliseArray.ts';

describe('normaliseArray', () => {
	it('should return the same array when input is already an array', () => {
		const input = [1, 2, 3];
		const result = normaliseArray(input);
		expect(result).toBe(input);
		expect(result).toEqual([1, 2, 3]);
	});

	it('should wrap a string in an array', () => {
		const input = 'hello';
		const result = normaliseArray(input);
		expect(result).toEqual(['hello']);
	});

	it('should wrap a number in an array', () => {
		const input = 42;
		const result = normaliseArray(input);
		expect(result).toEqual([42]);
	});

	it('should wrap null in an array', () => {
		const input = null;
		const result = normaliseArray(input);
		expect(result).toEqual([null]);
	});

	it('should wrap undefined in an array', () => {
		const input = undefined;
		const result = normaliseArray(input);
		expect(result).toEqual([undefined]);
	});

	it('should wrap an object in an array', () => {
		const input = { key: 'value' };
		const result = normaliseArray(input);
		expect(result).toEqual([{ key: 'value' }]);
	});

	it('should wrap a boolean in an array', () => {
		const input = true;
		const result = normaliseArray(input);
		expect(result).toEqual([true]);
	});

	it('should handle empty array', () => {
		const input: unknown[] = [];
		const result = normaliseArray(input);
		expect(result).toBe(input);
		expect(result).toEqual([]);
	});

	it('should handle nested arrays', () => {
		const input = [
			[1, 2],
			[3, 4],
		];
		const result = normaliseArray(input);
		expect(result).toBe(input);
		expect(result).toEqual([
			[1, 2],
			[3, 4],
		]);
	});
});
