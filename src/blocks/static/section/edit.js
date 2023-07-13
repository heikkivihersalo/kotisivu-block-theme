/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	__experimentalBlockVariationPicker as BlockVariationPicker,
	InspectorControls
} from "@wordpress/block-editor";
import {
	store as blocksStore,
} from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { AriaLabelControls, BackgroundColorControl, WidthControls, InnerBlocksAppender, GridAlignControls } from '@features/inspector';
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
			justifyItems,
			alignItems,
			variationName,
			showAlignmentControls,
			isReversed
		},
		setAttributes,
		clientId
	} = props;

	const getIsReversedClass = (isReversed) => {
		if (isReversed) {
			return 'is-reversed';
		}
		return false;
	}

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames(sectionClass, getIsReversedClass(isReversed)),
		style: {
			background: style.backgroundColor ? style.backgroundColor : undefined,
			marginTop: style?.spacing?.margin?.top ? convertVerticalBarSyntaxToCSS(style.spacing.margin.top) : undefined,
			marginBottom: style?.spacing?.margin?.bottom ? convertVerticalBarSyntaxToCSS(style.spacing.margin.bottom) : undefined,
			paddingTop: style?.spacing?.padding?.top ? convertVerticalBarSyntaxToCSS(style.spacing.padding.top) : undefined,
			paddingBottom: style?.spacing?.padding?.bottom ? convertVerticalBarSyntaxToCSS(style.spacing.padding.bottom) : undefined,
			paddingLeft: style?.spacing?.padding?.left ? convertVerticalBarSyntaxToCSS(style.spacing.padding.left) : undefined,
			paddingRight: style?.spacing?.padding?.right ? convertVerticalBarSyntaxToCSS(style.spacing.padding.right) : undefined,
			width: width ? width : undefined,
			justifyItems: justifyItems ? justifyItems : undefined,
			alignItems: alignItems ? alignItems : undefined
		},
		'aria-label': ariaLabel ? ariaLabel : null,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null
	});

	const blockVariations = useSelect(
		(select) => {
			const { getBlockVariations } = select(blocksStore);
			return getBlockVariations(metadata.name, 'block');
		},
		[metadata.name]
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
						sectionClass: variation.attributes.sectionClass,
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
						<>
							<GridAlignControls {...props} />
							<WidthControls {...props} />
						</>
					)
				}
			</InspectorControls>
			<section {...innerBlocksProps} />
		</>
	);
};

export default Edit;