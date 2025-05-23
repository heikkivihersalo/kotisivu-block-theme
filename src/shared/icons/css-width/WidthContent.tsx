/**
 * Icon for content width
 * @param {SvgIcon} props Icon properties
 * @param {string} props.className Class name
 * @param {string} props.fill Fill color
 * @return {JSX.Element} SVG icon
 */
export const WidthContent = (props: CustomSVGProps): JSX.Element => {
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlSpace="preserve"
				style={{
					fillRule: 'evenodd',
					clipRule: 'evenodd',
					strokeLinejoin: 'round',
					strokeMiterlimit: 2,
				}}
				viewBox="0 0 198 198"
				className={props.className || undefined}
			>
				<path
					d="M197.019,53.942L197.019,137.827L-0,137.827L-0,53.942L197.019,53.942ZM168.962,166.058L168.962,193.942L28.058,193.942L28.058,166.058L168.962,166.058ZM168.962,0L168.962,27.884L28.058,27.884L28.058,0L168.962,0Z"
					style={{
						fill: props.fill || 'currentColor',
					}}
				/>
			</svg>
		</>
	);
};
