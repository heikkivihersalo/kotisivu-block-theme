/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Ring180 } from '@icons';
import { STATUS } from '../../constants';
import styles from './PromptControl.module.css';

/**
 * Form component
 * @return {JSX.Element} Form component
 */
const PromptControl = ({ status }: { status: string }): JSX.Element => {
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
				disabled={status === STATUS.LOADING}
			>
				{status === STATUS.LOADING ? (
					<Ring180 />
				) : (
					__('Generate', 'kotisivu-block-theme')
				)}
			</button>
		</div>
	);
};

export default PromptControl;
