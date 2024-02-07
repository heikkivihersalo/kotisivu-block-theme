import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'map-full-width',
        title: __('Map | Full Width', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['core/html', {
                className: 'map__map'
            }]
        ],
        attributes: {
            templateLock: "all",
            blockClass: "map",
            style: {}
        }
    },
    {
        name: 'map-with-address',
        title: __('Map | With Address', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/wrapper', {
                blockClass: "map__address-container",
                variationName: "map-with-address",
                template: [
                    ['ksd/site-logo', { className: 'map__logo', isLink: false }],
                    ['ksd/site-address', { className: 'map__address' }],
                    ['ksd/site-email', { className: 'map__email' }]
                ]
            }],
            ['core/html', {
                className: 'map__map'
            }]
        ],
        attributes: {
            templateLock: "all",
            blockClass: "map grid-cols-2",
            style: {
                backgroundColor: "var(--wp--preset--color--grey-light)",
            }
        }
    }
];

export default variations;