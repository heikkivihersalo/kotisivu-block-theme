import { name as blockName } from './block.json';

/**
 * WordPress dependencies
 */
import classnames from 'classnames';
import { __ } from "@wordpress/i18n";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalBlockVariationPicker as BlockVariationPicker,
	store as blockEditorStore,
	InspectorControls
} from "@wordpress/block-editor";
import {
	store as blocksStore,
} from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { AriaLabelControls, BackgroundColorControl, WidthControl, InnerBlocksAppender } from '@features/inspector';
import { convertVerticalBarSyntaxToCSS } from '@utils/modifiers';

/**
 * Styles
 */
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			sectionClass,
			ariaLabel,
			ariaLabelledBy,
			template,
			templateLock,
			style,
			width,
			variationName,
			showAlignmentControls
		},
		setAttributes,
		clientId
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: sectionClass,
		style: {
			background: style.backgroundColor ? style.backgroundColor : undefined,
			marginTop: style?.spacing?.margin?.top ? convertVerticalBarSyntaxToCSS(style.spacing.margin.top) : undefined,
			marginBottom: style?.spacing?.margin?.bottom ? convertVerticalBarSyntaxToCSS(style.spacing.margin.bottom) : undefined,
			paddingTop: style?.spacing?.padding?.top ? convertVerticalBarSyntaxToCSS(style.spacing.padding.top) : undefined,
			paddingBottom: style?.spacing?.padding?.bottom ? convertVerticalBarSyntaxToCSS(style.spacing.padding.bottom) : undefined,
			paddingLeft: style?.spacing?.padding?.left ? convertVerticalBarSyntaxToCSS(style.spacing.padding.left) : undefined,
			paddingRight: style?.spacing?.padding?.right ? convertVerticalBarSyntaxToCSS(style.spacing.padding.right) : undefined,
			width: width === 'full' ? "var(--wp--style--global--wide-size)" : "var(--wp--style--global--content-size)"
		},
		'aria-label': ariaLabel ? ariaLabel : null,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null
	});

	const blockVariations = useSelect(
		(select) => {
			const { getBlockVariations } = select(blocksStore);
			return getBlockVariations(blockName, 'block');
		},
		[blockName]
	);

	const innerBlocksProps = InnerBlocksAppender({
		clientId: clientId,
		template: template,
		templateLock: templateLock,
		blockProps: blockProps
	});

	/* If variation isn't selected, render variation select screen */
	if (!variationName) {
		return (
			<BlockVariationPicker
				label={__('Choose variation')}
				instructions={__('Select a variation to start with.')}
				onSelect={(variation) =>
					setAttributes({
						variationName: variation.name,
						template: variation.innerBlocks,
						className: variation.attributes.className,
						showAlignmentControls: variation.attributes.showAlignmentControls
					})
				}
				variations={blockVariations}
			/>)
	}

	/**
	 * Return block edit view
	 */
	return (
		<>
			<InspectorControls>
				<AriaLabelControls {...props} />
			</InspectorControls>
			<InspectorControls group="styles">
				<BackgroundColorControl {...props} />
				{showAlignmentControls &&
					(
						<WidthControl {...props} />
					)
				}
			</InspectorControls>
			<section {...innerBlocksProps} />
		</>
	);
};

export default Edit;