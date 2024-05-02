/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@components/inspector';
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Properties
 * @return {JSX.Element} React component
 */
export default function Edit(props) {
	const {
		attributes: { blockClass, templateLock },
		context,
		clientId,
	} = props;

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
