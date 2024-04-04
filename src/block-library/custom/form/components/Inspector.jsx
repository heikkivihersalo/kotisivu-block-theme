/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
	AriaLabelControls,
	BackgroundColorControl,
	WidthControls,
	GridAlignControls,
} from '@components/inspector';

/**
 * Inspector controls
 * @param {Object} props Component properties
 * @return {JSX.Element} Inspector controls
 */
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
