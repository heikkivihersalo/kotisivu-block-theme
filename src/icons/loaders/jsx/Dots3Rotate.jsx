/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const Dots3Rotate = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>
			{
				'@keyframes spinner_XVY9{50%{transform:rotate(180deg)}to{transform:rotate(360deg)}}'
			}
		</style>
		<circle cx={12} cy={12} r={3} />
		<g
			style={{
				transformOrigin: 'center',
				animation:
					'spinner_XVY9 1s cubic-bezier(.36,.6,.31,1) infinite',
			}}
		>
			<circle cx={4} cy={12} r={3} />
			<circle cx={20} cy={12} r={3} />
		</g>
	</svg>
);
export { Dots3Rotate };
