/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import './editor.css';

/**
 * Block edit function
 * @return {JSX.Element} React component
 */
export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<header {...blockProps}>
			<div className="editor-site-logo-placeholder">Site Logo</div>
			<div className="editor-site-navigation-placeholder">Site Navigation</div>
		</header>
	);
};
