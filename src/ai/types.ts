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
	text: string;
	start: number;
	end: number;
};

type PopoverProps = {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isLoading: boolean;
	selectedText: string;
	generateContentCallback: React.FormEventHandler<HTMLFormElement>;
};

export type { Response, Selection, PopoverProps };
