import { __ } from '@wordpress/i18n';
import { PanelColorSettings } from '@wordpress/block-editor';

/**
 * Wrapper for panelColorSettings
 * Block style must be defined in block attributes
 *
 * @param {Object} props Block props
 * @param {Object} props.attributes Gutenberg block attributes
 * @param {Function} props.setAttributes Gutenberg setAttributes function
 * @return {JSX.Element} InspectorControl Element
 */
const BackgroundColorControl = ({ attributes, setAttributes }) => {
	const { style } = attributes;

	const onChangeBackgroundColor = (currentStyles, newBackgroundColor) => {
		setAttributes({
			style: {
				...currentStyles,
				backgroundColor: newBackgroundColor,
			},
		});
	};

	return (
		<PanelColorSettings
			title={__('Color settings', 'kotisivu-block-theme')}
			initialOpen={false}
			colorSettings={[
				{
					value: style.backgroundColor,
					onChange: (newColor) =>
						onChangeBackgroundColor(style, newColor),
					label: __('Background color', 'kotisivu-block-theme'),
				},
			]}
		/>
	);
};

export { BackgroundColorControl };
