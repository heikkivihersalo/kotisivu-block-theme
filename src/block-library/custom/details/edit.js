/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText
} from "@wordpress/block-editor";
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { InnerBlocksAppender } from '@features/inspector';
import Inspector from "./components/Inspector.js";
import { VariationPicker, getBlockVariations } from "@features/variations";
import { getBlockStyles, getIsReversedClass } from '@utils';

/**
 * Styles
 */
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			blockClass,
			template,
			templateLock,
			style,
			variationName,
			isReversed,
			headingContent,
			isOpenOnLoad
		},
		setAttributes,
		clientId
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames(blockClass, getIsReversedClass(isReversed)),
		style: getBlockStyles({ style }),
		open: isOpenOnLoad
	});

	const { children, ...innerBlocksProps } = InnerBlocksAppender({
		clientId: clientId,
		template: template,
		templateLock: templateLock,
		blockProps: blockProps
	});

	/**
	 * Get variations
	 */
	const blockVariations = getBlockVariations(metadata.name);

	/* If variation isn't selected, render variation select screen */
	if (!variationName) {
		return (
			<VariationPicker
				setAttributes={setAttributes}
				blockVariations={blockVariations}
			/>
		)
	}

	/**
	 * Return block edit view
	 */
	return (
		<>
			<Inspector {...props} />
			<details {...innerBlocksProps}>
				<RichText
					tagName="summary"
					className="details__heading"
					value={headingContent}
					onChange={(content) => setAttributes({ headingContent: content })}
					placeholder={__('Add a descriptive text here...', 'kotisivu-block-theme')}
				/>
				{children}
			</details>
		</>
	);
};

export default Edit;