/**
 * Internal dependencies
 */
import styles from './Toggle.module.css';

/**
 * Toggle Component
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the toggle
 * @param {string} props.name - Name of the toggle
 * @param {boolean} props.checked - Checked state of the toggle
 * @param {Function} props.onChange - Change handler for the toggle
 * @param {boolean} props.hideLabel - Hide the label
 * @return {JSX.Element} Toggle component
 */
const Toggle = ({ label, name, checked, onChange, hideLabel = false }) => {
	return (
		<div className={styles.toggle}>
			<label htmlFor={name}>
				{hideLabel ? (
					<span className="sr-text">{label}</span>
				) : (
					<span>{label}</span>
				)}
				<input
					type="checkbox"
					id={name}
					name={name}
					defaultChecked={checked}
					onClick={(e) => onChange(e)}
				/>
			</label>
		</div>
	);
};

export { Toggle };
