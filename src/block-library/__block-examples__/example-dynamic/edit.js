/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

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
		<div {...blockProps}>
			<InnerBlocks template={
				[
					['core/heading', { level: 1 }]
				]
			} />
		</div>
	);
};
