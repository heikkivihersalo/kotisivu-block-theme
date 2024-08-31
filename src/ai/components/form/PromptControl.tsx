/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { Ring180 } from '@icons';
import Settings from '../settings/Settings';

import { STATUS } from '../../constants';
import styles from './PromptControl.module.css';

type Props = {
	status: string;
	placeholder: string;
};

/**
 * Form component
 * @return {JSX.Element} Form component
 */
const PromptControl = ({ status, placeholder }: Props): JSX.Element => {
	const [settingsVisible, setSettingsVisible] = useState(false);
	const [settingsAnchor, setSettingsAnchor] = useState<HTMLElement | null>(
		null
	);

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
					placeholder={placeholder}
				></textarea>
			</div>
			<button
				type="submit"
				className={styles.buttonSubmit}
				disabled={status === STATUS.LOADING}
			>
				{status === STATUS.LOADING ? (
					<Ring180 />
				) : (
					__('Generate', 'kotisivu-block-theme')
				)}
			</button>
			<button
				type="button"
				ref={setSettingsAnchor}
				className={styles.buttonSettings}
				aria-label={__('Prompt Modal Settings', 'kotisivu-block-theme')}
				onClick={() => {
					setSettingsVisible(!settingsVisible);
				}}
			>
				<svg
					width="3"
					height="13"
					viewBox="0 0 3 13"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M3 6.5C3 7.32843 2.32843 8 1.5 8C0.671573 8 0 7.32843 0 6.5C0 5.67157 0.671573 5 1.5 5C2.32843 5 3 5.67157 3 6.5Z"
						fill="#363636"
					/>
					<path
						d="M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5Z"
						fill="#363636"
					/>
					<path
						d="M3 11.5C3 12.3284 2.32843 13 1.5 13C0.671573 13 0 12.3284 0 11.5C0 10.6716 0.671573 10 1.5 10C2.32843 10 3 10.6716 3 11.5Z"
						fill="#363636"
					/>
				</svg>
			</button>
			<Settings
				settingsVisible={settingsVisible}
				anchor={settingsAnchor}
			/>
		</div>
	);
};

export default PromptControl;
