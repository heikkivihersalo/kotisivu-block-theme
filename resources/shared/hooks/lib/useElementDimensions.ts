import { useState, useLayoutEffect } from '@wordpress/element';

type Dimensions = {
	width: number;
	height: number;
};

/**
 * Get the dimensions of a React ref object
 * @param {import('react').RefObject} ref A React ref object
 * @return {Dimensions} The dimensions of the element
 */
const getElementDimensions = (
	ref: React.RefObject<HTMLElement>
): Dimensions => {
	return {
		width: ref.current ? ref.current.offsetWidth : 0,
		height: ref.current ? ref.current.offsetHeight : 0,
	};
};

/**
 * A hook to get the dimensions of a React element
 * @param {import('react').RefObject} ref A React ref object
 * @return {Dimensions} The dimensions of the element
 */
function useElementDimensions(ref: React.RefObject<HTMLElement>): Dimensions {
	const [elementDimensions, setElementDimensions] = useState<Dimensions>({
		width: 0,
		height: 0,
	});

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
