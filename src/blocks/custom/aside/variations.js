import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'aside-100',
        title: __('Aside | 100', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [],
        attributes: {
            blockClass: "",
            style: {}
        }
    },
    {
        name: 'aside-50-50',
        title: __('Aside | 50-50', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/wrapper'],
            ['ksd/wrapper']
        ],
        attributes: {
            blockClass: "grid-cols-2",
            style: {}
        }
    },
    {
        name: 'aside-33-33-33',
        title: __('Aside | 33-33-33', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/wrapper'],
            ['ksd/wrapper'],
            ['ksd/wrapper']
        ],
        attributes: {
            blockClass: "grid-cols-3",
            style: {}
        }
    }
];

export default variations;