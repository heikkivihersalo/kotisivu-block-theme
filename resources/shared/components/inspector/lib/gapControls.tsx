/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	convertValueToSpacingVariable,
	convertVariableToValue,
} from '../utils';

type Props = {
	attributes: Record<string, any>;
	setAttributes: (newAttributes: Record<string, any>) => void;
};

const marks = [
	{
		value: 1,
		label: '20',
	},
	{
		value: 2,
		label: '30',
	},
	{
		value: 3,
		label: '40',
	},
	{
		value: 4,
		label: '50',
	},
	{
		value: 5,
		label: '60',
	},
	{
		value: 6,
		label: '70',
	},
	{
		value: 7,
		label: '80',
	},
	{
		value: 8,
		label: '90',
	},
];

/**
 * Controllers for gap
 *
 * @param {Props} props Block props
 * @param {Object} props.attributes Gutenberg block attributes
 * @param {Function} props.setAttributes Gutenberg setAttributes function
 * @return {JSX.Element} InspectorControl Element
 */
const GapControls = ({ attributes, setAttributes }: Props): JSX.Element => {
	/**
	 * Change block alignment attribute value to new one
	 * @param  {Record<string, any>} currentStyles block current styles
	 * @param  {string} key style key to change (e.g. 'gap')
	 * @param  {number} value new value to set
	 * @return {void}
	 */
	const onStyleChange = (
		currentStyles: Record<string, any>,
		key: string,
		value: number | undefined
	): void => {
		const newValue = convertValueToSpacingVariable(value, marks);

		if (newValue === currentStyles?.[key]) {
			setAttributes({
				style: {
					...currentStyles,
					[key]: undefined,
				},
			});

			return;
		}

		setAttributes({
			style: {
				...currentStyles,
				[key]: newValue,
			},
		});
	};

	return (
		<>
			<PanelBody title={__('Gap Controls', 'kotisivu-block-theme')}>
				<div className="editor-gap-controls">
					<RangeControl
						allowReset
						withInputField={false}
						label={__('Gap', 'kotisivu-block-theme')}
						value={convertVariableToValue(
							attributes.style?.gap,
							marks
						)}
						marks={marks}
						onChange={(newValue) =>
							onStyleChange(attributes.style, 'gap', newValue)
						}
						min={1}
						max={8}
					/>
				</div>
			</PanelBody>
		</>
	);
};

export { GapControls };
