/**
 * Internal dependencies
 */
import styles from './Button.module.css';

/**
 * Form Button Component
 * @param {Object} props - Component props
 * @param {string} props.name - Button name
 * @param {Function} props.onClick - Button on click function
 * @return {JSX.Element} Form Button Component
 */
const Button = ({ name, onClick }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{name}
		</button>
	);
};

export { Button };
