const LinkWrapper = ({ children, attributes, editor }) => {

	if (attributes.isLink) {
		return (
            <>
                {editor
                    ? <a className="social-icon-list-item__link">{children}</a>
                    : <a className="social-icon-list-item__link" href={attributes.url} title={attributes.title}>{children}</a>
                }
            </>
		);
	} else {
		return (
			<>
				{children}
			</>
		);
	}

}

export default LinkWrapper;
