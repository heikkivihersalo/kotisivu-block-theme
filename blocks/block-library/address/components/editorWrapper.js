/**
 * Wrapper component for individual address blocks in editor.
 *
 * @param {*} { children, attributes }
 * @return {*} 
 */
const EditorWrapper = ({ children, attributes }) => {
	if (attributes.hasIcon) {
		return (
			<div className="address__icon-wrapper--editor">
				<i className={`address__icon ${attributes.unicode}`}></i>{children}
			</div>
		);
	} else {
		return (
			<>
				{children}
			</>
		);
	}

}

export default EditorWrapper;
