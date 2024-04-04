import { useState, useEffect } from '@wordpress/element';

/**
 * @typedef {Object} Dimensions
 * @property {number} width  The width of the element
 * @property {number} height The height of the element
 */

/**
 * Get the dimensions of the window
 * @return {Dimensions} The dimensions of the window
 */
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

/**
 * Get the dimensions of the window
 * @return {Dimensions} The dimensions of the window
 */
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export { useWindowDimensions };
