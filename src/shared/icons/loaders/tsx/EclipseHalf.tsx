/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const EclipseHalf = (props: SvgIconProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>{'@keyframes spinner_xeMo{to{transform:rotate(360deg)}}'}</style>
		<path
			d="M2 12a10.94 10.94 0 0 1 3-7.35c-.21-.19-.42-.36-.62-.55A11 11 0 0 0 12 23c.34 0 .67 0 1-.05C6 23 2 17.74 2 12Z"
			style={{
				transformOrigin: 'center',
				animation: 'spinner_xeMo .6s linear infinite',
			}}
		/>
	</svg>
);
