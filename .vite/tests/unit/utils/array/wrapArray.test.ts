import { describe, it, expect } from 'vitest';
import { wrapArray } from '../../../../src/common/utils/array/wrapArray.ts';

describe('wrapArray', () => {
	it('should return the same array when input is already an array', () => {
		const input = [1, 2, 3];
		const result = wrapArray(input);
		expect(result).toBe(input);
		expect(result).toEqual([1, 2, 3]);
	});

	it('should wrap a string in an array', () => {
		const input = 'hello';
		const result = wrapArray(input);
		expect(result).toEqual(['hello']);
	});

	it('should wrap a number in an array', () => {
		const input = 42;
		const result = wrapArray(input);
		expect(result).toEqual([42]);
	});

	it('should wrap a boolean in an array', () => {
		const input = false;
		const result = wrapArray(input);
		expect(result).toEqual([false]);
	});

	it('should wrap an object in an array', () => {
		const input = { name: 'test', value: 123 };
		const result = wrapArray(input);
		expect(result).toEqual([{ name: 'test', value: 123 }]);
	});

	it('should handle empty array', () => {
		const input: string[] = [];
		const result = wrapArray(input);
		expect(result).toBe(input);
		expect(result).toEqual([]);
	});

	it('should handle nested arrays', () => {
		const input = [
			[1, 2],
			[3, 4],
		];
		const result = wrapArray(input);
		expect(result).toBe(input);
		expect(result).toEqual([
			[1, 2],
			[3, 4],
		]);
	});

	it('should preserve type information', () => {
		const stringInput = 'test';
		const stringResult = wrapArray(stringInput);
		expect(stringResult).toEqual(['test']);

		const numberInput = 123;
		const numberResult = wrapArray(numberInput);
		expect(numberResult).toEqual([123]);

		const arrayInput = ['a', 'b'];
		const arrayResult = wrapArray(arrayInput);
		expect(arrayResult).toEqual(['a', 'b']);
	});

	it('should wrap null and undefined', () => {
		const nullResult = wrapArray(null);
		expect(nullResult).toEqual([null]);

		const undefinedResult = wrapArray(undefined);
		expect(undefinedResult).toEqual([undefined]);
	});
});
