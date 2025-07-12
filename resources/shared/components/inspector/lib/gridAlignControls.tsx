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
import {
	AlignContentCenter,
	AlignContentSpaceAround,
	AlignContentSpaceBetween,
	AlignContentSpaceEvenly,
	AlignContentStretch,
	AlignItemsBaseline,
	AlignItemsCenter,
	AlignItemsEnd,
	AlignItemsStart,
	AlignItemsStretch,
	JustifyContentCenter,
	JustifyContentEnd,
	JustifyContentSpaceAround,
	JustifyContentSpaceBetween,
	JustifyContentSpaceEvenly,
	JustifyContentStart,
	JustifyItemsCenter,
	JustifyItemsEnd,
	JustifyItemsStart,
	JustifyItemsStretch,
} from '@/shared/icons';

/**
 * Types
 */
type GridAttribute =
	| 'alignContent'
	| 'alignItems'
	| 'justifyContent'
	| 'justifyItems';

type AlignContent =
	| 'center'
	| 'space-between'
	| 'space-around'
	| 'space-evenly'
	| 'stretch';

type AlignItems = 'center' | 'start' | 'end' | 'stretch' | 'baseline';

type JustifyContent =
	| 'center'
	| 'start'
	| 'end'
	| 'space-between'
	| 'space-around'
	| 'space-evenly';

type JustifyItems = 'center' | 'start' | 'end' | 'stretch';

type Props = {
	attributes: Record<string, any>;
	setAttributes: (newAttributes: Record<string, any>) => void;
};

/**
 * Controllers for grid aligment
 * Props style must be defined in block attributes
 * @param {Props} props Component props
 * @param {Object} props.attributes Gutenberg block attributes
 * @param {Function} props.setAttributes Gutenberg setAttributes function
 * @return {JSX.Element} InspectorControl Element
 */
