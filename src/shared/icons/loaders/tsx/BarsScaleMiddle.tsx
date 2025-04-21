/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const BarsScaleMiddle = (props: CustomSVGProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>
			{
				'@keyframes spinner_3l8F{0%,66.66%{animation-timing-function:cubic-bezier(.14,.73,.34,1);y:6px;height:12px}33.33%{animation-timing-function:cubic-bezier(.65,.26,.82,.45);y:1px;height:22px}}.spinner_7uc5{animation:spinner_3l8F .9s linear infinite;animation-delay:-.9s}.spinner_RibN{animation-delay:-.7s}.spinner_ZAxd{animation-delay:-.5s}'
			}
		</style>
		<path d="M1 6h2.8v12H1z" className="spinner_7uc5 spinner_ZAxd" />
		<path d="M5.8 6h2.8v12H5.8z" className="spinner_7uc5 spinner_RibN" />
		<path d="M10.6 6h2.8v12h-2.8z" className="spinner_7uc5" />
		<path d="M15.4 6h2.8v12h-2.8z" className="spinner_7uc5 spinner_RibN" />
		<path d="M20.2 6H23v12h-2.8z" className="spinner_7uc5 spinner_ZAxd" />
	</svg>
);
