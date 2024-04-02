/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Styles
 */
import './editor.css';

/**
 * Block edit function
 * @param {Object} props - block props
 * @return {Object} - React component
 */
export default function Edit(props) {
	const blockProps = useBlockProps();

	return (
		<header {...blockProps}>
			<div className="editor-site-logo-placeholder">Site Logo</div>
			<div className="editor-site-navigation-placeholder">Site Navigation</div>
		</header>
	);
};
