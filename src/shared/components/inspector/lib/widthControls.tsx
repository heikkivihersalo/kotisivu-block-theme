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
import { WidthFull, WidthContent, WidthNarrow } from '@/shared/icons';

const width = {
	full: 'var(--wp--custom--wide-size)',
	content: 'var(--wp--custom--content-size)',
	narrow: 'var(--wp--custom--narrow-size)',
} as const;

type SizeKey = 'width' | 'height';
type SizeValue =
	| 'var(--wp--custom--wide-size)'
	| 'var(--wp--custom--content-size)'
	| 'var(--wp--custom--narrow-size)'
	| '100%';

type Props = {
	style: Record<string, any>;
	setAttributes: (newAttributes: Record<string, any>) => void;
};

/**
 * Controllers for block width
 * Props style must be defined in block attributes
 * @param {Props} props Component props
 * @param {Object} props.style Block style
 * @param {Function} props.setAttributes Gutenberg setAttributes function
 * @return {JSX.Element} InspectorControl Element
 */
const WidthControls = ({ style, setAttributes }: Props): JSX.Element => {
	/**
	 * Change block alignment attribute value to new one
	 * @param {Record<string, any>} currentStyles block current styles
	 * @param {SizeKey} key aligment style key
	 * @param {SizeValue} newValue new aligment value based on selected key
	 * @return {void}
	 */
	const onStyleChange = (
		currentStyles: Record<string, string>,
		key: 'width' | 'height',
		newValue:
			| 'var(--wp--custom--wide-size)'
			| 'var(--wp--custom--content-size)'
			| 'var(--wp--custom--narrow-size)'
			| '100%'
	): void => {
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
								{style?.width}
							</span>
						</p>
						<ButtonGroup>
							<Button
								label="Set width as full"
								showTooltip={true}
								icon={<WidthFull />}
								isPressed={style?.width === width.full}
								onClick={() =>
									onStyleChange(style, 'width', width.full)
								}
							/>
							<Button
								label="Set width as content"
								showTooltip={true}
								icon={<WidthContent />}
								isPressed={style?.width === width.content}
								onClick={() =>
									onStyleChange(style, 'width', width.content)
								}
							/>
							<Button
								label="Set width as narrow"
								showTooltip={true}
								icon={<WidthNarrow />}
								isPressed={style?.width === width.narrow}
								onClick={() =>
									onStyleChange(style, 'width', width.narrow)
								}
							/>
						</ButtonGroup>
					</div>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label="Set as 100% height"
						checked={style?.height === '100%'}
						onChange={() => onStyleChange(style, 'height', '100%')}
					/>
				</PanelRow>
			</PanelBody>
		</>
	);
};

export { WidthControls };
