import type { SvgIcon } from '@icons';

/**
 * Icon for align items baseline
 * @param {SvgIcon} props Icon properties
 * @param {string} props.className Class name
 * @param {string} props.fill Fill color
 * @return {JSX.Element}
 */
function AlignItemsBaseline({ className, fill }: SvgIcon): JSX.Element {
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
			viewBox="0 0 34 29"
			className={className || undefined}
		>
			<path
				d="M312 147.726h-34v-3.452h34v3.452Zm-6.591-7.716h-4.557l-1.812-4.712h-8.293l-1.712 4.712h-4.444l8.081-20.746h4.43l8.307 20.746Zm-7.713-8.208-2.859-7.698-2.802 7.698h5.661Z"
				style={{
					fill: fill || 'currentColor',
				}}
				transform="translate(-278 -119.264)"
			/>
		</svg>
	);
}
export { AlignItemsBaseline };
