/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	PanelRow,
	Button,
	ButtonGroup,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { WidthFull, WidthContent, WidthNarrow } from '@icons';

/**
 * Controllers for block width
 * @param {Object} props Component props
 * @param {Object} props.attributes Gutenberg block attributes
 * @param {Function} props.setAttributes Gutenberg setAttributes function
 * @return {JSX.Element} InspectorControl Element
 */
const WidthControls = ({ attributes, setAttributes }) => {
	const FULL_WIDTH = 'var(--wp--custom--wide-size)';
	const CONTENT_WIDTH = 'var(--wp--custom--content-size)';
	const NARROW_WIDTH = 'var(--wp--custom--narrow-size)';

	/** @typedef {'width' | 'height'} SizeKey */
	/** @typedef {'var(--wp--custom--wide-size)' | 'var(--wp--custom--content-size)' | 'var(--wp--custom--narrow-size)' | '100%'} SizeValue */
	/**
	 * Change block alignment attribute value to new one
	 * @param {Object} currentStyles block current styles
	 * @param {SizeKey} key aligment style key
	 * @param {SizeValue} newValue new aligment value based on selected key
	 * @return {void}
	 */
	const onStyleChange = (currentStyles, key, newValue) => {
		if (newValue === currentStyles?.[key]) {
			setAttributes({
				style: {
					...currentStyles,
					[key]: undefined,
				},
			});
		} else {
			setAttributes({
				style: {
					...currentStyles,
					[key]: newValue,
				},
			});
		}
	};

	return (
		<>
			<PanelBody title={__('Width Controls', 'kotisivu-block-theme')}>
				<PanelRow>
					<div className="editor-width-controls">
						<p>
							width:{' '}
							<span
								style={{
									opacity: 0.7,
									color: 'var(--wp--preset--color--black)',
								}}
							>
								{attributes.style?.width}
							</span>
						</p>
						<ButtonGroup>
							<Button
								label="Set width as full"
								showTooltip="true"
								icon={<WidthFull />}
								isPressed={
									attributes.style?.width === FULL_WIDTH
								}
								onClick={() =>
									onStyleChange(
										attributes.style,
										'width',
										FULL_WIDTH
									)
								}
							/>
							<Button
								label="Set width as content"
								showTooltip="true"
								icon={<WidthContent />}
								isPressed={
									attributes.style?.width === CONTENT_WIDTH
								}
								onClick={() =>
									onStyleChange(
										attributes.style,
										'width',
										CONTENT_WIDTH
									)
								}
							/>
							<Button
								label="Set width as narrow"
								showTooltip="true"
								icon={<WidthNarrow />}
								isPressed={
									attributes.style?.width === NARROW_WIDTH
								}
								onClick={() =>
									onStyleChange(
										attributes.style,
										'width',
										NARROW_WIDTH
									)
								}
							/>
						</ButtonGroup>
					</div>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label="Set as 100% height"
						checked={attributes.style?.height === '100%'}
						onChange={() =>
							onStyleChange(attributes.style, 'height', '100%')
						}
					/>
				</PanelRow>
			</PanelBody>
		</>
	);
};

export { WidthControls };
