/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const BarsScaleFade = (props: SvgIconProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>
			{
				'@keyframes spinner_vc4H{0%{y:1px;height:22px}93.75%{y:5px;height:14px;opacity:.2}}.spinner_hzlK{animation:spinner_vc4H .8s linear infinite;animation-delay:-.8s}'
			}
		</style>
		<path d="M1 1h6v22H1z" className="spinner_hzlK" />
		<path
			d="M9 1h6v22H9z"
			className="spinner_hzlK"
			style={{
				animationDelay: '-.65s',
			}}
		/>
		<path
			d="M17 1h6v22h-6z"
			className="spinner_hzlK"
			style={{
				animationDelay: '-.5s',
			}}
		/>
	</svg>
);
