const TYPES = {
	SET_SOCIAL: 'SET_SOCIAL',
	SET_CONTACT: 'SET_CONTACT',
	GET_SOCIAL: 'GET_SOCIAL',
	GET_CONTACT: 'GET_CONTACT',
} as const;

type OptionAction = (typeof TYPES)[keyof typeof TYPES];

export { OptionAction };
