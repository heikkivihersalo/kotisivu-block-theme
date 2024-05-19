/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Block save function
 * @return {JSX.Element} - Block inner blocks markup
 */
export default function Save() {
	const innerBlocksProps = useInnerBlocksProps.save(
		useBlockProps.save({
			className: 'accessible-tabs__panel-container',
		})
	);

	/**
	 * Return block save view
	 */
	return (
		<div className={innerBlocksProps.className}>
			{innerBlocksProps.children}
		</div>
	);
}
