/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { __experimentalBlockVariationPicker as BlockVariationPicker } from "@wordpress/block-editor";
import { getAttributesFromProps } from "../utils";

const VariationPicker = ({ setAttributes, blockVariations }) => {
	if (!blockVariations) {
		return null;
	}

	return (
		<>
			<BlockVariationPicker
				label={__("Choose variation", "kotisivu-block-theme")}
				instructions={__(
					"Select a block variation to start with.",
					"kotisivu-block-theme"
				)}
				onSelect={(variation) =>
					setAttributes(getAttributesFromProps(variation))
				}
				variations={blockVariations}
			/>
		</>
	);
};

export { VariationPicker };
