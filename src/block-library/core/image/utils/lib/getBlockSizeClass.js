/**
 * Returns the block size class name.
 * @param {string} slug
 */
function getBlockSizeClass(slug) {
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
};

export { getBlockSizeClass }