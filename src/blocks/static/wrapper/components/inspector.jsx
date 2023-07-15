/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import {
	BackgroundColorControl,
	WidthControls,
	GridAlignControls,
} from "@features/inspector";

const Inspector = (props) => {
	return (
		<>
			<InspectorControls group="styles">
				<BackgroundColorControl {...props} />
				<GridAlignControls {...props} />
				<WidthControls {...props} />
			</InspectorControls>
		</>
	);
};

export default Inspector;
