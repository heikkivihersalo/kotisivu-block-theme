/**
 * Set correct wrapper for HTML container.
 * @param {props} props
 * @return {JSX.Element} 
 */
const Wrapper = ({ anchor, children, blockWrapper, classes, styles }) => {

	/**
	 * Define the default case.
	 * @returns {JSX.Element}
	 */
	const defaultCase = () => {
		return (
			<div id={anchor || null} className={classes} style={styles}>
				{children}
			</div>
		);
	}

	/** 
	 * If wrapperName is not defined, return the default case.
	 */
	if (!blockWrapper) {
		return defaultCase;
	}

	/**
	 * Return the correct HTML wrapper for element 
	 * @returns {JSX.Element}
	 */
	switch (blockWrapper) {
		case 'div':
			return (
				<div id={anchor || null} className={classes} style={styles}>
					{children}
				</div>
			);
		case 'li':
			return (
				<li id={anchor || null} className={classes} style={styles}>
					{children}
				</li>
			);
		default:
			return defaultCase;
	}
}

export { Wrapper };
