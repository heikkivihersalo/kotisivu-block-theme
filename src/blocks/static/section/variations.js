import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'section-100',
        title: __('Section | 100', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [],
        attributes: {
            sectionClass: "grid-cols-1",
            showAlignmentControls: true
        }
    },
    {
        name: 'section-50-50',
        title: __('Section | 50-50', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/inner-column'],
            ['ksd/inner-column']
        ],
        attributes: {
            sectionClass: "grid-cols-2",
            showAlignmentControls: true
        }
    },
    {
        name: 'section-33-33-33',
        title: __('Section | 33-33-33', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ['ksd/inner-column'],
            ['ksd/inner-column'],
            ['ksd/inner-column']
        ],
        attributes: {
            sectionClass: "grid-cols-3",
            showAlignmentControls: true
        }
    }
];

export default variations;