const GridAlignControls = ({
	attributes,
	setAttributes,
}: Props): JSX.Element => {
	/**
	 * Change block alignment attribute value to new one
	 * @param {Record<string, any>} currentStyles block current styles
	 * @param {GridAttribute} key aligment style key
	 * @param {AlignContent | AlignItems | JustifyContent | JustifyItems} newValue new aligment value based on selected key
	 * @return {void}
	 */
	const onStyleChange = (
		currentStyles: Record<string, any>,
		key: GridAttribute,
		newValue: AlignContent | AlignItems | JustifyContent | JustifyItems
	) => {
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

	const currentStyleCSS = {
		opacity: 0.7,
		color: 'var(--wp--preset--color--black)',
	};

	return (
		<>
			<PanelBody title={__('Alignment Controls', 'kotisivu-block-theme')}>
				<p>
					Similar to browser dev tools, you can set the CSS properties
					for the grid container and items. This sets element to
					`display: grid;` and adds proper rules according to the
					settings below.
				</p>
				<PanelRow>
					<div className="editor-alignment-controls">
						<div>
							<p>
								align-content:{' '}
								<span style={currentStyleCSS}>
									{attributes.style?.alignContent}
								</span>
							</p>
							<ButtonGroup>
								<Button
									label="Add align-content: center"
									showTooltip={true}
									icon={<AlignContentCenter />}
									isPressed={
										attributes.style?.alignContent ===
										'center'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'alignContent',
											'center'
										)
									}
								/>
								<Button
									label="Add align-content: space-between"
									showTooltip={true}
									icon={<AlignContentSpaceBetween />}
									isPressed={
										attributes.style?.alignContent ===
										'space-between'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'alignContent',
											'space-between'
										)
									}
								/>
								<Button
									label="Add align-content: space-around"
									showTooltip={true}
									icon={<AlignContentSpaceAround />}
									isPressed={
										attributes.style?.alignContent ===
										'space-around'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'alignContent',
											'space-around'
										)
									}
								/>
								<Button
									label="Add align-content: space-evenly"
									showTooltip={true}
									icon={<AlignContentSpaceEvenly />}
									isPressed={
										attributes.style?.alignContent ===
										'space-evenly'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'alignContent',
											'space-evenly'
										)
									}
								/>
								<Button
									label="Add align-content: stretch"
									showTooltip={true}
									icon={<AlignContentStretch />}
									isPressed={
										attributes.style?.alignContent ===
										'stretch'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'alignContent',
											'stretch'
										)
									}
								/>
							</ButtonGroup>
						</div>
						<div>
							<p>
								justify-content:{' '}
								<span style={currentStyleCSS}>
									{attributes.style?.justifyContent}
								</span>
							</p>
							<ButtonGroup>
								<Button
									label="Add justify-content: center"
									showTooltip={true}
									icon={<JustifyContentCenter />}
									isPressed={
										attributes.style?.justifyContent ===
										'center'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'justifyContent',
											'center'
										)
									}
								/>
								<Button
									label="Add justify-content: start"
									showTooltip={true}
									icon={<JustifyContentStart />}
									isPressed={
										attributes.style?.justifyContent ===
										'start'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'justifyContent',
											'start'
										)
									}
								/>
								<Button
									label="Add justify-content: end"
									showTooltip={true}
									icon={<JustifyContentEnd />}
									isPressed={
										attributes.style?.justifyContent ===
										'end'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'justifyContent',
											'end'
										)
									}
								/>
								<Button
									label="Add justify-content: space-between"
									showTooltip={true}
									icon={<JustifyContentSpaceBetween />}
									isPressed={
										attributes.style?.justifyContent ===
										'space-between'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'justifyContent',
											'space-between'
										)
									}
								/>
								<Button
									label="Add justify-content: space-around"
									showTooltip={true}
									icon={<JustifyContentSpaceAround />}
									isPressed={
										attributes.style?.justifyContent ===
										'space-around'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'justifyContent',
											'space-around'
										)
									}
								/>
								<Button
									label="Add justify-content: space-evenly"
									showTooltip={true}
									icon={<JustifyContentSpaceEvenly />}
									isPressed={
										attributes.style?.justifyContent ===
										'space-evenly'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'justifyContent',
											'space-evenly'
										)
									}
								/>
							</ButtonGroup>
						</div>
						<div>
							<p>
								align-items:{' '}
								<span style={currentStyleCSS}>
									{attributes.style?.alignItems}
								</span>
							</p>
							<ButtonGroup>
								<Button
									label="Add align-items: center"
									showTooltip={true}
									icon={<AlignItemsCenter />}
									isPressed={
										attributes.style?.alignItems ===
										'center'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'alignItems',
											'center'
										)
									}
								/>
								<Button
									label="Add align-items: start"
									showTooltip={true}
									icon={<AlignItemsStart />}
									isPressed={
										attributes.style?.alignItems === 'start'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'alignItems',
											'start'
										)
									}
								/>
								<Button
									label="Add align-items: end"
									showTooltip={true}
									icon={<AlignItemsEnd />}
									isPressed={
										attributes.style?.alignItems === 'end'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'alignItems',
											'end'
										)
									}
								/>
								<Button
									label="Add align-items: stretch"
									showTooltip={true}
									icon={<AlignItemsStretch />}
									isPressed={
										attributes.style?.alignItems ===
										'stretch'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'alignItems',
											'stretch'
										)
									}
								/>
								<Button
									label="Add align-items: baseline"
									showTooltip={true}
									icon={<AlignItemsBaseline />}
									isPressed={
										attributes.style?.alignItems ===
										'baseline'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'alignItems',
											'baseline'
										)
									}
								/>
							</ButtonGroup>
						</div>
						<div>
							<p>
								justify-items:{' '}
								<span style={currentStyleCSS}>
									{attributes.style?.justifyItems}
								</span>
							</p>
							<ButtonGroup>
								<Button
									label="Add justify-items: center"
									showTooltip={true}
									icon={<JustifyItemsCenter />}
									isPressed={
										attributes.style?.justifyItems ===
										'center'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'justifyItems',
											'center'
										)
									}
								/>
								<Button
									label="Add justify-items: start"
									showTooltip={true}
									icon={<JustifyItemsStart />}
									isPressed={
										attributes.style?.justifyItems ===
										'start'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'justifyItems',
											'start'
										)
									}
								/>
								<Button
									label="Add justify-items: end"
									showTooltip={true}
									icon={<JustifyItemsEnd />}
									isPressed={
										attributes.style?.justifyItems === 'end'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'justifyItems',
											'end'
										)
									}
								/>
								<Button
									label="Add justify-items: stretch"
									showTooltip={true}
									icon={<JustifyItemsStretch />}
									isPressed={
										attributes.style?.justifyItems ===
										'stretch'
									}
									onClick={() =>
										onStyleChange(
											attributes.style,
											'justifyItems',
											'stretch'
										)
									}
								/>
							</ButtonGroup>
						</div>
					</div>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label={__('Reverse Order', 'kotisivu-block-theme')}
						checked={attributes.isReversed}
						onChange={() =>
							setAttributes({
								isReversed: !attributes.isReversed,
							})
						}
					/>
				</PanelRow>
			</PanelBody>
		</>
	);
};

export { GridAlignControls };
