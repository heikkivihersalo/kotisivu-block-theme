/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const PulseRings2 = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>
			{
				'@keyframes spinner_ZRWK{0%{transform:translate(12px,12px) scale(0);opacity:1}to{transform:translate(0,0) scale(1);opacity:0}}.spinner_ngNb{animation:spinner_ZRWK 1.2s cubic-bezier(.52,.6,.25,.99) infinite}'
			}
		</style>
		<path d="M12 12Zm0 0Z" className="spinner_ngNb" />
		<path
			d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 20a9 9 0 1 1 9-9 9 9 0 0 1-9 9Z"
			className="spinner_ngNb"
			style={{
				animationDelay: '.6s',
			}}
			transform="matrix(0 0 0 0 12 12)"
		/>
	</svg>
);
export { PulseRings2 };
