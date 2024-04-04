/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelRow, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { addModifiers } from '@utils';

/**
 * Controllers for background image
 *
 * @param {Object} props Block props
 * @return {JSX.Element} InspectorControl Element
 */
const BackgroundImage = (props) => {
	const {
		attributes: { modifiers, hasBackgroundImage },
	} = props;

	return (
		<>
			<PanelRow>
				<ToggleControl
					label={__('Use Background Image', 'kotisivu-theme-blocks')}
					checked={hasBackgroundImage}
					onChange={addModifiers(
						props,
						'hasBackgroundImage',
						hasBackgroundImage,
						'has-image',
						'modifiers',
						modifiers
					)}
				/>
			</PanelRow>
		</>
	);
};

export { BackgroundImage };
