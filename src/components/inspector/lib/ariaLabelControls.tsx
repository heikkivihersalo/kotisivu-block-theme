/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl, PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import type { AriaLabelControlsProps } from '@components/inspector';

/**
 * Controllers for aria-label and aria-labelledby
 * Props ariaLabel and ariaLabelledBy must be defined in block attributes
 * @param {AriaLabelControlsProps} props Component props
 * @param {Object} props.attributes Gutenberg block attributes
 * @param {Function} props.setAttributes Gutenberg setAttributes function
 * @return {JSX.Element} InspectorControl Element
 */
const AriaLabelControls = ({
	attributes,
	setAttributes,
}: AriaLabelControlsProps): JSX.Element => {
	/**
	 * Render
	 */
	return (
		<>
			<PanelBody
				title={__('Accessibility', 'kotisivu-block-theme')}
				initialOpen={false}
			>
				<TextControl
					label={__('Aria Labelled By', 'kotisivu-block-theme')}
					help={__(
						'Identifies the element (or elements) that labels the element it is applied to. Use the same ID as in the section heading.',
						'kotisivu-block-theme'
					)}
					value={attributes.ariaLabelledBy}
					onChange={(newAriaLabelledBy) =>
						setAttributes({ ariaLabelledBy: newAriaLabelledBy })
					}
				/>
				<TextControl
					label={__('Aria label', 'kotisivu-block-theme')}
					help={__(
						'If section heading doesn`t match correct description, you can use aria-label. IMPORTANT! Use aria-labelledby by default.',
						'kotisivu-block-theme'
					)}
					value={attributes.ariaLabel}
					onChange={(newAriaLabel) =>
						setAttributes({ ariaLabel: newAriaLabel })
					}
				/>
			</PanelBody>
		</>
	);
};

export { AriaLabelControls };
