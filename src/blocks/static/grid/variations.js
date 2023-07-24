import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'grid-50-50',
        title: __('Grid | 50-50', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/grid-item', { blockClass: 'grid-item is-stacked' }],
            ['ksd/grid-item', { blockClass: 'grid-item is-stacked' }],
            ['ksd/grid-item', { blockClass: 'grid-item is-stacked' }],
            ['ksd/grid-item', { blockClass: 'grid-item is-stacked' }]
        ],
        attributes: {
            blockClass: "grid grid-cols-2",
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
        name: 'grid-33-33-33',
        title: __('Grid | 33-33-33', 'kotisivu-theme-blocks'),
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
            blockClass: "grid grid-cols-3",
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