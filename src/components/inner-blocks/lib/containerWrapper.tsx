/**
 * Set correct wrapper for HTML container.
 * @param {props} props Default WordPress props
 * @return {JSX.Element} Wrapper for child elements
 */
function ContainerWrapper({
	children,
	attributes: { id, container = 'div' },
	classes = '',
	styles = {},
}: {
	children: JSX.Element;
	attributes: {
		id: string | undefined;
		container: string | undefined;
	};
	classes: string;
	styles: React.CSSProperties;
}): JSX.Element {
	switch (container) {
		case 'div':
			return (
				<div id={id || undefined} className={classes} style={styles}>
					{children}
				</div>
			);
		case 'section':
			return (
				<section
					id={id || undefined}
					className={classes}
					style={styles}
				>
					{children}
				</section>
			);
		case 'article':
			return (
				<article
					id={id || undefined}
					className={classes}
					style={styles}
				>
					{children}
				</article>
			);
		case 'aside':
			return (
				<aside id={id || undefined} className={classes} style={styles}>
					{children}
				</aside>
			);
		case 'main':
			return (
				<main id={id || undefined} className={classes} style={styles}>
					{children}
				</main>
			);
		default:
			return (
				<div id={id || undefined} className={classes} style={styles}>
					{children}
				</div>
			);
	}
}

export { ContainerWrapper };
