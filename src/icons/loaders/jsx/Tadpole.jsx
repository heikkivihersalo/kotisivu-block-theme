/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const Tadpole = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>{'@keyframes spinner_y6GP{to{transform:rotate(360deg)}}'}</style>
		<path
			d="M12 23a9.63 9.63 0 0 1-8-9.5 9.51 9.51 0 0 1 6.79-9.1A1.66 1.66 0 0 0 12 2.81a1.67 1.67 0 0 0-1.94-1.64A11 11 0 0 0 12 23Z"
			style={{
				transformOrigin: 'center',
				animation: 'spinner_y6GP .75s linear infinite',
			}}
		/>
	</svg>
);
export { Tadpole };
