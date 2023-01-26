/**
 * Set correct wrapper for HTML container.
 * @param {props} props
 * @return {JSX.Element} 
 */
const ContainerWrapper = (props) => {
	/**
	 * Get the children, attributes and blockProps from props.
	 */
	const {
		children,
		attributes: {
			sectionId,
			sectionContainer
		},
		classes,
		styles
	} = props;

	/**
	 * Define the default case.
	 * @returns {JSX.Element}
	 */
	const defaultCase = () => {
		return (
			<div id={sectionId || null}  className={classes} style={styles}>
				{children}
			</div>
		);
	}

	/** 
	 * If wrapperName is not defined, return the default case.
	 */
	if (!sectionContainer) {
		return defaultCase;
	}

	/**
	 * Return the correct HTML wrapper for element 
	 * @returns {JSX.Element}
	 */
	switch (sectionContainer) {
		case 'div':
			return (
				<div id={sectionId || null}  className={classes} style={styles}>
					{children}
				</div>
			);
		case 'section':
			return (
				<section id={sectionId || null}  className={classes} style={styles}>
					{children}
				</section>
			);
		case 'article':
			return (
				<article id={sectionId || null}  className={classes} style={styles}>
					{children}
				</article>
			);
		case 'aside':
			return (
				<aside id={sectionId || null}  className={classes} style={styles}>
					{children}
				</aside>
			);
		case 'main':
			return (
				<main id={sectionId || null}  className={classes} style={styles}>
					{children}
				</main>
			);
		default:
			return defaultCase;
	}
}

export { ContainerWrapper };
