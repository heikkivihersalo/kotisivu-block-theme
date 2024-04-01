import { __ } from '@wordpress/i18n';

const variations = [
    {
        name: 'contact-card-default',
        title: __('Contact Card | Single', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ["ksd/contact-card-item", {
                templateLock: "all",
                template: [
                    ["core/heading", { level: 2, className: "contact-card-item__heading", placeholder: "Add a heading" }],
                    ["core/image", { className: "contact-card-item__image" }],
                    ["core/paragraph", { className: "contact-card-item__name", placeholder: "Add a person name here." }],
                ],
                blockClass: "contact-card-item",
                blockWrapper: "div"
            }]
        ],
        attributes: {
            blockClass: "contact-card contact-card-single",
            blockWrapper: "div",
            templateLock: "all"
        }
    },
    {
        name: 'contact-card-list',
        title: __('Contact Card | List', 'kotisivu-theme-blocks'),
        icon: 'button',
        scope: 'block',
        innerBlocks: [
            ["ksd/contact-card-item", {
                templateLock: "all",
                template: [
                    ["core/heading", { level: 2, className: "contact-card-item__heading", placeholder: "Add a heading" }],
                    ["core/image", {
                        className: "contact-card-item__image",
                        sizeSlug: 'medium',
                        url: 'https://picsum.photos/1920/1080'
                    }],
                    ["core/paragraph", { className: "contact-card-item__name", placeholder: "Add a person name here." }],
                ],
                blockClass: "contact-card-item",
                blockWrapper: "li"
            }],
            ["ksd/contact-card-item", {
                templateLock: "all",
                template: [
                    ["core/heading", { level: 2, className: "contact-card-item__heading", placeholder: "Add a heading" }],
                    ["core/image", {
                        className: "contact-card-item__image",
                        sizeSlug: 'medium',
                        url: 'https://picsum.photos/1920/1080'
                    }],
                    ["core/paragraph", { className: "contact-card-item__name", placeholder: "Add a person name here." }],
                ],
                blockClass: "contact-card-item",
                blockWrapper: "li"
            }],
            ["ksd/contact-card-item", {
                templateLock: "all",
                template: [
                    ["core/heading", { level: 2, className: "contact-card-item__heading", placeholder: "Add a heading" }],
                    ["core/image", {
                        className: "contact-card-item__image",
                        sizeSlug: 'medium',
                        url: 'https://picsum.photos/1920/1080'
                    }],
                    ["core/paragraph", { className: "contact-card-item__name", placeholder: "Add a person name here." }],
                ],
                blockClass: "contact-card-item",
                blockWrapper: "li"
            }],
        ],
        attributes: {
            blockClass: "contact-card contact-card-list",
            blockWrapper: "ul",
            templateLock: "all"
        }
    }
];

export default variations;