import type { BlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

const variations: Array<BlockVariation> = [
	{
		name: 'details-default',
		title: __('Details | Default', 'kotisivu-theme-blocks'),
		icon: 'button',
		scope: ['block'],
		innerBlocks: [],
		attributes: {
			blockClass: 'details',
			style: {},
		},
	},
];

export default variations;
