import type { SvgIcon } from '@icons';

/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const BlocksShuffle2 = (props: Pick<SvgIcon, 'className'>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>
			{
				'@keyframes spinner_5GqJ{12.5%,25%{x:13px;y:1px}37.5%,50%{x:13px;y:13px}62.5%,75%{x:1px;y:13px}87.5%{x:1px;y:1px}}.spinner_9Mto{animation:spinner_5GqJ 1.6s linear infinite;animation-delay:-1.6s}'
			}
		</style>
		<rect
			width={10}
			height={10}
			x={1}
			y={1}
			className="spinner_9Mto"
			rx={1}
		/>
		<rect
			width={10}
			height={10}
			x={1}
			y={1}
			className="spinner_9Mto"
			rx={1}
			style={{
				animationDelay: '-1s',
			}}
		/>
	</svg>
);
export { BlocksShuffle2 };
