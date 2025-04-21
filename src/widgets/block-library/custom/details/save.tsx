/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getBlockStyles, classnames } from '@/shared/utils';

/**
 * Block save function
 * @param {Object} props Properties
 * @param {Record<string, any>} props.attributes Block attributes
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save({ attributes }: Record<string, any>): JSX.Element {
	const {
		blockClass,
		style,
		headingContent,
		useSchema,
		containerSchemaProp,
		containerSchemaType,
		headingSchemaProp,
		contentSchemaProp,
		contentSchemaType,
		isOpenOnLoad,
	} = attributes;

	const { children, ...innerBlocksProps } = useInnerBlocksProps.save(
		useBlockProps.save({
			className: classnames(blockClass),
			style: getBlockStyles(style),
			open: isOpenOnLoad,
			'aria-expanded': isOpenOnLoad ? 'true' : 'false',
		})
	);

	const childrenNode = children as React.ReactNode;

	if (useSchema) {
		return (
			<details
				{...innerBlocksProps}
				itemScope
				itemProp={containerSchemaProp}
				itemType={containerSchemaType}
			>
				<summary className="details__wrapper details__wrapper--summary">
					<RichText.Content
						tagName="h3"
						className="details__heading"
						value={headingContent}
						itemProp={headingSchemaProp}
					/>
				</summary>
				<div
					className="details__wrapper details__wrapper--text"
					itemScope
					itemProp={contentSchemaProp}
					itemType={contentSchemaType}
				>
					<div itemProp="text">{childrenNode}</div>
				</div>
			</details>
		);
	}
	return (
		<details {...innerBlocksProps}>
			<RichText.Content
				tagName="summary"
				className="details__heading"
				value={headingContent}
			/>
			<div className="details__wrapper details__wrapper--text">
				{childrenNode}
			</div>
		</details>
	);
}
