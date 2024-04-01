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
 * @returns {Object} - React component
 */
export default function Edit(props) {
	const blockProps = useBlockProps({
		className: 'editor-site-content'
	});

	return (
		<div {...blockProps}>
			{__('Site Content', 'kotisivu-theme-blocks')}
		</div>
	);
};
