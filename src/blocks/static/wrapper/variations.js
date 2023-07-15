import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'wrapper-100',
        title: __('Wrapper | 100', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [],
        attributes: {
            blockClass: "grid-cols-1"
        }
    },
    {
        name: 'wrapper-50-50',
        title: __('Wrapper | 50-50', 'kotisivu-theme-blocks'),
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
        name: 'wrapper-33-33-33',
        title: __('Wrapper | 33-33-33', 'kotisivu-theme-blocks'),
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