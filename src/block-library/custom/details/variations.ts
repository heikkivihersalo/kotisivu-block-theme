import { __ } from '@wordpress/i18n';
import type { Variation } from '@components/variations';

const variations: Array<Variation> = [
	{
		name: 'details-default',
		title: __('Details | Default', 'kotisivu-theme-blocks'),
		icon: 'button',
		scope: 'block',
		innerBlocks: [],
		attributes: {
			blockClass: 'details',
			style: {},
		},
	},
];

export default variations;
