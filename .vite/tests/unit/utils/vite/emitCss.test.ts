import { describe, it, expect, vi, beforeEach } from 'vitest';
import { emitCss } from '../../../../src/common/utils/vite/emitCss.ts';
import type { PluginContext } from 'rollup';

// Mock lightningcss transform function
vi.mock('lightningcss', () => ({
	transform: vi.fn(),
}));

const mockTransform = vi.mocked(await import('lightningcss')).transform;

// Helper to create mock transform result
const createMockTransformResult = (code: Uint8Array, map?: Uint8Array) => ({
	code,
	map,
	exports: undefined as any,
	references: {} as any,
	dependencies: [] as any,
	warnings: [],
});

describe('emitCss', () => {
	let mockContext: PluginContext;

	beforeEach(() => {
		mockContext = {
			emitFile: vi.fn(),
		} as unknown as PluginContext;

		// Reset mocks
		vi.clearAllMocks();
	});

	it('should emit CSS file with transformed content', () => {
		const baseOutputPath = 'styles/main';
		const cssContent = 'body { margin: 0; padding: 10px; }';
		const transformedCode = new Uint8Array([
			98, 111, 100, 121, 123, 109, 97, 114, 103, 105, 110, 58, 48, 125,
		]); // "body{margin:0}"

		mockTransform.mockReturnValue(
			createMockTransformResult(transformedCode)
		);

		emitCss(mockContext, baseOutputPath, cssContent);

		expect(mockTransform).toHaveBeenCalledWith({
			filename: 'styles/main.css',
			code: Buffer.from(cssContent),
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
		const baseOutputPath = 'components/button';
		const cssContent = '.button { background: blue; color: white; }';
		const transformedCode = new Uint8Array([
			46, 98, 117, 116, 116, 111, 110, 123, 98, 97, 99, 107, 103, 114,
			111, 117, 110, 100, 58, 98, 108, 117, 101, 125,
		]);
		const mockSourceMap = new Uint8Array([
			123, 34, 118, 101, 114, 115, 105, 111, 110, 34, 58, 51, 125,
		]); // JSON source map as Uint8Array

		mockTransform.mockReturnValue(
			createMockTransformResult(transformedCode, mockSourceMap)
		);

		emitCss(mockContext, baseOutputPath, cssContent);

		expect(mockContext.emitFile).toHaveBeenCalledTimes(2);

		// Check CSS file emission
		expect(mockContext.emitFile).toHaveBeenNthCalledWith(1, {
			type: 'asset',
			fileName: 'components/button.css',
			source: transformedCode,
		});

		// Check source map emission
		expect(mockContext.emitFile).toHaveBeenNthCalledWith(2, {
			type: 'asset',
			fileName: 'components/button.css.map',
			source: mockSourceMap.toString(),
		});
	});

	it('should not emit source map when not available', () => {
		const baseOutputPath = 'utils/helpers';
		const cssContent = '.helper { display: none; }';
		const transformedCode = new Uint8Array([
			46, 104, 101, 108, 112, 101, 114, 123, 100, 105, 115, 112, 108, 97,
			121, 58, 110, 111, 110, 101, 125,
		]);

		mockTransform.mockReturnValue(
			createMockTransformResult(transformedCode)
		);

		emitCss(mockContext, baseOutputPath, cssContent);

		expect(mockContext.emitFile).toHaveBeenCalledTimes(1);
		expect(mockContext.emitFile).toHaveBeenCalledWith({
			type: 'asset',
			fileName: 'utils/helpers.css',
			source: transformedCode,
		});
	});

	it('should handle empty CSS content', () => {
		const baseOutputPath = 'empty';
		const cssContent = '';
		const transformedCode = new Uint8Array([]);

		mockTransform.mockReturnValue(
			createMockTransformResult(transformedCode)
		);

		emitCss(mockContext, baseOutputPath, cssContent);

		expect(mockTransform).toHaveBeenCalledWith({
			filename: 'empty.css',
			code: Buffer.from(''),
			minify: true,
			sourceMap: true,
		});

		expect(mockContext.emitFile).toHaveBeenCalledWith({
			type: 'asset',
			fileName: 'empty.css',
			source: transformedCode,
		});
	});

	it('should handle complex CSS with nested rules', () => {
		const baseOutputPath = 'blocks/navigation';
		const cssContent = `
			.navigation {
				display: flex;
				gap: 1rem;
			}
			
			.navigation-item {
				padding: 0.5rem 1rem;
				border-radius: 4px;
			}
			
			.navigation-item:hover {
				background-color: #f0f0f0;
			}
		`;
		const transformedCode = new Uint8Array([
			46, 110, 97, 118, 105, 103, 97, 116, 105, 111, 110, 123, 100, 105,
			115, 112, 108, 97, 121, 58, 102, 108, 101, 120, 125,
		]);

		mockTransform.mockReturnValue(
			createMockTransformResult(transformedCode)
		);

		emitCss(mockContext, baseOutputPath, cssContent);

		expect(mockTransform).toHaveBeenCalledWith({
			filename: 'blocks/navigation.css',
			code: Buffer.from(cssContent),
			minify: true,
			sourceMap: true,
		});
	});

	it('should handle CSS with media queries', () => {
		const baseOutputPath = 'responsive/grid';
		const cssContent = `
			.grid {
				display: grid;
				grid-template-columns: repeat(12, 1fr);
			}
			
			@media (max-width: 768px) {
				.grid {
					grid-template-columns: 1fr;
				}
			}
		`;
		const transformedCode = new Uint8Array([
			46, 103, 114, 105, 100, 123, 100, 105, 115, 112, 108, 97, 121, 58,
			103, 114, 105, 100, 125,
		]);

		mockTransform.mockReturnValue(
			createMockTransformResult(transformedCode)
		);

		emitCss(mockContext, baseOutputPath, cssContent);

		expect(mockContext.emitFile).toHaveBeenCalledWith({
			type: 'asset',
			fileName: 'responsive/grid.css',
			source: transformedCode,
		});
	});

	it('should handle CSS with custom properties (CSS variables)', () => {
		const baseOutputPath = 'theme/variables';
		const cssContent = `
			:root {
				--primary-color: #3498db;
				--secondary-color: #2ecc71;
				--font-size-base: 16px;
			}
			
			.component {
				color: var(--primary-color);
				font-size: var(--font-size-base);
			}
		`;
		const transformedCode = new Uint8Array([
			58, 114, 111, 111, 116, 123, 45, 45, 112, 114, 105, 109, 97, 114,
			121, 45, 99, 111, 108, 111, 114, 58, 35, 51, 52, 57, 56, 100, 98,
			125,
		]);

		mockTransform.mockReturnValue(
			createMockTransformResult(transformedCode)
		);

		emitCss(mockContext, baseOutputPath, cssContent);

		expect(mockContext.emitFile).toHaveBeenCalledWith({
			type: 'asset',
			fileName: 'theme/variables.css',
			source: transformedCode,
		});
	});

	it('should pass correct parameters to lightningcss transform', () => {
		const baseOutputPath = 'test/validation';
		const cssContent = '.test { color: red; }';

		mockTransform.mockReturnValue(
			createMockTransformResult(
				new Uint8Array([
					46, 116, 101, 115, 116, 123, 99, 111, 108, 111, 114, 58,
					114, 101, 100, 125,
				])
			)
		);

		emitCss(mockContext, baseOutputPath, cssContent);

		expect(mockTransform).toHaveBeenCalledWith({
			filename: 'test/validation.css',
			code: Buffer.from('.test { color: red; }'),
			minify: true,
			sourceMap: true,
		});
	});

	it('should handle complex output paths with nested directories', () => {
		const baseOutputPath = 'assets/css/components/forms/input';
		const cssContent = '.input { border: 1px solid #ccc; }';
		const transformedCode = new Uint8Array([
			46, 105, 110, 112, 117, 116, 123, 98, 111, 114, 100, 101, 114, 58,
			49, 112, 120, 32, 115, 111, 108, 105, 100, 32, 35, 99, 99, 99, 125,
		]);

		mockTransform.mockReturnValue(
			createMockTransformResult(transformedCode)
		);

		emitCss(mockContext, baseOutputPath, cssContent);

		expect(mockContext.emitFile).toHaveBeenCalledWith({
			type: 'asset',
			fileName: 'assets/css/components/forms/input.css',
			source: transformedCode,
		});
	});
});
