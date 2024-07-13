import type { SvgIcon } from '@icons';

/**
 * Icon for full width
 * @param {SvgIcon} props Icon properties
 * @param {string} props.className Class name
 * @param {string} props.fill Fill color
 * @return {JSX.Element}
 */
function WidthFull({ className, fill }: SvgIcon): JSX.Element {
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
				className={className || undefined}
			>
				<path
					d="M197.019,0L197.019,140.114L-0,140.114L-0,0L197.019,0ZM168.962,168.345L168.962,196.229L28.058,196.229L28.058,168.345L168.962,168.345Z"
					style={{
						fill: fill || 'currentColor',
					}}
				/>
			</svg>
		</>
	);
}

export { WidthFull };
