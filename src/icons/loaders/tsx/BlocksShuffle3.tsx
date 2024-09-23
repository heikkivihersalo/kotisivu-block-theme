import type { SvgIcon } from '@icons';

/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const BlocksShuffle3 = (props: Pick<SvgIcon, 'className'>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>
			{
				'@keyframes spinner_fUkk{25%,8.33%{x:13px;y:1px}33.3%,50%{x:13px;y:13px}58.33%,75%{x:1px;y:13px}83.33%{x:1px;y:1px}}.spinner_9y7u{animation:spinner_fUkk 2.4s linear infinite;animation-delay:-2.4s}'
			}
		</style>
		<rect
			width={10}
			height={10}
			x={1}
			y={1}
			className="spinner_9y7u"
			rx={1}
		/>
		<rect
			width={10}
			height={10}
			x={1}
			y={1}
			className="spinner_9y7u"
			rx={1}
			style={{
				animationDelay: '-1.6s',
			}}
		/>
		<rect
			width={10}
			height={10}
			x={1}
			y={1}
			className="spinner_9y7u"
			rx={1}
			style={{
				animationDelay: '-.8s',
			}}
		/>
	</svg>
);
export { BlocksShuffle3 };
