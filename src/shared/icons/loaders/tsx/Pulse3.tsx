/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const Pulse3 = (props: CustomSVGProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>
			{
				'@keyframes spinner_vXu6{0%{r:0;opacity:1}to{r:11px;opacity:0}}.spinner_VpEe{animation:spinner_vXu6 1.2s cubic-bezier(.52,.6,.25,.99) infinite}'
			}
		</style>
	</svg>
);
