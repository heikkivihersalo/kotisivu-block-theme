/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const GooeyBalls1 = (props: CustomSVGProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>
			{
				'@keyframes spinner_OeFQ{0%{cx:4px;r:3px}50%{cx:9px;r:8px}}@keyframes spinner_ZEPt{0%{cx:15px;r:8px}50%{cx:20px;r:3px}}'
			}
		</style>
		<defs>
			<filter id="spinner-gF00">
				<feGaussianBlur
					in="SourceGraphic"
					result="y"
					stdDeviation={1.5}
				/>
				<feColorMatrix
					in="y"
					result="z"
					values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
				/>
				<feBlend in="SourceGraphic" in2="z" />
			</filter>
		</defs>
		<g filter="url(#spinner-gF00)">
			<circle
				cx={4}
				cy={12}
				r={3}
				style={{
					animation:
						'spinner_OeFQ .75s cubic-bezier(.56,.52,.17,.98) infinite',
				}}
			/>
			<circle
				cx={15}
				cy={12}
				r={8}
				style={{
					animation:
						'spinner_ZEPt .75s cubic-bezier(.56,.52,.17,.98) infinite',
				}}
			/>
		</g>
	</svg>
);
