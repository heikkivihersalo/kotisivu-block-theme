/**
 * Internal dependencies
 */
import styles from './OptionGroup.module.css';

/**
 * OptionGroup Component
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components
 * @return {JSX.Element} OptionGroup component
 */
const OptionGroup = ({ children }) => {
	return <div className={styles.group}>{children}</div>;
};

export { OptionGroup };
