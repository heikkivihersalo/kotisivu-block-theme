import { STATUS } from './constants';
import type { BlockInstance } from '@wordpress/blocks';

type Response = {
	id: string;
	object: string;
	created: Number;
	model: string;
	choices: Array<{
		index: Number;
		message: {
			role: string;
			content: string;
		};
		logprobs: null;
		finish_reason: string;
	}>;
	usage: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
	};
	system_fingerprint: string;
};

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

type PopoverProps = {
	generateContentCallback: React.FormEventHandler<HTMLFormElement>;
};

type Status = (typeof STATUS)[keyof typeof STATUS];
type StatusContextType = {
	status: Status;
	setStatus: (status: Status) => void;
};

export type {
	Response,
	Selection,
	SelectionContextType,
	PopoverProps,
	Status,
	StatusContextType,
};
