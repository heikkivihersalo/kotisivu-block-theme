/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from './WarningText.module.css';

/**
 * WarningText component
 * @return {JSX.Element} Form component
 */
const WarningText = (): JSX.Element => {
	return (
		<p className={styles.text}>
			{__(
				'AI generated content may not be accurate. Always review the content before publishing.',
				'kotisivu-block-theme'
			)}
		</p>
	);
};

export default WarningText;
