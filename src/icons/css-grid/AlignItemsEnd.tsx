import type { SvgIcon } from '@icons';

/**
 * Icon for align items end
 * @param {SvgIcon} props Icon properties
 * @param {string} props.className Class name
 * @param {string} props.fill Fill color
 * @return {JSX.Element} SVG icon
 */
function AlignItemsEnd({ className, fill }: SvgIcon): JSX.Element {
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
			viewBox="0 0 33 29"
			className={className || undefined}
		>
			<path
				d="M197.001 119.761v22.085h-6v-22.085h6Zm18.012 28.09h-32.036v-3.037h32.036v3.037Zm-8.026-20.043v14.038h-6v-14.038h6Z"
				style={{
					fill: fill || 'currentColor',
				}}
				transform="translate(-182.977 -119.761)"
			/>
		</svg>
	);
}
export { AlignItemsEnd };
