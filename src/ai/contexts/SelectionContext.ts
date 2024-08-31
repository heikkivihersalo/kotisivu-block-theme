import { createContext } from '@wordpress/element';
import type { BlockInstance } from '@wordpress/blocks';

type Selection = {
	block?: BlockInstance | null;
	anchor?: Element | null;
	text: string;
	start: number;
	end: number;
};

type SelectionContextType = {
	selection: Selection;
	setSelection: (selection: Selection) => void;
};

const SelectionContext = createContext<SelectionContextType>({
	selection: {
		block: null,
		text: '',
		start: 0,
		end: 0,
	},
	setSelection: () => {},
});

export type { SelectionContextType, Selection };
export default SelectionContext;
