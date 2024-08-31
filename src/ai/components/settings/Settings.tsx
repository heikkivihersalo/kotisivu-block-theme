/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import SettingsContext from '../../contexts/SettingsContext';

import ModelNav from './ModelNav';
import GeneralSettingsNav from './GeneralSettingsNav';
import QuickCommandsNav from './QuickCommandsNav';

import style from './Settings.module.css';

/**
 * Form component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form children
 * @param {Function} props.onSubmit - Form submit handler
 * @return {JSX.Element} Form component
 */
const Settings = ({
	settingsVisible,
	anchor,
}: {
	settingsVisible: boolean;
	anchor: HTMLElement | null;
}): JSX.Element | null => {
	if (!settingsVisible) {
		return null;
	}

	return (
		<Popover placement="bottom-end" anchor={anchor}>
			<div className={style.settingsContainer}>
				<ModelNav />
				<QuickCommandsNav />
				<GeneralSettingsNav />
			</div>
		</Popover>
	);
};

export default Settings;
