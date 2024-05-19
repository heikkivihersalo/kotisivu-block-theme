/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Properties
 * @return {JSX.Element} React component
 */
export default function Edit(props) {
	const {
		attributes: { template, templateLock, allowedBlocks },
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps();

	/**
	 * Return block edit view
	 */
	return (
		<div {...blockProps}>
			<InnerBlocks
				template={template}
				templateLock={templateLock}
				allowedBlocks={allowedBlocks}
			/>
		</div>
	);
}
