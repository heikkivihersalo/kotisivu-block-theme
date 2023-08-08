import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';
import { getBlockSyles } from '@utils';

const Save = (props) => {
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
			isOpenOnLoad
		}
	} = props;

	const { children, ...innerBlocksProps } = useInnerBlocksProps.save(useBlockProps.save({
		className: classnames(blockClass),
		style: getBlockSyles({ style }),
		open: isOpenOnLoad,
		"aria-expanded": isOpenOnLoad ? "true" : "false"
	}));



	if (useSchema) {
		return (
			<details {...innerBlocksProps} itemScope itemProp={containerSchemaProp} itemType={containerSchemaType}>
				<summary className="details__wrapper details__wrapper--summary">
					<RichText.Content tagName="h3" className="details__heading" value={headingContent} itemProp={headingSchemaProp} />
				</summary>
				<div className="details__wrapper details__wrapper--text" itemScope itemProp={contentSchemaProp} itemType={contentSchemaType}>
					<div itemProp="text">
						{children}
					</div>
				</div>
			</details>
		)
	} else {
		return (
			<details {...innerBlocksProps}>
				<RichText.Content tagName="summary" className="details__heading" value={headingContent} />
				<div className="details__wrapper details__wrapper--text">
					{children}
				</div>
			</details>
		)
	}
};

export default Save;
