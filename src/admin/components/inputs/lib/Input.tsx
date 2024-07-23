/**
 * Internal dependencies
 */
import styles from './Input.module.css';
import type { InputType, InputProps } from '@admin/inputs';

/**
 * Component for number input
 * @param {Object} props - Component props
 * @param {InputType} props.type - Type of the input
 * @param {string} props.label - Label for the input
 * @param {string} props.name - Name for the input
 * @param {string} props.value - Value for the input
 * @param {string} props.placeholder - Placeholder for the input
 * @param {Function} props.onChange - Change handler for the input
 * @return {JSX.Element} Text input component
 */
const Input = ({
	type,
	label,
	name,
	value,
	placeholder = '',
	onChange,
}: {
	type: InputType;
	label: string;
	name: string;
	value: string | number | readonly string[] | undefined;
	placeholder?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element => {
	return (
		<div className={styles.input}>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				id={name}
				name={name}
				defaultValue={value}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

export { Input };
