/**
 * Internal dependencies
 */
import styles from './FormBody.module.css';

type Props = {
	children: React.ReactNode;
};

/**
 * Form Component
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components
 * @return {JSX.Element} Form component
 */
const FormBody = ({ children }: Props): JSX.Element => {
	return <div className={styles.body}>{children}</div>;
};

export { FormBody };
