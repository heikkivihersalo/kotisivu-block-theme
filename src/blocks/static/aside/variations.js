import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'aside-100',
        title: __('Aside | 100', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [],
        attributes: {
            blockClass: "grid-cols-1"
        }
    },
    {
        name: 'aside-50-50',
        title: __('Aside | 50-50', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/column'],
            ['ksd/column']
        ],
        attributes: {
            blockClass: "grid-cols-2"
        }
    },
    {
        name: 'aside-33-33-33',
        title: __('Aside | 33-33-33', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/column'],
            ['ksd/column'],
            ['ksd/column']
        ],
        attributes: {
            blockClass: "grid-cols-3"
        }
    }
];

export default variations;