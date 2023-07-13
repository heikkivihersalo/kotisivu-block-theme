import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'wrapper-100',
        title: __('Wrapper | 100', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [],
        attributes: {
            wrapperClass: "grid-cols-1",
            showAlignmentControls: true
        }
    },
    {
        name: 'wrapper-50-50',
        title: __('Wrapper | 50-50', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/inner-column'],
            ['ksd/inner-column']
        ],
        attributes: {
            wrapperClass: "grid-cols-2",
            showAlignmentControls: true
        }
    },
    {
        name: 'wrapper-33-33-33',
        title: __('Wrapper | 33-33-33', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/inner-column'],
            ['ksd/inner-column'],
            ['ksd/inner-column']
        ],
        attributes: {
            wrapperClass: "grid-cols-3",
            showAlignmentControls: true
        }
    }
];

export default variations;