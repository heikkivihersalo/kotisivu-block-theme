import type { SvgIcon } from '@icons';

/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const Dots3Fade = (props: Pick<SvgIcon, 'className'>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>
			{
				'@keyframes spinner_MGfb{93.75%,to{opacity:.2}}.spinner_S1WN{animation:spinner_MGfb .8s linear infinite;animation-delay:-.8s}'
			}
		</style>
		<circle cx={4} cy={12} r={3} className="spinner_S1WN" />
		<circle
			cx={12}
			cy={12}
			r={3}
			className="spinner_S1WN"
			style={{
				animationDelay: '-.65s',
			}}
		/>
		<circle
			cx={20}
			cy={12}
			r={3}
			className="spinner_S1WN"
			style={{
				animationDelay: '-.5s',
			}}
		/>
	</svg>
);
export { Dots3Fade };
