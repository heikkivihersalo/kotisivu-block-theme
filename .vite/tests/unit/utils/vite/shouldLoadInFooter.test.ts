import { describe, it, expect } from 'vitest';
import { shouldLoadInFooter } from '../../../../src/common/utils/vite/shouldLoadInFooter.ts';

describe('shouldLoadInFooter', () => {
	it('should return false for admin scripts', () => {
		expect(shouldLoadInFooter('/wp-admin/js/admin.js')).toBe(false);
		expect(shouldLoadInFooter('admin-script.js')).toBe(false);
		expect(shouldLoadInFooter('/scripts/admin/editor.js')).toBe(false);
	});

	it('should return true for theme scripts', () => {
		expect(shouldLoadInFooter('/themes/my-theme/main.js')).toBe(true);
		expect(shouldLoadInFooter('theme-script.js')).toBe(true);
	});

	it('should return true for frontend scripts', () => {
		expect(shouldLoadInFooter('/assets/frontend/app.js')).toBe(true);
		expect(shouldLoadInFooter('frontend.bundle.js')).toBe(true);
	});

	it('should return true for unknown script types', () => {
		expect(shouldLoadInFooter('/assets/js/unknown.js')).toBe(true);
		expect(shouldLoadInFooter('')).toBe(true);
	});

	it('should be case sensitive', () => {
		expect(shouldLoadInFooter('/Admin/script.js')).toBe(true);
		expect(shouldLoadInFooter('/ADMIN/script.js')).toBe(true);
	});

	it('should prioritize admin check over theme/frontend', () => {
		expect(shouldLoadInFooter('/wp-admin/theme-editor.js')).toBe(false);
		expect(shouldLoadInFooter('/admin/frontend-preview.js')).toBe(false);
	});
});
