/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Block save function
 * @param {Object} props Properties
 * @param {Object} props.attributes Block attributes
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save({ attributes }) {
	const { tabName, tabId, tabRef } = attributes;

	const blockProps = useBlockProps.save({
		className: 'accessible-tabs__list-item',
		role: 'presentation',
	});

	return (
		<li {...blockProps}>
			<RichText.Content
				id={`tab-${tabId}`}
				tagName="button"
				role="tab"
				aria-selected={tabId === 1 ? 'true' : 'false'}
				href={tabRef}
				className="accessible-tabs__list-item__button"
				value={tabName}
			/>
		</li>
	);
}
