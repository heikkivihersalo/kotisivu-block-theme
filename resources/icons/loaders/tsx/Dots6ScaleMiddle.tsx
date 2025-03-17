import type { SvgIcon } from '@icons';

/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const Dots6ScaleMiddle = (props: Pick<SvgIcon, 'className'>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>
			{
				'@keyframes spinner_6QnB{0%,50%{animation-timing-function:cubic-bezier(.27,.42,.37,.99);r:0}25%{animation-timing-function:cubic-bezier(.53,0,.61,.73);r:2px}}.spinner_1KD7{animation:spinner_6QnB 1.2s infinite}'
			}
		</style>
	</svg>
);
export { Dots6ScaleMiddle };
