import { createContext } from '@wordpress/element';
import type { Selection, SelectionContextType } from '../types';

const SelectionContext = createContext<SelectionContextType>({
	selection: {
		block: null,
		text: '',
		start: 0,
		end: 0,
	},
	setSelection: () => {},
});

export default SelectionContext;
