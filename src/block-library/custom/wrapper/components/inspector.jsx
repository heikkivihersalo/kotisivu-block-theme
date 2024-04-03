/**
 * WordPress dependencies
 */
import {InspectorControls} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
	BackgroundColorControl,
	WidthControls,
	GridAlignControls,
	GapControls,
} from '@components/inspector';

/**
 * Inspector controls
 * @param {Object} props Component properties
 * @return {JSX.Element} Inspector controls
 */
const Inspector = (props) => {
	return (
		<>
			<InspectorControls group="styles">
				<BackgroundColorControl {...props} />
				<GridAlignControls {...props} />
				<GapControls {...props} />
				<WidthControls {...props} />
			</InspectorControls>
		</>
	);
};

export default Inspector;
