/**
 * Get is-reversed class based on isReversed attribute
 * @param {boolean} isReversed 
 * @returns {string|undefined}
 */
function getIsReversedClass(isReversed) {
    return isReversed ? 'is-reversed' : undefined
};

export { getIsReversedClass }