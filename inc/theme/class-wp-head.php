<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Add elements to site <head> section
 * 
 * @package Kotisivu\BlockTheme 
 */

class WP_Head {
    /**
     * Parent path
     * @var string
     */
    protected $parent_path;

    /**
     * Parent URI
     * @var string
     */
    protected $parent_uri;

    /**
     * Theme settings extracted from config.json file
     * @var array
     */
    protected $settings;

    /**
     * Theme analytics options database table
     * @var array
     */
    protected $analytics;

    /**
     * Constructor
     */
    public function __construct($parent_path, $parent_uri, $settings, $analytics) {
        /**
         * Set attributes
         */
        $this->parent_path = $parent_path;
        $this->parent_uri = $parent_uri;
        $this->settings = $settings;
        $this->analytics = $analytics;
    }

    /**
     * Inline sanitize CSS styles
     */
    public function inline_sanitize_css(): void {
?>
        <style id="ksd-sanitize-inline-css">
            <?php echo file_get_contents($this->parent_path . '/assets/css/theme/sanitize.css') ?>
        </style>
    <?php
    }

    /**
     * Inline dark mode css
     */
    public function inline_dark_mode_css(): void {
    ?>
        <style id="ksd-dark-mode-inline-css">
            <?php echo file_get_contents($this->parent_path . '/assets/css/theme/dark-mode.css') ?>
        </style>
    <?php
    }

    /**
     * Inline CSS styles
     */
    public function inline_custom_css(): void {
    ?>
        <style id="ksd-custom-inline-css">
            <?php echo file_get_contents($this->parent_path . '/assets/css/theme/inline.css') ?>
        </style>
    <?php
    }

    /**
     * Inline dark mode scripts
     */
    public function inline_dark_mode_cookie(): void { ?>
        <meta name="color-scheme" content="dark light">
        <script data-no-optimize="1">
            <?php echo file_get_contents($this->parent_path . '/assets/js/theme/dark-mode.js') ?>
        </script>
        <?php
    }

    /**
     * Inline Font Awesome
     * @return void 
     */
    public function inline_fontawesome(): void {
        if (isset($this->settings['fontawesome'])) :
            $folder = $this->parent_uri . '/assets/icons/fontawesome/css/';

            foreach ($this->settings['fontawesome'] as $slug => $is_enabled) :
                if (!$is_enabled) continue;

                $path = $folder . $slug . '.min.css';
                $rel = 'stylesheet';
        ?>
                <link rel="preload" href="<?php echo $path ?>" as="style" onload='this.onload=null,this.rel="<?php echo $rel ?>"'>
        <?php
            endforeach;
        endif;
    }

    /**
     * Inline theme color
     * @return void
     */
    public function inline_theme_color(): void { ?>
        <?php $color = $this->settings['themeColor']['color']; ?>
        <meta name="theme-color" content="<?php echo $color ?>">
        <meta name="msapplication-navbutton-color" content="<?php echo $color ?>">
        <meta name="apple-mobile-web-app-status-bar-style" content="<?php echo $color ?>">
    <?php }

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
                    }, t.src = "<?php echo $this->analytics['tagmanager-url'] ?>/gtm.js?id=<?php echo $this->analytics['tagmanager-id'] ?>", document.head.appendChild(t)
                };
            document.addEventListener("DOMContentLoaded", function() {
                setTimeout(initGTM, <?php echo $this->analytics['tagmanager-timeout'] ?>)
            }), document.addEventListener("scroll", initGTMOnEvent), document.addEventListener("mousemove", initGTMOnEvent), document.addEventListener("touchstart", initGTMOnEvent)
        </script>
<?php }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        /* Add inline CSS */
        add_action('wp_head', [$this, 'inline_sanitize_css'], 0);
        add_action('wp_head', [$this, 'inline_custom_css'], 11);

        /* Enable dark mode */
        if ($this->settings['darkMode']) :
            add_action('wp_head', [$this, 'inline_dark_mode_cookie'], 0);
            add_action('wp_head', [$this, 'inline_dark_mode_css'], 11);
        endif;

        /* Enable Font Awesome */
        if ($this->settings['fontawesome']['all'] || $this->settings['fontawesome']['brands'] || $this->settings['fontawesome']['solid'] || $this->settings['fontawesome']['regular']) :
            add_action('wp_head', [$this, 'inline_fontawesome'], 11);

            if (is_user_logged_in()) {
                add_action('admin_head', [$this, 'add_fontawesome_to_admin'], 11);
            }
        endif;

        /* Enable Google Tag Manager */
        if (isset($this->analytics['tagmanager-active'])) :
            add_action('wp_head', [$this, 'inline_tag_manager'], 0);
        endif;

        /* Enable theme color */
        if ($this->settings['themeColor']['active']) :
            add_action('wp_head', [$this, 'inline_theme_color'], 0);
        endif;
    }
}
