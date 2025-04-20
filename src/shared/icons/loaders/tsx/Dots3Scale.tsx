/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const Dots3Scale = (props: SvgIconProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>
			{
				'@keyframes spinner_xe7Q{93.75%,to{r:3px}46.875%{r:.2px}}.spinner_b2T7{animation:spinner_xe7Q .8s linear infinite}'
			}
		</style>
		<circle cx={4} cy={12} r={3} className="spinner_b2T7" />
		<circle
			cx={12}
			cy={12}
			r={3}
			className="spinner_b2T7"
			style={{
				animationDelay: '-.65s',
			}}
		/>
		<circle
			cx={20}
			cy={12}
			r={3}
			className="spinner_b2T7"
			style={{
				animationDelay: '-.5s',
			}}
		/>
	</svg>
);
