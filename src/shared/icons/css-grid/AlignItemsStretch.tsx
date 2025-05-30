/**
 * Icon for align items stretch
 * @param {SvgIcon} props Icon properties
 * @param {string} props.className Class name
 * @param {string} props.fill Fill color
 * @return {JSX.Element} SVG icon
 */
function AlignItemsStretch(props: CustomSVGProps): JSX.Element {
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
			viewBox="0 0 33 33"
			className={props.className || undefined}
		>
			<path
				d="M244.97 121.785v20.061h-6v-20.061h6Zm9.984 0v20.061h-6v-20.061h6Zm8.08-2.968h-32.036v-3.037h32.036v3.037Zm0 29.034h-32.036v-3.037h32.036v3.037Z"
				style={{
					fill: props.fill || 'currentColor',
				}}
				transform="translate(-230.998 -115.78)"
			/>
		</svg>
	);
}
export { AlignItemsStretch };
