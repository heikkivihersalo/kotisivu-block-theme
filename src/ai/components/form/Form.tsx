/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from './Form.module.css';

/**
 * Form component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form children
 * @param {Function} props.onSubmit - Form submit handler
 * @return {JSX.Element} Form component
 */
const Form = ({
	children,
	onSubmit,
}: {
	children: React.ReactNode;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}): JSX.Element => {
	return (
		<form className={styles.form} onSubmit={onSubmit}>
			{children}
		</form>
	);
};

export default Form;
