import type { SvgIcon } from '@icons';

/**
 * Icon for justify items stretch
 * @param {SVGProps<SVGSVGElement>} props
 * @return {JSX.Element}
 */
function JustifyItemsStretch({ className, fill }: SvgIcon): JSX.Element {
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
			viewBox="0 0 32 33"
			className={className || undefined}
		>
			<path
				d="M234.04 231.729h10.967v6H234.04v8.063h10.967v6H234.04v5.997h-3.038v-32.036h3.038v5.976Zm25.91 6h-10.994v-6h10.994v-5.976h3.038v32.036h-3.038v-5.997h-10.994v-6h10.994v-8.063Z"
				style={{
					fill: fill || 'currentColor',
				}}
				transform="translate(-231.002 -225.753)"
			/>
		</svg>
	);
}
export { JustifyItemsStretch };
