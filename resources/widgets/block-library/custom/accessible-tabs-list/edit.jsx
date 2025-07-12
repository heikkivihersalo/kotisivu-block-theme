/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import CustomAppender from './components/CustomAppender';
import './editor.css';

/**
 * Block edit function
 * @param {Object} props - block props
 * @return {JSX.Element} - React component
 */
export default function Edit(props) {
	const {
		attributes: { allowedBlocks, template, templateLock },
		clientId,
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: 'accessible-tabs__list editor-accessible-tabs__list',
	});

	/**
	 * Set block props
	 */
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template,
		templateLock,
		allowedBlocks,
		directInsert: true,
		renderAppender: () => <CustomAppender clientId={clientId} />,
	});

	/**
	 * Return block edit view
	 */
	return (
		<>
			<ul className={innerBlocksProps.className} role="tablist">
				{innerBlocksProps.children}
			</ul>
		</>
	);
}
