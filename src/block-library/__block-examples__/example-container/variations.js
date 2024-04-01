import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'example-stacked',
        title: __('example | Stacked', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/wrapper', {
                blockClass: "example__content",
                showAlignmentControls: true,
                variationName: "wrapper-100",
                width: null,
                template: []
            }],
            ['core/image', {
                className: 'example__image',
                align: 'full',
                sizeSlug: 'full',
                url: 'https://picsum.photos/1920/1080'
            }]
        ],
        attributes: {
            blockClass: "example example-stacked is-stacked",
            templateLock: "all",
            width: "var(--wp--custom--wide-size)",
            style: {}
        }
    }
];

export default variations;