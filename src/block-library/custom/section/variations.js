import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'section-100',
		title: __('Section | 100', 'kotisivu-theme-blocks'),
		icon: 'button',
		scope: 'block',
		innerBlocks: [],
		attributes: {
			blockClass: '',
			style: {},
		},
	},
	{
		name: 'section-50-50',
		title: __('Section | 50-50', 'kotisivu-theme-blocks'),
		icon: 'button',
		scope: 'block',
		innerBlocks: [['ksd/wrapper'], ['ksd/wrapper']],
		attributes: {
			blockClass: 'grid-cols-2',
			style: {},
		},
	},
	{
		name: 'section-33-33-33',
		title: __('Section | 33-33-33', 'kotisivu-theme-blocks'),
		icon: 'button',
		scope: 'block',
		innerBlocks: [['ksd/wrapper'], ['ksd/wrapper'], ['ksd/wrapper']],
		attributes: {
			blockClass: 'grid-cols-3',
			style: {},
		},
	},
];

export default variations;
