/**
 * Internal dependencies
 */
import styles from './FormBody.module.css';

/**
 * Form Component
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components
 * @return {JSX.Element} Form component
 */
const FormBody = ({ children }) => {
	return <div className={styles.body}>{children}</div>;
};

export { FormBody };
