/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const Dots8Rotate = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>{'@keyframes spinner_STY6{to{transform:rotate(360deg)}}'}</style>
		<g
			style={{
				transformOrigin: 'center',
				animation: 'spinner_STY6 1.5s linear infinite',
			}}
		>
			<circle cx={3} cy={12} r={2} />
			<circle cx={21} cy={12} r={2} />
			<circle cx={12} cy={21} r={2} />
			<circle cx={12} cy={3} r={2} />
			<circle cx={5.64} cy={5.64} r={2} />
			<circle cx={18.36} cy={18.36} r={2} />
			<circle cx={5.64} cy={18.36} r={2} />
			<circle cx={18.36} cy={5.64} r={2} />
		</g>
	</svg>
);
export { Dots8Rotate };
