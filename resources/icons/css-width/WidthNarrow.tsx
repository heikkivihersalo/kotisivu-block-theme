import type { SvgIcon } from '@icons';

/**
 * Icon for narrow width
 * @param {SvgIcon} props Icon properties
 * @param {string} props.className Class name
 * @param {string} props.fill Fill color
 * @return {JSX.Element} SVG icon
 */
function WidthNarrow({ className, fill }: SvgIcon): JSX.Element {
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
				viewBox="0 -35 198 198"
				className={className || undefined}
			>
				<path
					d="M197.019,45.913L197.019,85.913L0,85.913L0,45.913L197.019,45.913ZM168.962,103.942L168.962,131.826L28.058,131.826L28.058,103.942L168.962,103.942ZM168.962,0L168.962,27.884L28.058,27.884L28.058,0L168.962,0Z"
					style={{
						fill: fill || 'currentColor',
					}}
				/>
			</svg>
		</>
	);
}

export { WidthNarrow };
