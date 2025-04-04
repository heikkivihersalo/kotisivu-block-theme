import { __ } from '@wordpress/i18n';
import type { Variation } from '@components/variations';
import { columnFull, columnTwoHalfs } from '@icons/index';

const variations: Array<Variation> = [
	{
		name: 'hero-stacked',
		title: __('Hero | Stacked', 'kotisivu-theme-blocks'),
		icon: columnFull,
		scope: 'block',
		innerBlocks: [
			[
				'ksd/wrapper',
				{
					blockClass: 'hero__content',
					showAlignmentControls: true,
					variationName: 'wrapper-100',
					width: null,
					template: [
						[
							'core/heading',
							{
								level: 1,
								placeholder: 'Hero Heading',
								className: 'hero__heading',
							},
						],
						[
							'core/paragraph',
							{
								placeholder: 'Hero Text',
								className: 'hero__text',
							},
						],
						[
							'core/buttons',
							{
								placeholder: 'Hero Buttons',
								className: 'hero__buttons',
							},
						],
					],
				},
			],
			[
				'core/image',
				{
					className: 'hero__image',
					align: 'full',
					sizeSlug: 'full',
					url: 'https://picsum.photos/1920/1080',
				},
			],
		],
		attributes: {
			blockClass: 'hero hero-stacked',
			templateLock: 'all',
			width: 'var(--wp--custom--wide-size)',
			style: {},
		},
	},
	{
		name: 'hero-two-column',
		title: __('Hero | Two Columns', 'kotisivu-theme-blocks'),
		icon: columnTwoHalfs,
		scope: 'block',
		innerBlocks: [
			[
				'ksd/wrapper',
				{
					blockClass: 'hero__content',
					showAlignmentControls: true,
					variationName: 'wrapper-100',
					width: null,
					template: [
						[
							'core/heading',
							{
								level: 1,
								placeholder: 'Hero Heading',
								className: 'hero__heading',
							},
						],
						[
							'core/paragraph',
							{
								placeholder: 'Hero Text',
								className: 'hero__text',
							},
						],
						[
							'core/buttons',
							{
								placeholder: 'Hero Buttons',
								className: 'hero__buttons',
							},
						],
					],
				},
			],
			[
				'core/image',
				{
					className: 'hero__image',
					align: 'full',
					sizeSlug: 'full',
					url: 'https://picsum.photos/1920/1080',
				},
			],
		],
		attributes: {
			blockClass: 'hero hero-two-column',
			templateLock: 'all',
			width: 'var(--wp--custom--wide-size)',
			style: {},
		},
	},
];

export default variations;
