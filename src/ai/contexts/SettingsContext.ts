import { createContext } from '@wordpress/element';
import type { SettingsContextType } from '../types';

const SettingsContext = createContext<SettingsContextType>({
	settings: {
		model: 'text',
	},
	setSettings: () => {},
});

export default SettingsContext;
