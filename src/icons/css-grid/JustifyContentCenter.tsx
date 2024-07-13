import type { SvgIcon } from '@icons';

/**
 * Icon for justify content center
 * @param {SVGProps<SVGSVGElement>} props
 * @return {JSX.Element}
 */
function JustifyContentCenter({ className, fill }: SvgIcon): JSX.Element {
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
			viewBox="-32 0 196 196"
			className={className || undefined}
		>
			<path
				d="M36.531,50.147L36.531,145.618L0,145.618L0,50.147L36.531,50.147ZM122.531,50.147L122.531,145.618L86,145.618L86,50.147L122.531,50.147ZM51.983,195.765L51.983,0L70.548,0L70.548,195.765L51.983,195.765Z"
				style={{
					fill: fill || 'currentColor',
				}}
			/>
		</svg>
	);
}
export { JustifyContentCenter };
