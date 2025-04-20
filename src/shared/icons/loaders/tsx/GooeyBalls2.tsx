/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const GooeyBalls2 = (props: SvgIconProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>
			{
				'@keyframes spinner_0zVw{0%{animation-timing-function:cubic-bezier(.36,.62,.43,.99);cx:5px}50%{animation-timing-function:cubic-bezier(.79,0,.58,.57);cx:8px}}@keyframes spinner_Aojx{0%{animation-timing-function:cubic-bezier(.36,.62,.43,.99);cx:19px}50%{animation-timing-function:cubic-bezier(.79,0,.58,.57);cx:16px}}@keyframes spinner_xygp{to{transform:rotate(360deg)}}'
			}
		</style>
		<defs>
			<filter id="spinner-gF01">
				<feGaussianBlur
					in="SourceGraphic"
					result="y"
					stdDeviation={1}
				/>
				<feColorMatrix
					in="y"
					result="z"
					values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
				/>
				<feBlend in="SourceGraphic" in2="z" />
			</filter>
		</defs>
		<g
			filter="url(#spinner-gF01)"
			style={{
				transformOrigin: 'center',
				animation: 'spinner_xygp .75s linear infinite',
			}}
		>
			<circle
				cx={5}
				cy={12}
				r={4}
				style={{
					animation: 'spinner_0zVw 2s infinite',
				}}
			/>
			<circle
				cx={19}
				cy={12}
				r={4}
				style={{
					animation: 'spinner_Aojx 2s infinite',
				}}
			/>
		</g>
	</svg>
);
