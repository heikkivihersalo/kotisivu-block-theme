/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Toggle } from '@admin/inputs';
import styles from './FormHead.module.css';

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
	toggleName = null,
	toggleValue = null,
	toggleCallback = null,
}) => {
	return (
		<div className={styles.head}>
			<h3>{name}</h3>
			{toggleName !== null && (
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
