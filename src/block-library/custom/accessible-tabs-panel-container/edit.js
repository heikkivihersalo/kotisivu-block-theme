/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Styles
 */
import './editor.css';

/**
 * Block edit function
 * @param {Object} props - block props
 * @param {Object} props.attributes - Block attributes
 * @return {Object} - React component
 */
export default function Edit({ attributes }) {
	const { allowedBlocks, template, templateLock } = attributes;

	const blockProps = useBlockProps({
		className:
			'accessible-tabs__panel-container editor-accessible-tabs__panel-container',
	});

	/**
	 * Set block props
	 */
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template,
		templateLock,
		allowedBlocks,
		directInsert: true,
		renderAppender: false,
	});

	/**
	 * Return block edit view
	 */
	return (
		<div className={innerBlocksProps.className}>
			{innerBlocksProps.children}
		</div>
	);
}
