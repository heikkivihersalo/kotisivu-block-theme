/**
 * Internal dependencies
 */
import { OptionGroupProps } from '@admin/containers';
import styles from './OptionGroup.module.css';

/**
 * OptionGroup Component
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components
 * @return {JSX.Element} OptionGroup component
 */
const OptionGroup = ({ children }: OptionGroupProps): JSX.Element => {
	return <div className={styles.group}>{children}</div>;
};

export { OptionGroup };
