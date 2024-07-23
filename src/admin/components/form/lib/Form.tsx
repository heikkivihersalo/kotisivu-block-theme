/**
 * Internal dependencies
 */
import styles from './Form.module.css';
import { FormProps } from '@admin/form';

/**
 * Form Component
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components
 * @param {Function} props.onSave - Save handler
 * @return {JSX.Element} Form component
 */
const Form = ({ children, onSave }: FormProps): JSX.Element => {
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
