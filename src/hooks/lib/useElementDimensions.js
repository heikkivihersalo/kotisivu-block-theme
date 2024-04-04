import { useState, useLayoutEffect } from '@wordpress/element';

/**
 * @typedef {Object} Dimensions
 * @property {number} width  The width of the element
 * @property {number} height The height of the element
 */

/**
 * Get the dimensions of a React ref object
 * @param {import('react').RefObject} ref A React ref object
 * @return {Dimensions} The dimensions of the element
 */
const getElementDimensions = (ref) => {
	return {
		width: ref.current.offsetWidth,
		height: ref.current.offsetHeight,
	};
};

/**
 * A hook to get the dimensions of a React element
 * @param {import('react').RefObject} ref A React ref object
 * @return {Dimensions} The dimensions of the element
 */
function useElementDimensions(ref) {
	const [elementDimensions, setElementDimensions] = useState();

	useLayoutEffect(() => {
		const handleResize = () => {
			setElementDimensions(getElementDimensions(ref));
		};

		/**
		 * Get the dimensions of the element
		 */
		handleResize();

		/**
		 * Add a resize event listener to the window
		 */
		window.addEventListener('resize', handleResize);

		/**
		 * Remove the resize event listener from the window
		 */
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return elementDimensions;
}

export { useElementDimensions };
