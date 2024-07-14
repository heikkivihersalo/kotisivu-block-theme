import { __ } from '@wordpress/i18n';
import type { Variation } from '@components/variations';

const variations: Array<Variation> = [
	{
		name: 'wrapper-100',
		title: __('Wrapper | 100', 'kotisivu-theme-blocks'),
		icon: 'button',
		scope: 'block',
		innerBlocks: [],
		attributes: {
			blockClass: '',
			style: {},
		},
	},
	{
		name: 'wrapper-50-50',
		title: __('Wrapper | 50-50', 'kotisivu-theme-blocks'),
		icon: 'button',
		scope: 'block',
		innerBlocks: [['ksd/wrapper'], ['ksd/wrapper']],
		attributes: {
			blockClass: 'cols-2',
			style: {},
		},
	},
	{
		name: 'wrapper-33-33-33',
		title: __('Wrapper | 33-33-33', 'kotisivu-theme-blocks'),
		icon: 'button',
		scope: 'block',
		innerBlocks: [['ksd/wrapper'], ['ksd/wrapper'], ['ksd/wrapper']],
		attributes: {
			blockClass: 'cols-3',
			style: {},
		},
	},
	{
		name: 'wrapper-25-25-25-25',
		title: __('Wrapper | 25-25-25-25', 'kotisivu-theme-blocks'),
		icon: 'button',
		scope: 'block',
		innerBlocks: [
			['ksd/wrapper'],
			['ksd/wrapper'],
			['ksd/wrapper'],
			['ksd/wrapper'],
		],
		attributes: {
			blockClass: 'cols-4',
			style: {},
		},
	},
];

export default variations;
