/**
 * Icon for justify content space evenly
 * @param {SvgIcon} props Icon properties
 * @param {string} props.className Class name
 * @param {string} props.fill Fill color
 * @return {JSX.Element} SVG icon
 */
function JustifyContentSpaceEvenly(props: SvgIconProps): JSX.Element {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlSpace="preserve"
			style={{
				fillRule: 'evenodd',
				clipRule: 'evenodd',
				strokeLinejoin: 'round',
				strokeMiterlimit: 2,
			}}
			viewBox="0 0 196 196"
			className={props.className || undefined}
		>
			<path
				d="M18.565,0L18.565,195.765L0,195.765L0,0L18.565,0ZM176.895,195.765L176.895,0L195.459,0L195.459,195.765L176.895,195.765ZM77.919,49.794L77.919,145.265L41.388,145.265L41.388,49.794L77.919,49.794ZM154.072,49.794L154.072,145.265L117.541,145.265L117.541,49.794L154.072,49.794Z"
				style={{
					fill: props.fill || 'currentColor',
				}}
			/>
		</svg>
	);
}
export { JustifyContentSpaceEvenly };
