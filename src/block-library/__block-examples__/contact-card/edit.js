/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps
} from "@wordpress/block-editor";
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@components/inspector';
import metadata from './block.json';
import { VariationPicker, getBlockVariations } from "@components/variations";
import { Wrapper } from './wrapper.js';

/**
 * Styles
 */
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			variationName,
			blockClass,
			blockWrapper,
			template,
			templateLock,
		},
		clientId,
		setAttributes
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: blockClass
	});

	const innerBlocksProps = InnerBlocksAppender({
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

	let wrapperProps = {
		anchor: props.attributes?.anchor,
		children: innerBlocksProps.children,
		blockWrapper: blockWrapper,
		classes: innerBlocksProps.className,
		styles: innerBlocksProps.style
	}

	return (
		<>
			<Wrapper {...wrapperProps} />
		</>
	);
};

export default Edit;