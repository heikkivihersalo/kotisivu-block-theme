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
			id,
			container
		},
		classes,
		styles
	} = props;

	/**
	 * Define the default case.
	 * @return {JSX.Element}
	 */
	const defaultCase = () => {
		return (
			<div id={id || null}  className={classes} style={styles}>
				{children}
			</div>
		);
	}

	/**
	 * If wrapperName is not defined, return the default case.
	 */
	if (!container) {
		return defaultCase;
	}

	/**
	 * Return the correct HTML wrapper for element 
	 * @return {JSX.Element}
	 */
	switch (container) {
		case 'div':
			return (
				<div id={id || null}  className={classes} style={styles}>
					{children}
				</div>
			);
		case 'section':
			return (
				<section id={id || null}  className={classes} style={styles}>
					{children}
				</section>
			);
		case 'article':
			return (
				<article id={id || null}  className={classes} style={styles}>
					{children}
				</article>
			);
		case 'aside':
			return (
				<aside id={id || null}  className={classes} style={styles}>
					{children}
				</aside>
			);
		case 'main':
			return (
				<main id={id || null}  className={classes} style={styles}>
					{children}
				</main>
			);
		default:
			return defaultCase;
	}
}

export { ContainerWrapper };
