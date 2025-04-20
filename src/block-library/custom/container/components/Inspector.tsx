/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import { FormTokenField } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { BackgroundColorControls } from '@components/inspector';

import { TAILWIND_UTILITIES } from '@/shared/constants/tailwind-utilities';

import { BlockAttributes } from '../types';

/**
 * Inspector controls
 * @param {Record<string, any>} props Component properties
 * @return {JSX.Element} Inspector controls
 */
const Inspector = ({
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributes;
	setAttributes: (newAttributes: Record<string, any>) => void;
}): JSX.Element => {
	return (
		<>
			<InspectorAdvancedControls>
				<FormTokenField
					label="Utility Classes"
					value={attributes.cn}
					suggestions={TAILWIND_UTILITIES}
					onChange={(tokens) => {
						setAttributes({
							cn: tokens,
						});
					}}
				/>
			</InspectorAdvancedControls>
			<InspectorControls group="styles">
				<BackgroundColorControls
					style={attributes.style}
					setAttributes={setAttributes}
				/>
			</InspectorControls>
		</>
	);
};

export default Inspector;
