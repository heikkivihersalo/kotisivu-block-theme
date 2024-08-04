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
 * @return {JSX.Element} Form component
 */
const SelectionControl = ({
	selectedText,
}: {
	selectedText: string;
}): JSX.Element => {
	return (
		<>
			{selectedText !== '' ? (
				<>
					<div className={styles.selectedContainer}>
						<span className={styles.selectedLabel}>
							{__('Selected text', 'kotisivu-block-theme')}
						</span>
						<p className={styles.selectedText}>{selectedText}</p>
					</div>
				</>
			) : null}
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
		</>
	);
};

export default SelectionControl;
