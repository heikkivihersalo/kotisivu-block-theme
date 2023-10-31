import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'contact-info-list-default',
        title: __('Contact Info | Default', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ["ksd/contact-info-list-item", {
                "type" : "email",
                "content" : "email@address.com"
            }],
            ["ksd/contact-info-list-item", {
                "type" : "phone",
                "content" : "045 123 1234"
            }]
        ],
        attributes: {
            blockClass: "contact-list",
            templateLock: "all"
        }
    }
];

export default variations;