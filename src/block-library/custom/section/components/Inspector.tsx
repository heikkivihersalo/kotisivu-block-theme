/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
	AriaLabelControls,
	BackgroundColorControls,
	WidthControls,
	GridAlignControls,
	GapControls,
} from '@components/inspector';

/**
 * Inspector controls
 * @param {Record<string, any>} props Component properties
 * @return {JSX.Element} Inspector controls
 */
const Inspector = (props: Record<string, any>): JSX.Element => {
	const { attributes, setAttributes } = props;
	return (
		<>
			<InspectorControls>
				<AriaLabelControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</InspectorControls>
			<InspectorControls group="styles">
				<BackgroundColorControls
					style={attributes.style}
					setAttributes={setAttributes}
				/>
				<GridAlignControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				<GapControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				<WidthControls
					style={attributes.style}
					setAttributes={setAttributes}
				/>
			</InspectorControls>
		</>
	);
};

export default Inspector;
