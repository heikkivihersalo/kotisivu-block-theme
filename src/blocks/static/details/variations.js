import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'details-default',
        title: __('Details | Default', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [],
        attributes: {
            blockClass: "details",
            style: {}
        }
    }
];

export default variations;
