/**
 * Internal dependencies
 */
import styles from './Button.module.css';

type Props = {
	name: string;
	disabled?: boolean;
	onClick?: () => void;
};

/**
 * Form Button Component
 * @param {Object} props - Component props
 * @param {string} props.name - Button name
 * @param {boolean} props.disabled - Button disabled state
 * @param {Function} props.onClick - Button on click function
 * @return {JSX.Element} Form Button Component
 */
const Button = ({ name, disabled, onClick }: Props): JSX.Element => {
	return (
		<button className={styles.button} onClick={onClick} disabled={disabled}>
			{name}
		</button>
	);
};

export { Button };
