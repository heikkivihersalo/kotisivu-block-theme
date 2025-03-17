import type { SvgIcon } from '@icons';

/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const BlocksScale = (props: Pick<SvgIcon, 'className'>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>
			{
				'@keyframes spinner_GWy6{0%,50%{width:9px;height:9px}10%{width:11px;height:11px}}@keyframes spinner_BNNO{0%,50%{x:1.5px;y:1.5px}10%{x:.5px;y:.5px}}@keyframes spinner_pVqn{0%,50%{x:13.5px;y:1.5px}10%{x:12.5px;y:.5px}}@keyframes spinner_6uKB{0%,50%{x:13.5px;y:13.5px}10%{x:12.5px;y:12.5px}}@keyframes spinner_Qw4x{0%,50%{x:1.5px;y:13.5px}10%{x:.5px;y:12.5px}}'
			}
		</style>
		<rect
			width={9}
			height={9}
			x={1.5}
			y={1.5}
			rx={1}
			style={{
				animation:
					'spinner_GWy6 1.2s linear infinite,spinner_BNNO 1.2s linear infinite',
			}}
		/>
		<rect
			width={9}
			height={9}
			x={13.5}
			y={1.5}
			rx={1}
			style={{
				animation:
					'spinner_GWy6 1.2s linear infinite,spinner_pVqn 1.2s linear infinite',
				animationDelay: '.15s',
			}}
		/>
		<rect
			width={9}
			height={9}
			x={13.5}
			y={13.5}
			rx={1}
			style={{
				animation:
					'spinner_GWy6 1.2s linear infinite,spinner_6uKB 1.2s linear infinite',
				animationDelay: '.3s',
			}}
		/>
		<rect
			width={9}
			height={9}
			x={1.5}
			y={13.5}
			rx={1}
			style={{
				animation:
					'spinner_GWy6 1.2s linear infinite,spinner_Qw4x 1.2s linear infinite',
				animationDelay: '.45s',
			}}
		/>
	</svg>
);
export { BlocksScale };
