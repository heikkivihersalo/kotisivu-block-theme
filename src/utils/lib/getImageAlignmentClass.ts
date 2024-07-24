/**
 * Get block alignment class name
 * @param {string} align Block alignment
 * @return {string} Alignment class name
 */
function getImageAlignmentClass(align: string): string | null {
	if (!align) return null;

	switch (align) {
		case 'left':
			return 'has-align-left';
		case 'right':
			return 'has-align-right';
		case 'center':
			return 'has-align-center';
		case 'wide':
			return 'has-align-wide';
		case 'full':
			return 'has-align-full';
		default:
			return null;
	}
}

export { getImageAlignmentClass };
