/**
 * Internal dependencies
 */
import style from './Settings.module.css';

type Props = {
	label: string;
	icon: JSX.Element;
	hasSubMenu?: boolean;
	selectCallback: () => void;
};

/**
 * QuickCommandsNavItem component
 * @param {Object} props - Component props
 * @param {string} props.label - Label
 * @param {JSX.Element} props.icon - Icon
 * @param {boolean} props.hasSubMenu - Has sub menu
 * @param {Function} props.selectCallback - Select callback
 * @return {JSX.Element} Model navigation component
 */
const QuickCommandsNavItem = ({
	label,
	icon,
	hasSubMenu = false,
	selectCallback,
}: Props): JSX.Element => {
	return (
		<li>
			<button className={style.navListItem} onClick={selectCallback}>
				<span className={style.navListItemLabel}>
					{icon}
					{label}
				</span>
				{hasSubMenu ? (
					<svg
						width="5"
						height="9"
						viewBox="0 0 5 9"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4.82376 4.10274C5.05814 4.32247 5.05814 4.6793 4.82376 4.89903L1.22376 8.27403C0.98939 8.49376 0.608765 8.49376 0.37439 8.27403C0.140015 8.0543 0.140015 7.69747 0.37439 7.47774L3.55064 4.50001L0.376265 1.52227C0.14189 1.30255 0.14189 0.945709 0.376265 0.725983C0.61064 0.506256 0.991264 0.506256 1.22564 0.725983L4.82564 4.10098L4.82376 4.10274Z"
							fill="#1E1E1E"
						/>
					</svg>
				) : null}
			</button>
		</li>
	);
};

export default QuickCommandsNavItem;
