/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const Dots3Move = (props: SvgIconProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>
			{
				'@keyframes spinner_qtyZ{0%{r:0}25%{r:3px;cx:4px}50%{r:3px;cx:12px}75%{r:3px;cx:20px}to{r:0;cx:20px}}.spinner_nOfF{animation:spinner_qtyZ 2s cubic-bezier(.36,.6,.31,1) infinite}'
			}
		</style>
		<circle cx={4} cy={12} r={3} className="spinner_nOfF" />
		<circle
			cx={4}
			cy={12}
			r={3}
			className="spinner_nOfF"
			style={{
				animationDelay: '-.5s',
			}}
		/>
		<circle
			cx={4}
			cy={12}
			r={3}
			className="spinner_nOfF"
			style={{
				animationDelay: '-1s',
			}}
		/>
		<circle
			cx={4}
			cy={12}
			r={3}
			className="spinner_nOfF"
			style={{
				animationDelay: '-1.5s',
			}}
		/>
	</svg>
);
