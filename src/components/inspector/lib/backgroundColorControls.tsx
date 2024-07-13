/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelColorSettings } from '@wordpress/block-editor';

/**
 * Types
 */
import type { BackgroundColorControlsProps } from '@components/inspector';

/**
 * Wrapper for panelColorSettings
 * Block style must be defined in block attributes
 * @param {BackgroundColorControlsProps} props Block props
 * @param {Record<string, any>} props.style Block style
 * @param {Function} props.setAttributes Gutenberg setAttributes function
 * @return {JSX.Element} InspectorControl Element
 */
const BackgroundColorControls = ({
	style,
	setAttributes,
}: BackgroundColorControlsProps): JSX.Element => {
	/**
	 * Change background color
	 * @param {Record<string, any>} currentStyles Current styles
	 * @param {string|undefined} newBackgroundColor New background color
	 * @return {void}
	 */
	const setBackgroundColor = (
		currentStyles: Record<string, any>,
		newBackgroundColor: string | undefined
	): void => {
		setAttributes({
			style: {
				...currentStyles,
				backgroundColor: newBackgroundColor,
			},
		});
	};

	/**
	 * Render
	 */
	return (
		<PanelColorSettings
			title={__('Color settings', 'kotisivu-block-theme')}
			initialOpen={false}
			colorSettings={[
				{
					value: style.backgroundColor,
					onChange: (newColor) => setBackgroundColor(style, newColor),
					label: __('Background color', 'kotisivu-block-theme'),
				},
			]}
		/>
	);
};

export { BackgroundColorControls };
