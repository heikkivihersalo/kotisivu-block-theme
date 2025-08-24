import { describe, it, expect } from 'vitest';
import { shouldLoadInFooter } from '../../../../src/common/utils/vite/shouldLoadInFooter.ts';

describe('shouldLoadInFooter', () => {
	it('should return false for admin scripts', () => {
		const adminSources = [
			'/wp-admin/js/admin.js',
			'https://example.com/wp-admin/scripts/editor.js',
			'/assets/admin/dashboard.js',
			'admin-script.js',
			'/scripts/wp-admin-bar.js',
		];

		adminSources.forEach((src) => {
			const result = shouldLoadInFooter(src);
			expect(result).toBe(false);
		});
	});

	it('should return true for theme scripts', () => {
		const themeSources = [
			'/wp-content/themes/my-theme/assets/js/theme.js',
			'https://example.com/themes/active/js/main.js',
			'/assets/theme/scripts/navigation.js',
			'theme-script.js',
			'/build/theme.bundle.js',
		];

		themeSources.forEach((src) => {
			const result = shouldLoadInFooter(src);
			expect(result).toBe(true);
		});
	});

	it('should return true for frontend scripts', () => {
		const frontendSources = [
			'/assets/frontend/app.js',
			'https://example.com/frontend/main.js',
			'/js/frontend-script.js',
			'frontend.bundle.js',
			'/build/frontend/index.js',
		];

		frontendSources.forEach((src) => {
			const result = shouldLoadInFooter(src);
			expect(result).toBe(true);
		});
	});

	it('should return true by default for unknown script types', () => {
		const unknownSources = [
			'/assets/js/unknown.js',
			'https://example.com/scripts/random.js',
			'/build/bundle.js',
			'app.js',
			'/vendor/library.js',
			'/plugins/my-plugin/script.js',
		];

		unknownSources.forEach((src) => {
			const result = shouldLoadInFooter(src);
			expect(result).toBe(true);
		});
	});

	it('should handle empty string', () => {
		const result = shouldLoadInFooter('');
		expect(result).toBe(true);
	});

	it('should handle relative paths', () => {
		expect(shouldLoadInFooter('./admin/script.js')).toBe(false);
		expect(shouldLoadInFooter('../theme/main.js')).toBe(true);
		expect(shouldLoadInFooter('./frontend/app.js')).toBe(true);
	});

	it('should be case sensitive', () => {
		expect(shouldLoadInFooter('/Admin/script.js')).toBe(true); // Capital A
		expect(shouldLoadInFooter('/ADMIN/script.js')).toBe(true); // All caps
		expect(shouldLoadInFooter('/Theme/script.js')).toBe(true); // Capital T
		expect(shouldLoadInFooter('/THEME/script.js')).toBe(true); // All caps
	});

	it('should handle URLs with query parameters', () => {
		expect(shouldLoadInFooter('/admin/script.js?ver=1.0.0')).toBe(false);
		expect(shouldLoadInFooter('/theme/main.js?ver=2.0.0&cache=false')).toBe(
			true
		);
		expect(shouldLoadInFooter('/frontend/app.js?timestamp=123456')).toBe(
			true
		);
	});

	it('should handle URLs with fragments', () => {
		expect(shouldLoadInFooter('/admin/script.js#section')).toBe(false);
		expect(shouldLoadInFooter('/theme/main.js#top')).toBe(true);
		expect(shouldLoadInFooter('/frontend/app.js#init')).toBe(true);
	});

	it('should handle full URLs with protocols', () => {
		expect(
			shouldLoadInFooter('https://example.com/wp-admin/js/admin.js')
		).toBe(false);
		expect(shouldLoadInFooter('http://localhost/theme/main.js')).toBe(true);
		expect(
			shouldLoadInFooter('https://cdn.example.com/frontend/app.js')
		).toBe(true);
	});

	it('should handle mixed case admin paths', () => {
		const mixedCaseSources = [
			'/wp-ADMIN/script.js',
			'/WP-Admin/editor.js',
			'/Wp-Admin/dashboard.js',
		];

		mixedCaseSources.forEach((src) => {
			const result = shouldLoadInFooter(src);
			expect(result).toBe(true); // Should not match due to case sensitivity
		});
	});

	it('should handle admin keyword in different positions', () => {
		expect(shouldLoadInFooter('/scripts/admin/editor.js')).toBe(false);
		expect(shouldLoadInFooter('/admin-panel/script.js')).toBe(false);
		expect(shouldLoadInFooter('/my-admin-script.js')).toBe(false);
		expect(shouldLoadInFooter('/administrator/script.js')).toBe(false); // Contains 'admin' substring
	});

	it('should handle theme keyword in different positions', () => {
		expect(shouldLoadInFooter('/assets/theme/main.js')).toBe(true);
		expect(shouldLoadInFooter('/theme-customizer/script.js')).toBe(true);
		expect(shouldLoadInFooter('/my-theme-script.js')).toBe(true);
		expect(shouldLoadInFooter('/themes/active/script.js')).toBe(true); // Plural form
	});

	it('should handle frontend keyword in different positions', () => {
		expect(shouldLoadInFooter('/assets/frontend/app.js')).toBe(true);
		expect(shouldLoadInFooter('/frontend-bundle/main.js')).toBe(true);
		expect(shouldLoadInFooter('/my-frontend-app.js')).toBe(true);
	});

	it('should prioritize admin check over theme/frontend', () => {
		// If a script contains both admin and theme/frontend, admin should take precedence
		expect(shouldLoadInFooter('/wp-admin/theme-editor.js')).toBe(false);
		expect(shouldLoadInFooter('/admin/frontend-preview.js')).toBe(false);
	});

	it('should handle WordPress core admin scripts', () => {
		const wpAdminScripts = [
			'/wp-admin/js/common.js',
			'/wp-admin/js/editor.js',
			'/wp-admin/js/post.js',
			'/wp-admin/js/media-upload.js',
			'/wp-includes/js/admin-bar.js',
		];

		wpAdminScripts.forEach((src) => {
			const result = shouldLoadInFooter(src);
			expect(result).toBe(false);
		});
	});

	it('should handle block editor scripts appropriately', () => {
		// Block editor scripts could be admin or frontend depending on context
		expect(shouldLoadInFooter('/wp-admin/js/block-editor.js')).toBe(false);
		expect(shouldLoadInFooter('/themes/my-theme/blocks/frontend.js')).toBe(
			true
		);
		expect(shouldLoadInFooter('/themes/my-theme/blocks/editor.js')).toBe(
			true
		); // Theme block scripts
	});
});
