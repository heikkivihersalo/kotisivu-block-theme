/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@/shared/components/inner-blocks';
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Properties
 * @param {Record<string, any>} props.attributes Block attributes
 * @param {Record<string, any>} props.context Block context
 * @param {string} props.clientId Block client ID
 * @return {JSX.Element} React component
 */
export default function Edit({
	attributes,
	context,
	clientId,
}: {
	attributes: Record<string, any>;
	context: Record<string, any>;
	clientId: string;
}): JSX.Element {
	const { blockClass, templateLock } = attributes;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: blockClass,
	});

	const innerBlocksProps = InnerBlocksAppender({
		clientId,
		template: context['generic-carousel/template'],
		templateLock,
		blockProps,
	});

	/**
	 * Return block edit view
	 */
	return (
		<>
			<li {...innerBlocksProps} />
		</>
	);
}
