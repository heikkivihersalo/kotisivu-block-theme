const ALLOWED_TEXT_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'core/list',
	'core/list-item',
];

const ALLOWED_IMAGE_BLOCKS = ['core/paragraph'];

const STATUS = {
	INITIAL: 'initial',
	LOADING: 'loading',
	VISIBLE: 'visible',
	ERROR: 'error',
} as const;

export { ALLOWED_TEXT_BLOCKS, ALLOWED_IMAGE_BLOCKS, STATUS };
