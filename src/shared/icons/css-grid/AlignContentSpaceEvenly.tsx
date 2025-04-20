/**
 * Icon for align content space evenly
 * @param {SvgIcon} props Icon properties
 * @param {string} props.className Class name
 * @param {string} props.fill Fill color
 * @return {JSX.Element} SVG icon
 */
function AlignContentSpaceEvenly(props: SvgIconProps): JSX.Element {
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
				d="M49.794,117.541L145.265,117.541L145.265,154.072L49.794,154.072L49.794,117.541ZM49.794,41.388L145.265,41.388L145.265,77.919L49.794,77.919L49.794,41.388ZM0,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895ZM195.765,18.565L0,18.565L0,0L195.765,0L195.765,18.565Z"
				style={{
					fill: props.fill || 'currentColor',
				}}
			/>
		</svg>
	);
}
export { AlignContentSpaceEvenly };
