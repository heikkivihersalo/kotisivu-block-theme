import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'carousel-default',
		title: __('Default Carousel', 'kotisivu-theme-blocks'),
		icon: 'button',
		scope: 'block',
		innerBlocks: [
			[
				'ksd/generic-carousel-slide',
				{ className: 'generic-carousel__slide' },
			],
			[
				'ksd/generic-carousel-slide',
				{ className: 'generic-carousel__slide' },
			],
			[
				'ksd/generic-carousel-slide',
				{ className: 'generic-carousel__slide' },
			],
		],
		attributes: {
			blockClass: 'generic-carousel__list',
			childTemplate: [
				['core/image', { className: 'generic-carousel__slide-image' }],
			],
			templateLock: 'all',
		},
	},
];

export default variations;
