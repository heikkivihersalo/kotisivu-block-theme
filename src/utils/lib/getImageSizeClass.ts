/**
 * Returns the block size class name.
 * @param {string} slug
 * @return {string} Block size class name.
 */
function getImageSizeClass(slug: string): string {
	switch (slug) {
		case 'full':
			return 'size-full';
		case 'large':
			return 'size-large';
		case 'medium_large':
			return 'size-medium_large';
		case 'medium':
			return 'size-medium';
		case 'thumbnail':
			return 'size-thumbnail';
		default:
			return '';
	}
}

export { getImageSizeClass };
