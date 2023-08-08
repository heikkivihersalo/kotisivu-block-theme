import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'hero-with-image',
        title: __('Hero | Background Image', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/wrapper', {
                wrapperClass: "hero__container",
                showAlignmentControls: true,
                variationName: "wrapper-100",
                width: null,
                template: [
                    ['core/heading', { level: 1, placeholder: 'Hero Heading', className: 'hero__heading' }],
                    ['core/paragraph', { placeholder: 'Hero Text', className: 'hero__text' }],
                    ['core/buttons', { placeholder: 'Hero Buttons', className: 'hero__buttons' }]
                ]
            }],
            ['core/image', {
                className: 'hero__image',
                align: 'full',
                sizeSlug: 'full',
                url: 'https://picsum.photos/1920/1080'
            }]
        ],
        attributes: {
            blockClass: "hero is-stacked",
            templateLock: "all",
            width: "var(--wp--custom--wide-size)",
            style: {}
        }
    }
];

export default variations;