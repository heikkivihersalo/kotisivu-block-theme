/**
 * Set correct wrapper for HTML container.
 * @param {props} props Default WordPress props
 * @return {JSX.Element} Wrapper for child elements
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
	 * If wrapperName is not defined, return the default case.
	 */
	if (!container) {
		return <div id={id || null} className={classes} style={styles}>
			{children}
		</div>;
	}

	switch (container) {
		case 'div':
			return (
				<div id={id || null} className={classes} style={styles}>
					{children}
				</div>
			);
		case 'section':
			return (
				<section id={id || null} className={classes} style={styles}>
					{children}
				</section>
			);
		case 'article':
			return (
				<article id={id || null} className={classes} style={styles}>
					{children}
				</article>
			);
		case 'aside':
			return (
				<aside id={id || null} className={classes} style={styles}>
					{children}
				</aside>
			);
		case 'main':
			return (
				<main id={id || null} className={classes} style={styles}>
					{children}
				</main>
			);
		default:
			return <div id={id || null} className={classes} style={styles}>
				{children}
			</div>;
	}
}

export { ContainerWrapper };
