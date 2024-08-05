/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from './SelectionControl.module.css';

/**
 * Form component
 * @param {Object} props - Component props
 * @param {string} props.selectedText - Form children
 * @return {JSX.Element | null} Form component
 */
const SelectionControl = ({
	selectedText,
}: {
	selectedText: string;
}): JSX.Element | null => {
	return (
		<div
			className={styles.checkboxContainer}
			data-disabled={selectedText === ''}
		>
			<input
				id="use-selected"
				className={styles.checkboxInput}
				type="checkbox"
				defaultChecked={selectedText !== ''}
				disabled={selectedText === ''}
				name="use-selected"
			/>
			<label htmlFor="use-selected">
				{__('Use text selection', 'kotisivu-block-theme')}
			</label>
		</div>
	);
};

export default SelectionControl;
