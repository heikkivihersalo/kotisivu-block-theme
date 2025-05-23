/**
 * Internal dependencies
 */
import styles from './OptionBody.module.css';

type Props = {
	children: React.ReactNode;
	name?: string;
	description?: string;
};

/**
 * OptionBody Component
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components
 * @param {string} props.name - Option name
 * @param {string} props.description - Option description
 * @return {JSX.Element} OptionBody component
 */
const OptionBody = ({
	children,
	name = '',
	description = '',
}: Props): JSX.Element => {
	return (
		<div className={styles.body}>
			{name && <h2>{name}</h2>}
			{description && (
				<p dangerouslySetInnerHTML={{ __html: description }} />
			)}
			{children}
		</div>
	);
};

export { OptionBody };
