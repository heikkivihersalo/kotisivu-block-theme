<?php

declare(strict_types=1);

use Vihersalo\Core\Gutenberg\Support\BlockCategory;
use Vihersalo\Core\Gutenberg\Support\BlockGroup;
use Vihersalo\Core\Gutenberg\Support\PatternCategory;

return [

    /*
    |--------------------------------------------------------------------------
    | Groups
    |--------------------------------------------------------------------------
    | Block groups are an developer conviency to group different blocks together.
    | This allows to organize the source folder more logically and to use your
    | own structures.
    |
    | Default and very opionated groups are `custom`, `parts` and `page_templates`.
    */

    'groups' => [
        BlockGroup::create('resources/widgets/block-library/parts', 'build/blocks/parts'),
        BlockGroup::create('resources/widgets/block-library/custom', 'build/blocks/custom'),
        BlockGroup::create('resources/widgets/page-templates', 'build/page-templates'),
        BlockGroup::create('resources/widgets/template-parts', 'build/template-parts'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Options
    |--------------------------------------------------------------------------
    |
    */

    'options' => [
        'should_load_separate_core_block_assets' => true,
        'disable_core_patterns'                  => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Blacklist
    |--------------------------------------------------------------------------
    |
    */

    'blacklist' => [
        /**
        * WordPress Core Blocks
        * - These are the default blocks that come with WordPress
        * - To keep things clean we should only allow the once we need
        */
        'core/archives',
        'core/audio',
        'core/avatar',
        'core/block',
        'core/button',
        'core/buttons',
        'core/calendar',
        'core/categories',
        'core/code',
        'core/column',
        'core/columns',
        'core/comment-author-name',
        'core/comment-content',
        'core/comment-date',
        'core/comment-edit-link',
        'core/comment-reply-link',
        'core/comment-template',
        'core/comments-pagination-next',
        'core/comments-pagination-numbers',
        'core/comments-pagination-previous',
        'core/comments-pagination',
        'core/comments-title',
        'core/comments',
        'core/cover',
        'core/details',
        'core/embed',
        'core/file',
        'core/footnotes',
        'core/freeform',
        'core/gallery',
        'core/group',
        'core/heading',
        'core/home-link',
        'core/html',
        'core/image',
        'core/latest-comments',
        'core/latest-posts',
        'core/legacy-widget',
        'core/list-item',
        'core/list',
        'core/loginout',
        'core/media-text',
        'core/missing',
        'core/more',
        'core/navigation-link',
        'core/navigation-submenu',
        'core/navigation',
        'core/nextpage',
        'core/page-list-item',
        'core/page-list',
        'core/paragraph',
        'core/pattern',
        'core/post-author-biography',
        'core/post-author-name',
        'core/post-author',
        'core/post-comments-form',
        'core/post-content',
        'core/post-date',
        'core/post-excerpt',
        'core/post-featured-image',
        'core/post-navigation-link',
        'core/post-template',
        'core/post-terms',
        'core/post-title',
        'core/preformatted',
        'core/pullquote',
        'core/query-no-results',
        'core/query-pagination-next',
        'core/query-pagination-numbers',
        'core/query-pagination-previous',
        'core/query-pagination',
        'core/query-title',
        'core/query',
        'core/quote',
        'core/read-more',
        'core/rss',
        'core/search',
        'core/separator',
        'core/shortcode',
        'core/site-logo',
        'core/site-tagline',
        'core/site-title',
        'core/social-link',
        'core/social-links',
        'core/spacer',
        'core/table',
        'core/tag-cloud',
        'core/template-part',
        'core/term-description',
        'core/text-columns',
        'core/verse',
        'core/video',
        'core/widget-group',

        /**
        * Custom Blocks
        * - Some blocks are used only once and in templates. Therefore should be disabled from the inserter.
        */
        'ksd/header',
        'ksd/footer',

        /**
        * Page Templates
        * - These are opionated way to handle page templates
        * - Because these are not blocks that are used in the editor, we should disable them from the inserter
        */
        'ksd/template-404',
        'ksd/template-archive',
        'ksd/template-home',
        'ksd/template-index',
        'ksd/template-legal',
        'ksd/template-main',
        'ksd/template-page',
        'ksd/template-search',
        'ksd/template-single',
    ],

    /*
    |--------------------------------------------------------------------------
    | Categories
    |--------------------------------------------------------------------------
    |
    */

    'categories' => [
        'blocks' => [
            BlockCategory::create('blocks', __('Blocks', 'kotisivu-block-theme')),
            BlockCategory::create('child', __('Child', 'kotisivu-block-theme')),
            BlockCategory::create('containers', __('Containers & Wrappers', 'kotisivu-block-theme')),
            BlockCategory::create('sections', __('Sections', 'kotisivu-block-theme')),
            BlockCategory::create('templates', __('Templates', 'kotisivu-block-theme')),
            BlockCategory::create('dynamic-data', __('Dynamic Data', 'kotisivu-block-theme')),
        ],
        'patterns' => [
            PatternCategory::create('pages', __('Pages', 'kotisivu-block-theme')),
            PatternCategory::create('sections', __('Sections', 'kotisivu-block-theme')),
            PatternCategory::create('heros', __('Heros', 'kotisivu-block-theme')),
            PatternCategory::create('banners', __('Banners', 'kotisivu-block-theme')),
        ],
    ],
];
