import { __ } from '@wordpress/i18n';
import type { Variation } from '@components/variations';

const variations: Array<Variation> = [
	{
		name: 'grid-default',
		title: __('Default', 'kotisivu-theme-blocks'),
		icon: 'button',
		scope: 'block',
		innerBlocks: [
			['ksd/generic-grid-item', { className: 'generic-grid-item' }],
			['ksd/generic-grid-item', { className: 'generic-grid-item' }],
			['ksd/generic-grid-item', { className: 'generic-grid-item' }],
		],
		attributes: {
			blockClass: 'generic-grid',
			childTemplate: [
				[
					'core/image',
					{
						className: 'generic-grid-item__image',
					},
				],
				[
					'core/heading',
					{
						level: 3,
						className: 'generic-grid-item__heading',
					},
				],
				[
					'core/paragraph',
					{
						className: 'generic-grid-item__paragraph',
					},
				],
				[
					'core/buttons',
					{
						className: 'generic-grid-item__buttons',
					},
				],
			],
		},
	},
];

export default variations;
