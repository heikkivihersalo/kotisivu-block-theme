/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const Clock = (props: SvgIconProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>
			{
				'@keyframes spinner_ZpfF{to{transform:rotate(360deg)}}.spinner_d9Sa{transform-origin:center}'
			}
		</style>
		<path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 20a9 9 0 1 1 9-9 9 9 0 0 1-9 9Z" />
		<rect
			width={2}
			height={7}
			x={11}
			y={6}
			className="spinner_d9Sa"
			rx={1}
			style={{
				animation: 'spinner_ZpfF 9s linear infinite',
			}}
		/>
		<rect
			width={2}
			height={9}
			x={11}
			y={11}
			className="spinner_d9Sa"
			rx={1}
			style={{
				animation: 'spinner_ZpfF .75s linear infinite',
			}}
		/>
	</svg>
);
