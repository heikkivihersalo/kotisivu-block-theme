/**
 * Internal dependencies
 */
import styles from './Form.module.css';

type Props = {
	children: React.ReactNode;
	onSave: () => void;
};

/**
 * Form Component
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components
 * @param {Function} props.onSave - Save handler
 * @return {JSX.Element} Form component
 */
const Form = ({ children, onSave }: Props): JSX.Element => {
	return (
		<form
			className={styles.form}
			onSubmit={(e) => {
				e.preventDefault();
				onSave();
			}}
		>
			{children}
		</form>
	);
};

export { Form };
