import { describe, it, expect, vi, beforeEach } from 'vitest';
import { emitCss } from '../../../../src/common/utils/vite/emitCss.ts';
import type { PluginContext } from 'rollup';

// Mock lightningcss transform function
vi.mock('lightningcss', () => ({
	transform: vi.fn(),
}));

const mockTransform = vi.mocked(await import('lightningcss')).transform;

describe('emitCss', () => {
	let mockContext: PluginContext;

	beforeEach(() => {
		mockContext = {
			emitFile: vi.fn(),
		} as unknown as PluginContext;
		vi.clearAllMocks();
	});

	it('should emit CSS file with transformed content', () => {
		const transformedCode = new Uint8Array([98, 111, 100, 121, 123, 125]); // "body{}"
		mockTransform.mockReturnValue({
			code: transformedCode,
			map: undefined,
			exports: undefined,
			references: {},
			dependencies: [],
			warnings: [],
		});

		emitCss(mockContext, 'styles/main', 'body { margin: 0; }');

		expect(mockTransform).toHaveBeenCalledWith({
			filename: 'styles/main.css',
			code: Buffer.from('body { margin: 0; }'),
			minify: true,
			sourceMap: true,
		});

		expect(mockContext.emitFile).toHaveBeenCalledWith({
			type: 'asset',
			fileName: 'styles/main.css',
			source: transformedCode,
		});
	});

	it('should emit source map when available', () => {
		const transformedCode = new Uint8Array([
			46, 116, 101, 115, 116, 123, 125,
		]); // ".test{}"
		const mockSourceMap = new Uint8Array([
			123, 34, 118, 101, 114, 115, 105, 111, 110, 34, 58, 51, 125,
		]);

		mockTransform.mockReturnValue({
			code: transformedCode,
			map: mockSourceMap,
			exports: undefined,
			references: {},
			dependencies: [],
			warnings: [],
		});

		emitCss(mockContext, 'test', '.test { color: red; }');

		expect(mockContext.emitFile).toHaveBeenCalledTimes(2);
		expect(mockContext.emitFile).toHaveBeenNthCalledWith(1, {
			type: 'asset',
			fileName: 'test.css',
			source: transformedCode,
		});
		expect(mockContext.emitFile).toHaveBeenNthCalledWith(2, {
			type: 'asset',
			fileName: 'test.css.map',
			source: mockSourceMap.toString(),
		});
	});

	it('should handle empty CSS content', () => {
		const transformedCode = new Uint8Array([]);
		mockTransform.mockReturnValue({
			code: transformedCode,
			map: undefined,
			exports: undefined,
			references: {},
			dependencies: [],
			warnings: [],
		});

		emitCss(mockContext, 'empty', '');

		expect(mockContext.emitFile).toHaveBeenCalledWith({
			type: 'asset',
			fileName: 'empty.css',
			source: transformedCode,
		});
	});
});
