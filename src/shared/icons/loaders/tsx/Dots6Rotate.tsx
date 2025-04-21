/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
export const Dots6Rotate = (props: CustomSVGProps): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width || 24}
		height={props.height || 24}
		{...props}
	>
		<style>
			{
				'@keyframes spinner_Oiah{8.3%{transform:rotate(30deg)}16.6%{transform:rotate(60deg)}25%{transform:rotate(90deg)}33.3%{transform:rotate(120deg)}41.6%{transform:rotate(150deg)}50%{transform:rotate(180deg)}58.3%{transform:rotate(210deg)}66.6%{transform:rotate(240deg)}75%{transform:rotate(270deg)}83.3%{transform:rotate(300deg)}91.6%{transform:rotate(330deg)}to{transform:rotate(360deg)}}'
			}
		</style>
		<g
			style={{
				transformOrigin: 'center',
				animation: 'spinner_Oiah .75s step-end infinite',
			}}
		>
			<circle cx={12} cy={2.5} r={1.5} opacity={0.14} />
			<circle cx={16.75} cy={3.77} r={1.5} opacity={0.29} />
			<circle cx={20.23} cy={7.25} r={1.5} opacity={0.43} />
			<circle cx={21.5} cy={12} r={1.5} opacity={0.57} />
			<circle cx={20.23} cy={16.75} r={1.5} opacity={0.71} />
			<circle cx={16.75} cy={20.23} r={1.5} opacity={0.86} />
			<circle cx={12} cy={21.5} r={1.5} />
		</g>
	</svg>
);
