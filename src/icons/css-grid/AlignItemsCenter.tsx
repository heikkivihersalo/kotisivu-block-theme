import type { SvgIcon } from '@icons';

/**
 * Icon for align items center
 * @param {SVGProps<SVGSVGElement>} props
 * @return {JSX.Element}
 */
function AlignItemsCenter({ className, fill }: SvgIcon): JSX.Element {
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
				d="M94.948 130.392v-12.654h6v12.654h6.079v-6.58h6v6.58h5.993v3.038h-5.993v6.58h-6v-6.58h-6.079v12.654h-6V133.43h-7.964v-3.038h7.964Z"
				style={{
					fill: fill || 'currentColor',
				}}
				transform="translate(-86.984 -117.738)"
			/>
		</svg>
	);
}
export { AlignItemsCenter };
