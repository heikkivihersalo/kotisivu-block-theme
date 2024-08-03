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

export type { Response };
