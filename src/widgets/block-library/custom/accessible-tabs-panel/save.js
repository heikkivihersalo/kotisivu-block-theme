/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Block save function
 * @param {Object} props - Block properties
 * @param {Object} props.attributes - Block attributes
 * @return {JSX.Element} - Block inner blocks markup
 */
export default function Save({ attributes }) {
	const { panelId } = attributes;

	const innerBlocksProps = useInnerBlocksProps.save(
		useBlockProps.save({
			className: 'accessible-tabs__panel',
		})
	);

	/**
	 * Return block save view
	 */
	return (
		<section
			id={`panel-${panelId}`}
			role="tabpanel"
			className={innerBlocksProps.className}
			aria-labelledby={`tab-${panelId}`}
			tabIndex="0"
			hidden={panelId === 1 ? false : true}
		>
			{innerBlocksProps.children}
		</section>
	);
}
