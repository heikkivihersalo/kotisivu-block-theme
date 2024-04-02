/**
 * Get is-reversed class based on isReversed attribute
 * @param {boolean} isReversed - isReversed attribute
 * @return {string|undefined} is-reversed class if isReversed is true
 */
function getIsReversedClass(isReversed) {
    return isReversed ? 'is-reversed' : undefined
};

export { getIsReversedClass }