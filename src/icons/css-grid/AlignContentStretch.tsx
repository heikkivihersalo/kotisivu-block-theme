import type { SvgIcon } from '@icons';

/**
 * Icon for align content stretch
 * @param {SVGProps<SVGSVGElement>} props
 * @return {JSX.Element}
 */
function AlignContentStretch({ className, fill }: SvgIcon): JSX.Element {
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
			className={className || undefined}
		>
			<path
				d="M47.412,18.565L0,18.565L0,0L195.765,0L195.765,18.565L142.883,18.565L142.883,82.002L47.412,82.002L47.412,18.565ZM142.883,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895L47.412,176.895L47.412,113.459L142.883,113.459L142.883,176.895Z"
				style={{
					fill: fill || 'currentColor',
				}}
			/>
		</svg>
	);
}
export { AlignContentStretch };
