/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { getBlockStyles } from '@utils';

/**
 * Block save function
 * @param {Object} props Properties
 * @return {JSX.Element} Block markup
 */
export default function Save(props) {
	const {
		attributes: {
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
		},
	} = props;

	const { children, ...innerBlocksProps } = useInnerBlocksProps.save(
		useBlockProps.save({
			className: classnames(blockClass),
			style: getBlockStyles({ style }),
			open: isOpenOnLoad,
			'aria-expanded': isOpenOnLoad ? 'true' : 'false',
		})
	);

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
					<div itemProp="text">{children}</div>
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
				{children}
			</div>
		</details>
	);
}
