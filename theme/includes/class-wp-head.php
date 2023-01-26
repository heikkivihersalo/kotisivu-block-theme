<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Add elements to site <head> section
 * 
 * Inherits following attributes
 * * name
 * * version
 * * textdomain
 * * options
 * * config
 * * path
 * * uri
 * * parent_path
 * * parent_uri
 * 
 * @package Kotisivu\BlockTheme 
 */
class WP_Head extends Theme {
    public function __construct() {
        parent::__construct();
    }

    /**
     * Inline sanitize CSS styles
     */
    public function inline_sanitize_css(): void { ?>
        <style>
            *,
            ::before,
            ::after {
                box-sizing: border-box;
                background-repeat: no-repeat;
            }

            ::before,
            ::after {
                text-decoration: inherit;
                vertical-align: inherit;
            }

            :where(:root) {
                cursor: default;
                line-height: 1.5;
                overflow-wrap: break-word;
                -moz-tab-size: 4;
                tab-size: 4;
                -webkit-tap-highlight-color: transparent;
                -webkit-text-size-adjust: 100%;
                text-size-adjust: 100%;
                hyphens: auto;
            }

            :where(html) {
                scroll-behavior: smooth;
            }

            :where(body) {
                margin: 0;
            }

            :where(h1) {
                font-size: 2em;
                margin: 0.67em 0;
            }

            :where(dl, ol, ul) :where(dl, ol, ul) {
                margin: 0;
            }

            :where(hr) {
                color: inherit;
                height: 0;
            }

            :where(nav) :where(ol, ul) {
                list-style-type: none;
                padding: 0;
            }

            :where(nav li)::before {
                content: "\200B";
                float: left;
            }

            :where(pre) {
                font-family: monospace, monospace;
                font-size: 1em;
                overflow: auto;
            }

            :where(abbr[title]) {
                text-decoration: underline;
                text-decoration: underline dotted;
            }

            :where(b, strong) {
                font-weight: bolder;
            }

            :where(code, kbd, samp) {
                font-family: monospace, monospace;
                font-size: 1em;
            }

            :where(small) {
                font-size: 80%;
            }

            :where(audio, canvas, iframe, img, svg, video) {
                vertical-align: middle;
                object-fit: cover;
                width: 100%;
                max-width: 100%;
                height: auto;
            }

            :where(address) {
                font-style: normal;
                text-decoration: none;
            }

            :where(iframe) {
                border-style: none;
            }

            :where(svg:not([fill])) {
                fill: currentColor;
            }

            :where(table) {
                border-collapse: collapse;
                border-color: currentColor;
                text-indent: 0;
            }

            :where(button, input, select) {
                margin: 0;
            }

            :where(button, [type="button"i], [type="reset"i], [type="submit"i]) {
                -webkit-appearance: button;
            }

            :where(fieldset) {
                border: 1px solid #a0a0a0;
            }

            :where(progress) {
                vertical-align: baseline;
            }

            :where(textarea) {
                margin: 0;
                resize: vertical;
            }

            :where([type="search"i]) {
                -webkit-appearance: textfield;
                outline-offset: -2px;
            }

            ::-webkit-inner-spin-button,
            ::-webkit-outer-spin-button {
                height: auto;
            }

            ::-webkit-input-placeholder {
                color: inherit;
                opacity: 0.54;
            }

            ::-webkit-search-decoration {
                -webkit-appearance: none;
            }

            ::-webkit-file-upload-button {
                -webkit-appearance: button;
                font: inherit;
            }

            :where(dialog) {
                background-color: white;
                border: solid;
                color: black;
                height: -moz-fit-content;
                height: fit-content;
                left: 0;
                margin: auto;
                padding: 1em;
                position: absolute;
                right: 0;
                width: -moz-fit-content;
                width: fit-content;
            }

            :where(dialog:not([open])) {
                display: none;
            }

            :where(details > summary:first-of-type) {
                display: list-item;
            }

            :where([aria-busy="true"i]) {
                cursor: progress;
            }

            :where([aria-disabled="true"i], [disabled]) {
                cursor: not-allowed;
            }

            :where([aria-hidden="false"i][hidden]) {
                display: initial;
            }

            :where([aria-hidden="false"i][hidden]:not(:focus)) {
                clip: rect(0, 0, 0, 0);
                position: absolute;
            }
        </style>
    <?php }

