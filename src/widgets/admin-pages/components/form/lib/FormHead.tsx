/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Toggle } from '@admin/inputs';
import styles from './FormHead.module.css';
import { FormHeadProps } from '@admin/form';

/**
 * Form Component
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the form
 * @param {string} props.toggleName - Name of the toggle
 * @param {boolean} props.toggleValue - Value of the toggle
 * @param {Function} props.toggleCallback - Callback for the toggle
 * @return {JSX.Element} Form component
 */
const FormHead = ({
	name,
	toggleName = '',
	toggleValue = false,
	toggleCallback = () => {},
}: FormHeadProps): JSX.Element => {
	return (
		<div className={styles.head}>
			<h3>{name}</h3>
			{toggleName !== '' && (
				<Toggle
					label={__('Enable', 'kotisivu-block-theme')}
					name={toggleName}
					checked={toggleValue}
					onChange={toggleCallback}
					hideLabel={true}
				/>
			)}
		</div>
	);
};

export { FormHead };
