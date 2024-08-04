/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Ring180 } from '@icons';
import styles from './PromptControl.module.css';

/**
 * Form component
 * @param {Object} props - Component props
 * @param {boolean} props.isLoading - Form children
 * @return {JSX.Element} Form component
 */
const PromptControl = ({ isLoading }: { isLoading: boolean }): JSX.Element => {
	return (
		<div className={styles.textareaContainer}>
			<div>
				<label className={styles.textareaLabel} htmlFor="prompt">
					{__('Prompt', 'kotisivu-block-theme')}
				</label>
				<textarea
					id="prompt"
					className={styles.textareaInput}
					name="prompt"
					rows={1}
				></textarea>
			</div>
			<button
				type="submit"
				className={`${styles.promptButton} components-button is-primary is-compact`}
				disabled={isLoading}
			>
				{isLoading ? (
					<Ring180 />
				) : (
					__('Generate', 'kotisivu-block-theme')
				)}
			</button>
		</div>
	);
};

export default PromptControl;
