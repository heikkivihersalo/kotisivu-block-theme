/**
 * Internal dependencies
 */
import style from './Settings.module.css';

type Props = {
	label: string;
	icon: JSX.Element;
	isActive: boolean;
	selectCallback: () => void;
};

/**
 * ModelNavItem component
 * @param {Object} props - Component props
 * @param {string} props.label - Label
 * @param {JSX.Element} props.icon - Icon
 * @param {boolean} props.isActive - Is active
 * @param {Function} props.selectCallback - Select callback
 * @return {JSX.Element} Model navigation component
 */
const ModelNavItem = ({
	label,
	icon,
	isActive,
	selectCallback,
}: Props): JSX.Element => {
	return (
		<li>
			<button className={style.navListItem} onClick={selectCallback}>
				<span className={style.navListItemLabel}>
					{icon}
					{label}
				</span>
				{isActive ? (
					<svg
						className={style.navListItemCheckMark}
						width="11"
						height="9"
						viewBox="0 0 11 9"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.7698 1.0592C11.0767 1.37165 11.0767 1.87907 10.7698 2.19152L4.48482 8.59052C4.17794 8.90297 3.67956 8.90297 3.37267 8.59052L0.230164 5.39102C-0.0767213 5.07857 -0.0767213 4.57115 0.230164 4.2587C0.537049 3.94625 1.03543 3.94625 1.34232 4.2587L3.92997 6.89079L9.66014 1.0592C9.96702 0.746747 10.4654 0.746747 10.7723 1.0592H10.7698Z"
							fill="#1E1E1E"
						/>
					</svg>
				) : null}
			</button>
		</li>
	);
};

export default ModelNavItem;
