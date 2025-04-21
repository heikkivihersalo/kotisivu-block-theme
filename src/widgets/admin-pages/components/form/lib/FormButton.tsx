/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from './FormButton.module.css';

/**
 * Form Button Component
 * @return {JSX.Element} Form Button Component
 */
const FormButton = (): JSX.Element => {
	return (
		<button type="submit" className={styles.button}>
			{__('Save Changes', 'kotisivu-block-theme')}
		</button>
	);
};

export { FormButton };
