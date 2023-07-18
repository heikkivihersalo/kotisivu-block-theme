/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { createHigherOrderComponent } from "@wordpress/compose";
import { RangeControl, Button, PanelBody } from '@wordpress/components';

const CustomInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const {
			attributes: { style },
			setAttributes,
			name,
		} = props;

		if (name !== 'core/paragraph') {
			return <BlockEdit {...props} />;
		}

		const getNumberFromString = (string) => {
			if (!string) {
				return undefined;
			}

			return parseInt(string.replace(/\D/g, ''));
		};

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__('Miscellaneous', 'kotisivu-block-theme')} initialOpen={false}>
						<div className="editor-max-width-controls">
							<RangeControl
								label="Max Width"
								value={getNumberFromString(style?.maxWidth)}
								onChange={(value) => setAttributes({ style: { ...style, maxWidth: value + 'ch' } })}
								min={20}
								max={200}
							/>
							<Button variant="link" size="small" onClick={() => setAttributes({ style: { ...style, maxWidth: undefined } })}>
								{__('Reset', 'kotisivu-block-theme')}
							</Button>
						</div>
					</PanelBody>
				</InspectorControls>
			</>
		)
	};
}, "CustomInspectorControls");

export { CustomInspectorControls };
