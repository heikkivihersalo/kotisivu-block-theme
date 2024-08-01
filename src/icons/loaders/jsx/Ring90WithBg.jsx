/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const Ring90WithBg = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>{'@keyframes spinner_AtaB{to{transform:rotate(360deg)}}'}</style>
		<path
			d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 19a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z"
			opacity={0.25}
		/>
		<path
			d="M10.14 1.16a11 11 0 0 0-9 8.92A1.59 1.59 0 0 0 2.46 12a1.52 1.52 0 0 0 1.65-1.3 8 8 0 0 1 6.66-6.61A1.42 1.42 0 0 0 12 2.69a1.57 1.57 0 0 0-1.86-1.53Z"
			style={{
				transformOrigin: 'center',
				animation: 'spinner_AtaB .75s infinite linear',
			}}
		/>
	</svg>
);
export { Ring90WithBg };