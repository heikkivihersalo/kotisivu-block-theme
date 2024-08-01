/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const Dots3Bounce = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>
			{
				'@keyframes spinner_8HQG{0%,57.14%{animation-timing-function:cubic-bezier(.33,.66,.66,1);transform:translate(0)}28.57%{animation-timing-function:cubic-bezier(.33,0,.66,.33);transform:translateY(-6px)}to{transform:translate(0)}}.spinner_qM83{animation:spinner_8HQG 1.05s infinite}'
			}
		</style>
		<circle cx={4} cy={12} r={3} className="spinner_qM83" />
		<circle
			cx={12}
			cy={12}
			r={3}
			className="spinner_qM83"
			style={{
				animationDelay: '.1s',
			}}
		/>
		<circle
			cx={20}
			cy={12}
			r={3}
			className="spinner_qM83"
			style={{
				animationDelay: '.2s',
			}}
		/>
	</svg>
);
export { Dots3Bounce };
