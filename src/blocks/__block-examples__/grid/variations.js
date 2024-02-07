import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'grid-50-50-image',
        title: __('Grid | 50-50 | Background Image', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/grid-item', { blockClass: 'grid-item is-stacked' }],
            ['ksd/grid-item', { blockClass: 'grid-item is-stacked' }],
            ['ksd/grid-item', { blockClass: 'grid-item is-stacked' }],
            ['ksd/grid-item', { blockClass: 'grid-item is-stacked' }]
        ],
        attributes: {
            blockClass: "grid grid-cols-2 has-background-image",
            childTemplate: [
                ['ksd/wrapper', {
                    variationName: 'wrapper-100',
                    className: 'grid-item__wrapper',
                    template: [
                        ['core/heading', { className: 'grid-item__heading' }],
                        ['core/paragraph', { className: 'grid-item__paragraph' }],
                        ['core/button', { className: 'grid-item__button' }]]
                }],
                ['core/image', { className: 'grid-item__background-image' }]
            ],
            templateLock: 'all',
            style: {}
        }
    },
    {
        name: 'grid-33-33-33-image',
        title: __('Grid | 33-33-33 | Background Image', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/grid-item'],
            ['ksd/grid-item'],
            ['ksd/grid-item'],
            ['ksd/grid-item'],
            ['ksd/grid-item'],
            ['ksd/grid-item']
        ],
        attributes: {
            blockClass: "grid grid-cols-3 has-background-image",
            childTemplate: [
                ['ksd/wrapper', {
                    variationName: 'wrapper-100',
                    className: 'grid-item__wrapper',
                    template: [
                        ['core/heading', { className: 'grid-item__heading' }],
                        ['core/paragraph', { className: 'grid-item__paragraph' }],
                        ['core/button', { className: 'grid-item__button' }]]
                }],
                ['core/image', { className: 'grid-item__background-image' }]
            ],
            templateLock: 'all',
            style: {}
        }
    }
];

export default variations;