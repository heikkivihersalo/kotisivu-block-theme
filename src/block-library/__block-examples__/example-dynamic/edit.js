/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Block props
 * @return {JSX.Element} React component
 */
export default function Edit() {
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
