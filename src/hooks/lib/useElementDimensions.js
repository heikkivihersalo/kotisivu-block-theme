import { useState, useLayoutEffect } from '@wordpress/element';

/**
 * Get the dimensions of a React ref object
 */
const getElementDimensions = (ref) => {
  return {
    width: ref.current.offsetWidth,
    height: ref.current.offsetHeight
  };
}

/**
 * A hook to get the dimensions of a React element
 * @param {React.RefObject} ref - A React ref object
 * @returns {Object} { width: number, height: number } - The dimensions of the element
 */
function useElementDimensions(ref) {
  const [elementDimensions, setElementDimensions] = useState();

  useLayoutEffect(() => {
    const handleResize = () => {
      setElementDimensions(getElementDimensions(ref));
    }

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
