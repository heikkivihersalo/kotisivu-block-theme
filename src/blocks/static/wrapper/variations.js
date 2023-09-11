import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'wrapper-100',
        title: __('Wrapper | 100', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [],
        attributes: {
            style: {}
        }
    },
    {
        name: 'wrapper-50-50',
        title: __('Wrapper | 50-50', 'kotisivu-theme-blocks'),
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
        name: 'wrapper-33-33-33',
        title: __('Wrapper | 33-33-33', 'kotisivu-theme-blocks'),
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
