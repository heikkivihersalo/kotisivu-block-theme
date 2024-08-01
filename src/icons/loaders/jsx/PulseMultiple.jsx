/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const PulseMultiple = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>
			{
				'@keyframes spinner_mnRT{0%{r:0;opacity:1}75%,to{r:11px;opacity:0}}.spinner_98HH{animation:spinner_mnRT 1.6s cubic-bezier(.52,.6,.25,.99) infinite}'
			}
		</style>
	</svg>
);
export { PulseMultiple };
