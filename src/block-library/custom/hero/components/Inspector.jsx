/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import {
	AriaLabelControls,
	BackgroundColorControl,
	WidthControls,
	GridAlignControls,
} from "@components/inspector";

const Inspector = (props) => {
	return (
		<>
			<InspectorControls>
				<AriaLabelControls {...props} />
			</InspectorControls>
			<InspectorControls group="styles">
				<BackgroundColorControl {...props} />
				<GridAlignControls {...props} />
				<WidthControls {...props} />
			</InspectorControls>
		</>
	);
};

export default Inspector;
