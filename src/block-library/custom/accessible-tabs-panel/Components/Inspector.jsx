/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';

import { PanelBody, PanelRow, TextControl } from '@wordpress/components';

/**
 * Block inspector component
 * @param {Object} props - block props
 * @return {Object} - React component
 */
export default function Inspector(props) {
	const {
		attributes: { panelId },
		setAttributes,
	} = props;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Panel Settings')}>
					<PanelRow>
						<TextControl
							label={__('ID')}
							help={__(
								'Numeric ID of the panel. The panel ID must be unique and match tab ID.',
								'kotisivu-block-theme'
							)}
							value={panelId}
							onChange={(id) => {
								setAttributes({ panelId: id });
							}}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
