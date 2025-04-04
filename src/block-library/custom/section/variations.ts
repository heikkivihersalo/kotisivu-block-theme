import { __ } from '@wordpress/i18n';
import type { Variation } from '@components/variations';
import {
	columnFull,
	columnTwoHalfs,
	columnThreeHalfs,
	columnFourHalfs,
} from '@icons/index';

const variations: Array<Variation> = [
	{
		name: 'section-100',
		title: __('100', 'kotisivu-theme-blocks'),
		icon: columnFull,
		scope: 'block',
		innerBlocks: [],
		attributes: {
			blockClass: '',
			style: {},
		},
	},
	{
		name: 'section-50-50',
		title: __('50 / 50', 'kotisivu-theme-blocks'),
		icon: columnTwoHalfs,
		scope: 'block',
		innerBlocks: [['ksd/wrapper'], ['ksd/wrapper']],
		attributes: {
			blockClass: 'cols-2',
			style: {},
		},
	},
	{
		name: 'section-33-33-33',
		title: __('33 / 33 / 33', 'kotisivu-theme-blocks'),
		icon: columnThreeHalfs,
		scope: 'block',
		innerBlocks: [['ksd/wrapper'], ['ksd/wrapper'], ['ksd/wrapper']],
		attributes: {
			blockClass: 'cols-3',
			style: {},
		},
	},
	{
		name: 'section-25-25-25-25',
		title: __('25 / 25 / 25 / 25', 'kotisivu-theme-blocks'),
		icon: columnFourHalfs,
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
