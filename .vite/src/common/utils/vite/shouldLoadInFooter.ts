/**
 * Determine if script should load in footer
 * Enhanced logic for WordPress context
 */
export function shouldLoadInFooter(src: string): boolean {
	// Admin scripts typically load in head
	return !src.includes('admin');
}
