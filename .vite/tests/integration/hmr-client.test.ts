import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Client } from '../../src/plugins/dev-server-plugin/client.js';

/**
 * Integration tests for HMR client-side functionality
 *
 * These tests verify that the client-side HMR script correctly handles
 * different asset types with the new class-based architecture.
 */
describe('HMR Client Integration', () => {
	let hmrClient: Client;

	beforeEach(() => {
		// Mock global objects
		global.document = {
			getElementById: vi.fn(() => null),
			querySelectorAll: vi.fn(() => []),
		} as any;
		global.fetch = vi.fn();
		global.console = {
			...console,
			log: vi.fn(),
			warn: vi.fn(),
			error: vi.fn(),
		};
		global.location = {
			hostname: 'localhost',
			port: '3000',
			protocol: 'http:',
		} as any;
		global.window = {
			setInterval: vi.fn(() => 1),
			clearInterval: vi.fn(),
			location: global.location as any,
			reload: vi.fn(),
		} as any;

		// Mock setInterval for polling
		vi.useFakeTimers();

		// Initialize Client for tests
		const mockConfig = {
			blockNamespace: 'ksd',
			pollingInterval: 500,
			viteServerUrl: 'http://localhost:5173',
		} as any;

		hmrClient = new Client(mockConfig) as any;
	});

	/**
	 * Test HMR Client initialization
	 */
	test('initializes client correctly and keeps config', () => {
		expect(hmrClient).toBeDefined();
		expect((hmrClient as any).config).toMatchObject({
			blockNamespace: 'ksd',
			pollingInterval: 500,
			viteServerUrl: 'http://localhost:5173',
		});
	});

	/**
	 * Test client start/stop functionality
	 */
	test('client can be started and stopped', () => {
		expect(() => (hmrClient as any).start()).not.toThrow();
		expect(() => (hmrClient as any).stop()).not.toThrow();
	});

	/**
	 * Test configuration property can be changed
	 */
	test('configuration can be changed via property', () => {
		(hmrClient as any).config.pollingInterval = 1000;
		(hmrClient as any).config.blockNamespace = 'new-namespace';
		const config = (hmrClient as any).config;
		expect(config.pollingInterval).toBe(1000);
		expect(config.blockNamespace).toBe('new-namespace');
	});

	/**
	 * Test Vite server URL detection
	 */
	test('auto-detects Vite server URL from window.location when not provided', () => {
		const cases = [
			{
				location: {
					hostname: 'localhost',
					port: '5173',
					protocol: 'http:',
				},
				expected: 'http://localhost:5173',
			},
			{
				location: {
					hostname: 'mysite.local',
					port: '3000',
					protocol: 'http:',
				},
				expected: 'http://mysite.local:5173',
			},
			{
				location: {
					hostname: 'test.test',
					port: '8080',
					protocol: 'https:',
				},
				expected: 'https://test.test:5173',
			},
		];

		cases.forEach((c) => {
			global.location = c.location as any;
			(global.window as any).location = global.location;
			const client = new Client({ pollingInterval: 500 } as any);
			expect((client as any).config.viteServerUrl).toBe(c.expected);
		});
	});

	/**
	 * Test asset type determination
	 */
	test('static helpers: relativePathToInlineStyleId and contentDiffers', () => {
		expect(
			(Client as any).relativePathToInlineStyleId(
				'ns',
				'resources/blocks/test-block/style.css'
			)
		).toBe('ns-test-block-style-inline-css');

		// Different formatting and punctuation spacing -> treated as different by current implementation
		expect(
			(Client as any).contentDiffers(
				'/* comment */ .a { color: red; }',
				'.a{color:red;}'
			)
		).toBe(true);

		// Only whitespace differences should normalize to equal
		expect(
			(Client as any).contentDiffers(
				'  .a   {   color:   red;   }  ',
				'.a { color: red; }'
			)
		).toBe(false);

		expect(
			(Client as any).contentDiffers(
				'.a { color: red; }',
				'.a { color: blue; }'
			)
		).toBe(true);
	});

	/**
	 * Test asset content fetching
	 */
	test('updates inline CSS content when asset changes (updateCSS)', async () => {
		const mockFetch = vi.mocked(fetch);

		// Mock successful response from asset-content endpoint
		mockFetch.mockResolvedValueOnce({
			ok: true,
			text: async () => '.test { color: blue; }',
		} as unknown as Response);

		// Prepare DOM element targeted by inline style update
		const styleEl = { textContent: '.test { color: red; }' } as any;
		const id = (Client as any).relativePathToInlineStyleId(
			'ksd',
			'src/blocks/test-block/style.css'
		);
		(global.document as any).getElementById = vi
			.fn()
			.mockImplementation((x: string) => (x === id ? styleEl : null));

		await (hmrClient as any).updateCSS('src/blocks/test-block/style.css');
		expect(styleEl.textContent).toBe('.test { color: blue; }');
	});

	/**
	 * Test error handling in polling
	 */
	test('handles polling errors gracefully', async () => {
		const mockFetch = vi.mocked(fetch);

		// Mock network error
		mockFetch.mockRejectedValue(new Error('Network error'));

		// Start client and let it attempt to poll
		(hmrClient as any).start();

		// Advance timers to trigger polling
		vi.advanceTimersByTime(1000);

		// Should not throw errors
		expect(() => vi.advanceTimersByTime(1000)).not.toThrow();
	});
});
