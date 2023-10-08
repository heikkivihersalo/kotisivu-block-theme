# Kotisivu Block Theme

Kotisivu Block Theme is a WordPress boilerplate theme that is designed to be as developer friendly while maintaining user-friendly interface for customers to maintain content. Main idea is to use WordPress purely as a CMS (Content Management System) and let the theme handle all styling and other things. Currently theme uses functions from both post and pre blocks era.

Theme uses OOP patterns wherever possible (modified to work with WordPress).

---

## Table of Contents

1. [Get Started](#get-started)
2. [Basic Structure](#basic-structure)
3. [External Depencencies](#external-depencencies)
   1. [PostTypes](#posttypes)
   2. [RationalOptionPages](#rationaloptionpages)
4. [Theme JSON](#theme-json)
   1. [Fonts](#fonts)
   2. [Colors](#colors)
   3. [Spacing](#spacing)
   4. [Core Block Styling](#core-block-styling)
   5. [Site and Content Width](#site-and-content-width)
5. [Theme Config](#theme-config)
6. [Security](#security)
7. [Admin Settings](#admin-settings)

---

## Get Started

Theme uses yarn as a package manager. You can get started simply by running `yarn` command on your preferred editor. Then you can build files with `yarn build` or start development session `yarn start`.

### Get node_modules

```console
yarn
```

### Start development mode

```console
yarn start
```

### Build theme files

```console
yarn build
```

### Make translation files

```console
yarn make-pot
```

---

## Basic Structure

```javascript
├── .vscode // VSCode spesific config files for a faster workflow
├── assets // Theme assets that are loaded on front-end and back-end
│   ├── css // Theme CSS files. You can add your own files here if you wish (except for build files)
│   │   ├── blocks // Build folder for blocks (don't add own files here)
│   │   │   ├── ...
│   │   ├── theme // Build folder for theme (don't add own files here)
│   │   │   ├── ...
│   ├── fonts // Theme fonts. NOTE! Remember to add correct paths to theme.json
│   │   ├── ...
│   ├── icons // Theme icons. It is advisable to folder the icons accordingly
│   │   ├── ...
│   ├── js // Theme JS files. You can add your own files here if you wish (except for build files)
│   │   ├── blocks // Build folder for blocks (don't add own files here)
│   │   │   ├── ...
│   │   ├── theme // Build folder for theme (don't add own files here)
│   │   │   ├── ...
├── inc
│   ├── blocks // Any block related classes goes here
│   │   ├── ...
│   ├── lib // External dependencies goes here. DO NOT add your own customizations in this folder. Use a wrapper instead.
│   ├── patterns // Prior Gutenberg style patterns folder for PHP files
│   ├── theme // Any theme related classes goes here for example main files for theme cleanup, enqueues etc.
│   │   ├── options // All options related things goes here
│   │   ├── post-types // All post types related things goes here
│   │   │   ├── class-metabox.php // Adds metabox support for PostTypes dependency
│   │   ├── ...
│   ├── blocks.php // Main blocks class. Loads all classes from blocks folder
│   ├── theme.php // Main theme class. Loads all classes from theme folder
├── languages // WordPress main folder for translations
├── parts // Block theme style parts folder
├── src // JS and CSS files that requires a build process (Blocks, theme CSS and JS)
│   ├── __template-library__ // Blocks saved from older projects. Might be a useful starting point for new blocks
│   ├── assets
│   ├── blocks
│   │   ├── core // Core block modifications
│   │   │   ├── ...
│   │   ├── dynamic // Custom Gutenberg Dynamic blocks
│   │   │   ├── ...
│   │   ├── static // Custom Gutenberg Static block
│   │   │   ├── ...
│   ├── features // Custom built components for reusability purposes
│   │   ├── ...
│   ├── hooks // Custom built hooks for reusability purposes
│   │   ├── ...
│   ├── lib // External dependencies that are not loaded from package.json
│   │   ├── ...
│   ├── utils // Utility functions
│   │   ├── ...
├── templates // Block theme style templates folder
├── .babelrc
├── blocks.json // Config file for blocks supported by theme. Remember to add any new blocks in here
├── config.json // Config file for theme related options
├── functions.php // WordPress functions PHP. Mainly just loading the main classes (Theme and Blocks). Meant to kept as clean as possible and probably don't require any modifications
├── jsconfig.json // Config for build and development processes
├── style.css // Required by WordPress. Don't add any styles in here
├── theme.json // Block theme core config file
├── webpack.config.js // Default config file for file building
```

---

## External Depencencies

Because some things in WordPress are little bit difficult to work with, theme uses a few external libraries to make things more pleasant. Please do note that dependencies are meant to stay separate from rest of the theme (for update reasons). Meaning that if you need to do modifications, use a wrapper instead.

### PostTypes [[Github](https://github.com/jjgrainger/PostTypes)]

Post Types is a simple library to add custom post types to a WordPress theme.

### RationalOptionPages [[Github](https://github.com/jeremyHixon/RationalOptionPages)]

Option pages are a pain to work with and RationalOptionPages makes it little bit easier.

---

## Theme JSON

Theme.json is used by block theme as a primary theme config file.

### Fonts

#### Font Family

Font families are configured as a array. Add as many fonts as you like. For different font styles, new family is not necessary. Add new fontFace instead. For every new font family, WordPress adds an CSS variable. Format is always "--wp--preset--font-family--<FONT_SLUG>"

```json
      "fontFamilies": [
        {
          "fontFamily": "\"<FONT_NAME>\"", // For example "Roboto"
          "name": "<FONT_NAME>", // For example "Roboto"
          "slug": "heading", // Use whatever you want. Default has been "heading" and "body"
          "fontFace": [
            {
              "fontFamily": "<FONT_NAME>", // For example "Roboto"
              "fontWeight": "<FONT_WEIGHT>", // For example 700
              "fontStyle": "normal",
              "fontStretch": "normal",
              "src": ["file:./assets/fonts/<FOLDER>/<FILE>.woff2"]
            }
          ],
          ...
        },
        ...
        ]
```

#### Font Size

Font sizes uses WordPress default scheme (--wp--preset--font-size--<FONT_SIZE>). You can configure own preset if you like but default values are:

| Size | Variable                          |
| ---- | --------------------------------- |
| H1   | --wp--preset--font-size--colossal |
| H2   | --wp--preset--font-size--gigantic |
| H3   | --wp--preset--font-size--huge     |
| H4   | --wp--preset--font-size--large    |
| H5   | --wp--preset--font-size--medium   |
| H6   | --wp--preset--font-size--medium   |

There are also own variables for `small` and `tiny` sizes.

Margins and line-heights can be adjusted on elements -section.

> [!NOTE]
> NOTE: WordPress currently has a bug on fluid typography. Use clamp instead.

### Colors

Colors are defined using default WordPress scheme that adds new CSS variable for every color that is added. Format is always "--wp--preset--color--<COLOR_SLUG>".

#### Dark Mode

If dark mode is enabled for site, some values are overriden by separate file. If you need to change these values you can do it from theme.json and by editing custom variable values (--wp--custom--color--dark-mode--<COLOR_SLUG>)

```json
"custom": {
  ...
  "color": {
    "darkMode": {
      "colorBlack": "some hsl values",
      ...
    },
    ...
  }
  ...
}
```

#### Link Colors

Link colors can be adjusted on elements -section. Defaults works really well and usually does not need any adjustments.

### Spacing

Spacing uses default WordPress formatting (--wp--preset--spacing--<SPACING_SLUG>) and is calculated with clamp. Values work pretty well across different sites and doesn't usually require any modifications. There are times where spacing needs to be something different so easiest is to use CSS calc() -function in these situations.

```json
"spacing": {
  "units": ["em", "rem", "%", "vw", "vh"],
  "blockGap": null,
  "margin": true,
  "padding": true,
  "spacingSizes": [
    {
      "size": "clamp(0.618046971569839rem, calc(0.615109684219015rem + 0.0146864367541203vw), 0.63273340832396rem)",
      "slug": "20",
      "name": "1"
    },
    {
      "size": "clamp(1rem, calc(0.975rem + 0.125vw), 1.125rem)",
      "slug": "30",
      "name": "2"
    },
    ...
  ]
}
```

### Core Block Styling

Basically almost every styling option is disabled for site editor. Font size, font families, margins and paddings can be modified from the editor.

### Site and Content Width

For element and content width, theme uses custom variables.

| Variable                   | Description                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------- |
| --wp--custom--narrow-size  | Narrow size, max-width 80ch by default                                                  |
| --wp--custom--content-size | Default content size for page. Usually good value is somewhere between 1000px - 1400px. |
| --wp--custom--wide-size    | Max width for page. Default is based on desktop screen size (1920px).                   |

To center element to the page with proper margins, setting `margin-inline: auto` works really well

```css
.element {
	width: var(--wp--custom--content-size);
	margin-inline: auto;
}
```

---

## Theme Config

Basic configurations can be done from the `config.json` -file.

### jQuery Loading

You can switch between loading jQuery normally, on footer or not loading at all. Please do note that if you are using any plugins that require jQuery, you might need to load it normally. WordPress admin requires jQuery so it cannot be disabled completely.

### Dark Mode

Enabling dark mode loads necessary assets to use dark mode. You need to have a toggle with class `scheme-toggle` to switch between light and dark mode. Theme has own block for simple toggle that can be used.

### Theme Color

Theme color is user for example to color the browser bar on mobile devices.

If enabled it adds following meta tags to the site head:

```html
<meta name="theme-color" content="<THEME_COLOR>" />
<meta name="msapplication-navbutton-color" content="<THEME_COLOR>" />
<meta name="apple-mobile-web-app-status-bar-style" content="<THEME_COLOR>" />
```

To modify the color change state to active and add color value to `color` -key.

```json
"themeColor": {
  "active": true,
  "color": "hsl(343, 100%, 48%)"
}
```

### Disable WordPress Default Configs

You can disable some of the wordpress default stuff from loading. These are not usually required but if you are having problems, you can try disabling these.

| Config Option         | Description                                                                                                                             |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| "canonical"           | Remove canonical link. `Default: true`                                                                                                  |
| "duotone"             | Remove duotone. Only removes SVG's. Variables are still added. Might become obsolete in the future. `Default: true`                     |
| "emojis"              | Disable WordPress emojis. `Default: true`                                                                                               |
| "feed-links"          | Remove feed links. `Default: true`                                                                                                      |
| "gravatar"            | Disable Gravatar. `Default: false`                                                                                                      |
| "jquery-migrate"      | Remove jQuery migrate scripts from loading. If you are using really old legacy plugins, jquery-migrate might be needed. `Default: true` |
| "json-api"            | Disable JSON API and remove link from header. `Default: true`                                                                           |
| "next-prev-links"     | Remove the next and previous post links. `Default: true`                                                                                |
| "rsd"                 | Remove Really Simple Discovery link. `Default: true`                                                                                    |
| "shortlink"           | Remove shortlink url from header                                                                                                        |
| "woocommerce-version" | Remove WooCommerce version number showing up on frontend. `Default: true`                                                               |
| "wp-version"          | Remove WordPress version number showing up on frontend. `Default: true`                                                                 |
| "xlmrpc"              | Disable XML-RPC methods that require authentication. `Default: true`                                                                    |
| "block-library"       | Disable Gutenberg block library styles. `Default: true`                                                                                 |
| "fluent-forms"        | Disable Fluent Form plugins styles. `Default: true`                                                                                     |
| "global-styles"       | Disable global styles (theme.json). `Default: false`                                                                                    |

### Site Menus

You can set site menus that are registered to the site from here. Please do note that if you do any changes, you need to update blocks that use these menus.

```json
"menus": [
  {
    "slug": "primary-navigation",
    "name": "Header Navigation"
  },
  {
    "slug": "secondary-navigation",
    "name": "Footer Navigation"
  }
]
```

### Image Sizes

WordPress default image sizes are customized a little bit to better support variety of devices.

| Name         | Slug         | Width  | Height | Type    |
| ------------ | ------------ | ------ | ------ | ------- |
| Retina       | retina       | 2880px | 1800px | Custom  |
| Huge         | huge         | 1920px | 1440px | Custom  |
| Large        | large_size   | 1600px | 1200px | Default |
| Medium Large | medium_large | 1366px | 1025px | Custom  |
| Medium       | medium_size  | 1024px | 768px  | Default |
| Small        | small        | 768px  | 576px  | Custom  |
| Extra Small  | extra_small  | 640px  | 480px  | Custom  |

### Custom Post Types

Custom Post Types can be configured straight from config.json file. This utilizes PostTypes dependency with a metabox wrapper.

```json
"customPostTypes": [
  {
    "active": true,
    "names": {
      "name": "Example Post Type",
      "singular": "Example",
      "plural": "Examples",
      "slug": "example"
    },
    "options": {
      "hierarchical": false,
      "has_archive": false,
      "show_in_rest": true,
      "supports": ["title", "editor", "thumbnail"]
    },
    "labels": {
      "name": "Example Post Type",
      "singular_name": "Example",
      "menu_name": "Examples",
      "all_items": "Examples",
      "add_new": "Add new",
      "add_new_item": "Add new example",
      "edit_item": "Edit example",
      "new_item": "New example",
      "view_item": "View example",
      "search_items": "Search examples",
      "not_found": "No examples found",
      "not_found_in_trash": "No examples found in trash",
      "parent_item_colon": "Parent example"
    },
    "icon": "dashicons-star-filled",
    "metaboxes": {
      ...
    }
  }
  ...
]
```

#### Metaboxes

Metaboxes are a custom built wrapper to extend functionalities of PostType library. For simple purposes it is meant to replace plugins like Advanced Custom Fields. However, for more complex use cases it might be smart to use separate plugin to handle custom fields. Currently supported fields are: `url`, `text`, `number`, `checkbox`, `select`.

```json
"metaboxes": {
  "active": false,
  "options": {
    "id": "option",
    "title": "title",
    "screen": ["example"]
  },
  "markup": [
    {
      "id": "text_input",
      "label": "Text Input",
      "type": "text"
    },
    {
      "id": "url_input",
      "label": "URL Input",
      "type": "url"
    }
  ]
}
```

---

## Security

For security reasons, theme has a few things that are disabled by default.

1. Rest API is only visible for logged in users
2. Author pages are disabled and redirected to front page

There can be more things that are disabled in the future.

---

## Admin Settings

Theme settings can be found on admin panel. Certain config files such as `blocks.json` and `config.json` are saved on WordPress object cache. Cache is basically disabled on logged-in admin accounts but if you are having problems, you can purge the cache from theme settings.

### Analytics

Theme uses custom Tag Manager script that sets a delay for loading the container. Ideology is to load analytics after everything else, so any analytics script that is added, does not slow down the page. Default delay 2 seconds works really well and does not usually require any changes.

> [!NOTE]
> Tag Manager is recommended way to add any analytics related scripts including CMP (Cookie Management Platform).

### Contact and Social Platform Information

Theme has a centralized place to add company's social platform and contact information. These can be dynamically fetched from database so you don't have to pass same information again and again. For example default footer and social icon blocks use dynamic data.
