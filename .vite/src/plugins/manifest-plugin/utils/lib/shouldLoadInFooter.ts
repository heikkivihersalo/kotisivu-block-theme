/**
 * Determine if script should load in footer
 * Enhanced logic for WordPress context
 */
export function shouldLoadInFooter(src: string): boolean {
	// Admin scripts typically load in head
	if (src.includes('admin')) return false;

	// Theme scripts load in footer by default
	if (src.includes('theme') || src.includes('frontend')) return true;

	// Default to footer for better performance
	return true;
}
