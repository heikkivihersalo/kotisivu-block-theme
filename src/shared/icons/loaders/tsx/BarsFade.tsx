/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const BarsFade = (props: CustomSVGProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>
			{
				'@keyframes spinner_Ctle{93.75%,to{opacity:.2}}.spinner_GmWz{animation:spinner_Ctle .8s linear infinite;animation-delay:-.8s}'
			}
		</style>
		<path d="M1 4h6v14H1z" className="spinner_GmWz" />
		<path
			d="M9 4h6v14H9z"
			className="spinner_GmWz"
			style={{
				animationDelay: '-.65s',
			}}
		/>
		<path
			d="M17 4h6v14h-6z"
			className="spinner_GmWz"
			style={{
				animationDelay: '-.5s',
			}}
		/>
	</svg>
);
