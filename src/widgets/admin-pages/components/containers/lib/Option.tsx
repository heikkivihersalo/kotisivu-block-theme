/**
 * Internal dependencies
 */
import styles from './Option.module.css';

type Props = {
	children: React.ReactNode;
	name?: string;
	description?: string;
};

/**
 * Option Component
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components
 * @param {string} props.name - Option name
 * @param {string} props.description - Option description
 * @return {JSX.Element} Option component
 */
const Option = ({
	children,
	name = '',
	description = '',
}: Props): JSX.Element => {
	return (
		<div className={styles.option}>
			{name && <h3>{name}</h3>}
			{description && <p>{description}</p>}
			{children}
		</div>
	);
};

export { Option };
