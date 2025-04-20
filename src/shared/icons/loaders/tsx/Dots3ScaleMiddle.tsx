/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const Dots3ScaleMiddle = (props: SvgIconProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>
			{
				'@keyframes spinner_qhi1{0%,to{r:1.5px}50%{r:3px}}.spinner_I8Q1{animation:spinner_qhi1 .75s linear infinite}'
			}
		</style>
		<circle cx={4} cy={12} r={1.5} className="spinner_I8Q1" />
		<circle
			cx={12}
			cy={12}
			r={3}
			className="spinner_I8Q1"
			style={{
				animationDelay: '-.375s',
			}}
		/>
		<circle cx={20} cy={12} r={1.5} className="spinner_I8Q1" />
	</svg>
);
