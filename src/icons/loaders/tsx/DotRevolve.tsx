import type { SvgIcon } from '@icons';

/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const DotRevolve = (props: Pick<SvgIcon, 'className'>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>{'@keyframes spinner_PBVY{to{transform:rotate(360deg)}}'}</style>
		<path
			d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 19a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z"
			opacity={0.25}
		/>
		<circle
			cx={12}
			cy={2.5}
			r={1.5}
			style={{
				transformOrigin: 'center',
				animation: 'spinner_PBVY .75s linear infinite',
			}}
		/>
	</svg>
);
export { DotRevolve };
