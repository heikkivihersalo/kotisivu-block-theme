/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import './editor.css';

/**
 * Block edit function
 * @return {JSX.Element} - React component
 */
export default function Edit() {
	const blockProps = useBlockProps({
		className: 'editor-site-content'
	});

	return (
		<div {...blockProps}>
			{__('Site Content', 'kotisivu-theme-blocks')}
		</div>
	);
};
