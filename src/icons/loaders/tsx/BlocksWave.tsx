import type { SvgIcon } from '@icons';

/**
 * Bars fade loader icon
 * @param {Object} props
 * @author Utkarsh Verma
 * {@link https://github.com/n3r4zzurr0 Github}
 * {@link https://github.com/n3r4zzurr0/svg-spinners SVG Spinners on Github}
 * @return {JSX.Element} SVG Loader
 */
const BlocksWave = (props: Pick<SvgIcon, 'className'>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<style>
			{
				'@keyframes spinner_5QiW{0%,50%{width:7.33px;height:7.33px}25%{width:1.33px;height:1.33px}}@keyframes spinner_PnZo{0%,50%{x:1px;y:1px}25%{x:4px;y:4px}}@keyframes spinner_4j7o{0%,50%{x:8.33px;y:1px}25%{x:11.33px;y:4px}}@keyframes spinner_fLK4{0%,50%{x:1px;y:8.33px}25%{x:4px;y:11.33px}}@keyframes spinner_tDji{0%,50%{x:15.66px;y:1px}25%{x:18.66px;y:4px}}@keyframes spinner_CMiT{0%,50%{x:8.33px;y:8.33px}25%{x:11.33px;y:11.33px}}@keyframes spinner_cHKR{0%,50%{x:1px;y:15.66px}25%{x:4px;y:18.66px}}@keyframes spinner_Re6e{0%,50%{x:15.66px;y:8.33px}25%{x:18.66px;y:11.33px}}@keyframes spinner_EJmJ{0%,50%{x:8.33px;y:15.66px}25%{x:11.33px;y:18.66px}}@keyframes spinner_YJOP{0%,50%{x:15.66px;y:15.66px}25%{x:18.66px;y:18.66px}}'
			}
		</style>
		<path
			d="M1 1h7.33v7.33H1z"
			style={{
				animation:
					'spinner_5QiW 1.2s linear infinite,spinner_PnZo 1.2s linear infinite',
			}}
		/>
		<path
			d="M8.33 1h7.33v7.33H8.33z"
			style={{
				animation:
					'spinner_5QiW 1.2s linear infinite,spinner_4j7o 1.2s linear infinite',
				animationDelay: '.1s',
			}}
		/>
		<path
			d="M1 8.33h7.33v7.33H1z"
			style={{
				animation:
					'spinner_5QiW 1.2s linear infinite,spinner_fLK4 1.2s linear infinite',
				animationDelay: '.1s',
			}}
		/>
		<path
			d="M15.66 1h7.33v7.33h-7.33z"
			style={{
				animation:
					'spinner_5QiW 1.2s linear infinite,spinner_tDji 1.2s linear infinite',
				animationDelay: '.2s',
			}}
		/>
		<path
			d="M8.33 8.33h7.33v7.33H8.33z"
			style={{
				animation:
					'spinner_5QiW 1.2s linear infinite,spinner_CMiT 1.2s linear infinite',
				animationDelay: '.2s',
			}}
		/>
		<path
			d="M1 15.66h7.33v7.33H1z"
			style={{
				animation:
					'spinner_5QiW 1.2s linear infinite,spinner_cHKR 1.2s linear infinite',
				animationDelay: '.2s',
			}}
		/>
		<path
			d="M15.66 8.33h7.33v7.33h-7.33z"
			style={{
				animation:
					'spinner_5QiW 1.2s linear infinite,spinner_Re6e 1.2s linear infinite',
				animationDelay: '.3s',
			}}
		/>
		<path
			d="M8.33 15.66h7.33v7.33H8.33z"
			style={{
				animation:
					'spinner_5QiW 1.2s linear infinite,spinner_EJmJ 1.2s linear infinite',
				animationDelay: '.3s',
			}}
		/>
		<path
			d="M15.66 15.66h7.33v7.33h-7.33z"
			style={{
				animation:
					'spinner_5QiW 1.2s linear infinite,spinner_YJOP 1.2s linear infinite',
				animationDelay: '.4s',
			}}
		/>
	</svg>
);
export { BlocksWave };
