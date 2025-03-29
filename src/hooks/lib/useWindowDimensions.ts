import { useState, useEffect } from '@wordpress/element';

type Dimensions = {
	width: number;
	height: number;
};

/**
 * Get the dimensions of the window
 * @return {Dimensions} The dimensions of the window
 */
function getWindowDimensions(): Dimensions {
	const { innerWidth: width, innerHeight: height } = window;
	return { width, height };
}

/**
 * Get the dimensions of the window
 * @return {Dimensions} The dimensions of the window
 */
function useWindowDimensions(): Dimensions {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions(getWindowDimensions());
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
}

export { useWindowDimensions };
