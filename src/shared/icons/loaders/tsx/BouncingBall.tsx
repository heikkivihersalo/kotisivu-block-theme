/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const BouncingBall = (props: CustomSVGProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>
			{
				'@keyframes spinner_YeBj{0%{animation-timing-function:cubic-bezier(.33,0,.66,.33);cy:5px}46.875%{cy:20px;rx:4px;ry:4px}50%{animation-timing-function:cubic-bezier(.33,.66,.66,1);cy:20.5px;rx:4.8px;ry:3px}53.125%{rx:4px;ry:4px}to{cy:5px}}'
			}
		</style>
		<circle
			cx={12}
			cy={5}
			r={4}
			style={{
				animation: 'spinner_YeBj .8s infinite',
			}}
		/>
	</svg>
);
