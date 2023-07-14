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
import { getBlockSyles } from '@utils/modifiers';

/**
 * Styles
 */
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			heroClass,
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

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames(heroClass, isReversed),
		style: getBlockSyles({ style, width, justifyItems, alignItems }),
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
						heroClass: variation.attributes.heroClass,
						showAlignmentControls: variation.attributes.showAlignmentControls,
						templateLock: variation.attributes.templateLock,
						width: variation.attributes.width
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