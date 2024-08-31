import { createContext } from '@wordpress/element';

type Settings = {
	model: 'text' | 'image';
	[key: string]: any;
};

type SettingsContextType = {
	settings: Settings;
	setSettings: (settings: Settings) => void;
};

const SettingsContext = createContext<SettingsContextType>({
	settings: {
		model: 'text',
	},
	setSettings: () => {},
});

export type { SettingsContextType, Settings };
export default SettingsContext;