    /**
     * Inline dark mode scripts
     */
    public function inline_dark_mode_cookie(): void { ?>
        <script data-no-optimize="1">
            const cookies = document.cookie.split(";"),
                classes = document.getElementsByTagName("html")[0].classList;
            cookies.some((s => s.includes("color-scheme=dark"))) ? classes.add("color-scheme--dark") : cookies.some((s => s.includes("color-scheme=light"))) && classes.add("color-scheme--light");
        </script>
        <?php }

    /**
     * Inline Font Awesome
     * @return void 
     */
    public function inline_fontawesome(): void {
        if ($this->config['settings']['fontawesome']['all']) :
        ?>
            <link rel="preload" href="<?php echo $this->parent_uri . '/assets/icons/fontawesome/css/all.min.css' ?>" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <noscript>
                <link rel="stylesheet" href="<?php echo $this->parent_uri . '/assets/icons/fontawesome/css/all.min.css' ?>">
            </noscript>
        <?php
        endif;

        if ($this->config['settings']['fontawesome']['brand']) :
        ?>
            <link rel="preload" href="<?php echo $this->parent_uri . '/assets/icons/fontawesome/css/brands.min.css' ?>" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <noscript>
                <link rel="stylesheet" href="<?php echo $this->parent_uri . '/assets/icons/fontawesome/css/brand.min.css' ?>">
            </noscript>
        <?php
        endif;

        if ($this->config['settings']['fontawesome']['solid']) :
        ?>
            <link rel="preload" href="<?php echo $this->parent_uri . '/assets/icons/fontawesome/css/solid.min.css' ?>" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <noscript>
                <link rel="stylesheet" href="<?php echo $this->parent_uri . '/assets/icons/fontawesome/css/solid.min.css' ?>">
            </noscript>
        <?php
        endif;

        if ($this->config['settings']['fontawesome']['regular']) :
        ?>
            <link rel="preload" href="<?php echo $this->parent_uri . '/assets/icons/fontawesome/css/regular.min.css' ?>" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <noscript>
                <link rel='stylesheet' href="<?php echo $this->parent_uri . '/assets/icons/fontawesome/css/regular.min.css' ?>">
            </noscript>
        <?php
        endif;
    }

    /**
     * Enqueue Font Awesome CSS to admin head
     * @return void 
     */
    public function add_fontawesome_to_admin(): void { ?>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css" integrity="sha512-q3eWabyZPc1XTCmF+8/LuE1ozpg5xxn7iO89yfSOd5/oKvyqLngoNGsx8jq92Y8eXJ/IRxQbEC+FGSYxtk2oiw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <?php }

    /**
     * Inline Google Tag Manager
     * @return void 
     */
    public function inline_tag_manager(): void { ?>
        <script>
            var initGTMOnEvent = function(t) {
                    initGTM(), t.currentTarget.removeEventListener(t.type, initGTMOnEvent)
                },
                initGTM = function() {
                    if (window.gtmDidInit) return !1;
                    window.gtmDidInit = !0;
                    var t = document.createElement("script");
                    t.type = "text/javascript", t.async = !0, t.onload = function() {
                        dataLayer.push({
                            event: "gtm.js",
                            "gtm.start": (new Date).getTime(),
                            "gtm.uniqueEventId": 0
                        })
                    }, t.src = "<?php echo $this->options['gtm_url'] ?>/gtm.js?id=<?php echo $this->options['gtm_id'] ?>", document.head.appendChild(t)
                };
            document.addEventListener("DOMContentLoaded", function() {
                setTimeout(initGTM, <?php echo $this->options['gtm_timeout'] ?>)
            }), document.addEventListener("scroll", initGTMOnEvent), document.addEventListener("mousemove", initGTMOnEvent), document.addEventListener("touchstart", initGTMOnEvent)
        </script>
    <?php }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        /* Normalize CSS defaults */
        add_action('wp_head', [$this, 'inline_sanitize_css'], 0);

        /* Enable dark mode */
        if ($this->config['settings']['dark-mode']) :
            add_action('wp_head', [$this, 'inline_dark_mode_cookie'], 0);
        endif;

        /* Enable Font Awesome */
        if ($this->config['settings']['fontawesome']['all'] || $this->config['settings']['fontawesome']['brand'] || $this->config['settings']['fontawesome']['solid'] || $this->config['settings']['fontawesome']['regular']) :
            add_action('wp_head', [$this, 'inline_fontawesome'], 0);
            add_action('admin_head', [$this, 'add_fontawesome_to_admin'], 1);
        endif;

        /* Enable Google Tag Manager */
        if (isset($this->options['gtm_active'])) :
            add_action('wp_head', [$this, 'inline_tag_manager'], 0);
        endif;
    }
}
