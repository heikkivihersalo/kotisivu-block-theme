import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'aside-100',
        title: __('Aside | 100', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [],
        attributes: {
            asideClass: "grid-cols-1",
            showAlignmentControls: true
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
            asideClass: "grid-cols-2",
            showAlignmentControls: true
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
            asideClass: "grid-cols-3",
            showAlignmentControls: true
        }
    }
];

export default variations;