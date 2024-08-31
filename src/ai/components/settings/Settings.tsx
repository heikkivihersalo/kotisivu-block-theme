/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import ModelNav from './ModelNav';
import GeneralSettingsNav from './GeneralSettingsNav';
import QuickCommandsNav from './QuickCommandsNav';

import style from './Settings.module.css';

/**
 * Settings component
 * @param {Object} props - Component props
 * @param {boolean} props.settingsVisible - Settings visibility
 * @param {HTMLElement} props.anchor - Anchor element
 * @return {JSX.Element} Popover component
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
