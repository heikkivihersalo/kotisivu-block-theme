const ALLOWED_TEXT_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'core/list',
	'core/list-item',
];

const STATUS = {
	INITIAL: 'initial',
	LOADING: 'loading',
	VISIBLE: 'visible',
	ERROR: 'error',
} as const;

export { ALLOWED_TEXT_BLOCKS, STATUS };
