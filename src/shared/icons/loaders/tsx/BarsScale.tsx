/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const BarsScale = (props: SvgIconProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>
			{
				'@keyframes spinner_B8Vq{0%,66.66%{animation-timing-function:cubic-bezier(.36,.61,.3,.98);y:6px;height:12px}33.33%{animation-timing-function:cubic-bezier(.36,.61,.3,.98);y:1px;height:22px}}.spinner_jCIR{animation:spinner_B8Vq .9s linear infinite;animation-delay:-.9s}'
			}
		</style>
		<path d="M1 6h2.8v12H1z" className="spinner_jCIR" />
		<path
			d="M5.8 6h2.8v12H5.8z"
			className="spinner_jCIR"
			style={{
				animationDelay: '-.8s',
			}}
		/>
		<path
			d="M10.6 6h2.8v12h-2.8z"
			className="spinner_jCIR"
			style={{
				animationDelay: '-.7s',
			}}
		/>
		<path
			d="M15.4 6h2.8v12h-2.8z"
			className="spinner_jCIR"
			style={{
				animationDelay: '-.6s',
			}}
		/>
		<path
			d="M20.2 6H23v12h-2.8z"
			className="spinner_jCIR"
			style={{
				animationDelay: '-.5s',
			}}
		/>
	</svg>
);
