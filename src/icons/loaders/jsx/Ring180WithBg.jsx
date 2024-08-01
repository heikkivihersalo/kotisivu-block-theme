/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const Ring180WithBg = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>{'@keyframes spinner_StKS{to{transform:rotate(360deg)}}'}</style>
		<path
			d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 19a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z"
			opacity={0.25}
		/>
		<path
			d="M12 4a8 8 0 0 1 7.89 6.7 1.53 1.53 0 0 0 1.49 1.3 1.5 1.5 0 0 0 1.48-1.75 11 11 0 0 0-21.72 0A1.5 1.5 0 0 0 2.62 12a1.53 1.53 0 0 0 1.49-1.3A8 8 0 0 1 12 4Z"
			style={{
				transformOrigin: 'center',
				animation: 'spinner_StKS .75s infinite linear',
			}}
		/>
	</svg>
);
export { Ring180WithBg };
