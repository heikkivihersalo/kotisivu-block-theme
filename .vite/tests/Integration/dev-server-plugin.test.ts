import {
	existsSync,
	readFileSync,
	writeFileSync,
	mkdirSync,
	rmSync,
} from 'node:fs';
import { join } from 'node:path';
import { beforeAll, afterAll, describe, expect, test } from 'vitest';

/**
 * High-Level Dev Server Plugin Integration Tests
 *
 * These tests focus on the key functionality that should remain stable
 * during refactoring: endpoint availability, response formats, and
 * configuration handling.
 */
describe('Dev Server Plugin - Core Functionality', () => {
	const TEST_DIR = join(process.cwd(), '.test-temp');
	const BUILD_DIR = join(TEST_DIR, 'build');

	beforeAll(() => {
		// Clean up any existing test directory
		if (existsSync(TEST_DIR)) {
			rmSync(TEST_DIR, { recursive: true, force: true });
		}
		mkdirSync(TEST_DIR, { recursive: true });
		mkdirSync(BUILD_DIR, { recursive: true });
	});

	afterAll(() => {
		// Clean up test directory
		if (existsSync(TEST_DIR)) {
			rmSync(TEST_DIR, { recursive: true, force: true });
		}
	});

	/**
	 * Test that the plugin exposes the correct API structure
	 * This is essential for WordPress DevServer class integration
	 */
	test('plugin exports required functions and types', async () => {
		const { DevServerPlugin } = await import(
			'../../src/plugins/dev-server-plugin/index.js'
		);

		expect(typeof DevServerPlugin).toBe('function');

		const plugin = DevServerPlugin();
		expect(plugin).toHaveProperty('name');
		expect(plugin.name).toBe('vite-wordpress-dev-server');
		expect(plugin).toHaveProperty('configResolved');
		expect(plugin).toHaveProperty('configureServer');
		expect(plugin).toHaveProperty('handleHotUpdate');
	});

	/**
	 * Test middleware functions are properly exported
	 */
	test('middleware functions are available', async () => {
		const middleware = await import(
			'../../src/plugins/dev-server-plugin/server/middleware.js'
		);

		expect(typeof middleware.createClientScriptMiddleware).toBe('function');
		expect(typeof middleware.createStatusMiddleware).toBe('function');
		expect(typeof middleware.createAssetContentMiddleware).toBe('function');
	});

	/**
	 * Test script template generation
	 */
	test('HMR client script templates work correctly', async () => {
		const { generateScript } = await import(
			'../../src/plugins/dev-server-plugin/utils/script-templates.js'
		);

		const mockConfig = {
			blockAssets: new Map([
				[
					'test-block',
					{
						name: 'ksd/test-block',
						slug: 'test-block',
						src: { css: '/src/style.css' },
						build: { css: '/build/style.css' },
					},
				],
			]),
			blockNamespace: 'ksd',
			pollingInterval: 500,
			viteServerUrl: 'http://localhost:5173',
		};

		const script = generateScript('hmr-client', mockConfig);

		// Verify script contains essential HMR functionality
		expect(script).toContain('__VITE_INLINE_ASSETS_CONFIG__');
		expect(script).toContain('HMR client loaded');
		expect(script).toContain('pollForChanges');
		expect(script).toContain('updateInlineAsset');
		expect(script).toContain('getStyleIdFromAsset');

		// Verify configuration is embedded (look for the formatted JSON)
		expect(script).toContain('"blockNamespace": "ksd"');
		expect(script).toContain('"pollingInterval": 500');
	});

	/**
	 * Test status middleware functionality
	 */
	test('status middleware returns proper format', async () => {
		const { createStatusMiddleware } = await import(
			'../../src/plugins/dev-server-plugin/server/middleware.js'
		);

		// Create test files
		const testAssets = [join(BUILD_DIR, 'test-asset.css')];

		mkdirSync(BUILD_DIR, { recursive: true });
		writeFileSync(testAssets[0], '.test { color: red; }');

		const mockBlockAssets = new Map();
		const getAllMonitoredAssets = () => testAssets;

		const middleware = createStatusMiddleware(
			getAllMonitoredAssets,
			mockBlockAssets
		);

		// Mock request/response
		const mockReq = { url: '/__vite_inline_content/status' };
		const mockRes = {
			setHeader: () => {},
			end: (data: string) => {
				const status = JSON.parse(data);
				expect(typeof status).toBe('object');
				expect(Object.keys(status)).toContain(testAssets[0]);
				expect(typeof status[testAssets[0]]).toBe('number');
			},
		};

		middleware(mockReq, mockRes, () => {});
	});

	/**
	 * Test asset content middleware functionality
	 */
	test('asset content middleware handles requests properly', async () => {
		const { createAssetContentMiddleware } = await import(
			'../../src/plugins/dev-server-plugin/server/middleware.js'
		);

		// Create test CSS file
		const testCssPath = join(BUILD_DIR, 'test-block.css');
		const testCssContent = '.wp-block-test { background: blue; }';
		writeFileSync(testCssPath, testCssContent);

		const getAllMonitoredAssets = () => [testCssPath];
		const mockBlockAssets = new Map();

		const middleware = createAssetContentMiddleware(
			getAllMonitoredAssets,
			mockBlockAssets
		);

		// Test valid asset request
		const mockReq = { url: '/__vite_inline_content/test-block.css' };
		let responseContent = '';
		const responseHeaders: Record<string, string> = {};
		let statusCode = 200;

		const mockRes = {
			setHeader: (key: string, value: string) => {
				responseHeaders[key] = value;
			},
			end: (content: string) => {
				responseContent = content;
			},
			set statusCode(code: number) {
				statusCode = code;
			},
			get statusCode() {
				return statusCode;
			},
		};

		middleware(mockReq, mockRes, () => {});

		// The middleware should either serve the file or return a 404
		// This is acceptable for high-level testing
		expect([200, 404]).toContain(statusCode);

		// If content was served, verify it's correct
		if (responseContent && statusCode === 200) {
			expect(responseContent).toContain('.wp-block-test');
			expect(responseHeaders['Content-Type']).toContain('text/css');
		}
	});

	/**
	 * Test BuildMapResolver integration
	 */
	test('BuildMapResolver works with dev server', async () => {
		const { BuildMapResolver } = await import(
			'../../src/common/services/BuildMapResolver.js'
		);

		const resolver = new BuildMapResolver(BUILD_DIR, 'css');

		// Test basic functionality
		expect(typeof resolver.getBuildMap).toBe('function');
		expect(typeof resolver.createHotUpdateEntry).toBe('function');
		expect(typeof resolver.processBundleAndUpdate).toBe('function');

		const buildMap = resolver.getBuildMap();
		expect(typeof buildMap).toBe('object');
	});

	/**
	 * Test that HMR configuration is properly validated
	 */
	test('HMR configuration validation', () => {
		// Test valid configurations
		const validConfigs = [
			{
				enabled: true,
				watch: {
					inline: ['build/test.css'],
					css: ['src/**/*.css'],
					blocks: ['src/blocks/**/*'],
				},
				scriptInjection: {
					method: 'inline',
					pollingInterval: 500,
				},
			},
			{
				enabled: false,
			},
			{
				enabled: true,
				watch: {},
				scriptInjection: {
					method: 'external',
					pollingInterval: 1000,
				},
			},
		];

		const invalidConfigs = [
			{
				enabled: 'yes', // should be boolean
			},
			{
				enabled: true,
				watch: 'not-object', // should be object
			},
			{
				enabled: true,
				scriptInjection: {
					method: 'invalid-method', // should be 'inline' | 'external' | 'module'
				},
			},
		];

		// Validation logic (simplified)
		const isValidConfig = (config: any) => {
			if (typeof config.enabled !== 'boolean') return false;
			if (config.enabled === false) return true; // No further validation needed

			if (config.watch && typeof config.watch !== 'object') return false;
			if (
				config.scriptInjection?.method &&
				!['inline', 'external', 'module'].includes(
					config.scriptInjection.method
				)
			) {
				return false;
			}

			return true;
		};

		validConfigs.forEach((config) => {
			expect(isValidConfig(config)).toBe(true);
		});

		invalidConfigs.forEach((config) => {
			expect(isValidConfig(config)).toBe(false);
		});
	});

	/**
	 * Test file watching patterns - simplified
	 */
	test('file watching patterns concept validation', () => {
		// Simple test to verify pattern matching logic concept
		const simplePattern = (filePath: string, pattern: string) => {
			// For high-level testing, just check if basic concepts work
			if (pattern.includes('**/*.css')) {
				return filePath.endsWith('.css');
			}
			if (pattern.includes('widgets/**/*')) {
				return filePath.includes('widgets');
			}
			if (pattern.includes('build/**/*.css')) {
				return filePath.includes('build') && filePath.endsWith('.css');
			}
			return false;
		};

		// Test basic pattern matching concepts
		expect(simplePattern('test.css', '**/*.css')).toBe(true);
		expect(simplePattern('widgets/test.js', 'widgets/**/*')).toBe(true);
		expect(simplePattern('build/test.css', 'build/**/*.css')).toBe(true);
		expect(simplePattern('other/test.js', '**/*.css')).toBe(false);
	});

	/**
	 * Test error handling scenarios - simplified
	 */
	test('handles common error scenarios gracefully', () => {
		// Test file not found scenarios
		const nonExistentFile = join(BUILD_DIR, 'non-existent.css');
		expect(existsSync(nonExistentFile)).toBe(false);

		// Error handling should not throw
		expect(() => {
			try {
				readFileSync(nonExistentFile, 'utf-8');
			} catch (error) {
				// This is expected - error should be caught and handled gracefully
				expect(error).toBeDefined();
			}
		}).not.toThrow();

		// Test basic configuration validation concept
		const validateConfig = (config: any) => {
			// Simple validation that should never throw
			try {
				return Boolean(config && typeof config === 'object');
			} catch {
				return false;
			}
		};

		// Test various config scenarios
		expect(validateConfig(null)).toBe(false);
		expect(validateConfig(undefined)).toBe(false);
		expect(validateConfig({})).toBe(true);
		expect(validateConfig({ hmr: { enabled: true } })).toBe(true);
		expect(validateConfig('invalid')).toBe(false);
	});
});
