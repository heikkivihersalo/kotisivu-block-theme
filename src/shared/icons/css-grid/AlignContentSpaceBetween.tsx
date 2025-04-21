/**
 * Icon for align content space between
 * @param {SvgIcon} props Icon properties
 * @param {string} props.className Class name
 * @param {string} props.fill Fill color
 * @return {JSX.Element} SVG icon
 */
function AlignContentSpaceBetween(props: CustomSVGProps): JSX.Element {
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
				d="M143,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895L47.53,176.895L47.53,140.428L143,140.428L143,176.895ZM47.53,18.565L0,18.565L0,0L195.765,0L195.765,18.565L143,18.565L143,54.991L47.53,54.991L47.53,18.565Z"
				style={{
					fill: props.fill || 'currentColor',
				}}
			/>
		</svg>
	);
}
export { AlignContentSpaceBetween };
