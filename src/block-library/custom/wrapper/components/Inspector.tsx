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

import { BlockEditProps } from '@wordpress/blocks';

/**
 * Inspector controls
 * @param {Object} props Component properties
 * @return {JSX.Element} Inspector controls
 */
const Inspector = (props: BlockEditProps<any>): JSX.Element => {
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
