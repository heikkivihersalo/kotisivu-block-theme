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
    public function inline_sanitize_css(): void {
        require_once(__DIR__ . '/inline-css/sanitize.php');
    }

    /**
     * Inline utility CSS styles
     */
    public function inline_utilities_css(): void {
        require_once(__DIR__ . '/inline-css/utilities.php');
    }

    /**
     * Inline custom CSS styles
     */
    public function inline_custom_css(): void {
        require_once(__DIR__ . '/inline-css/custom.php');
    }

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
        if (isset($this->config['settings']['fontawesome'])) :
            $folder = $this->parent_uri . '/public/icons/fontawesome/css/';

            foreach ($this->config['settings']['fontawesome'] as $slug) :
                $path = $folder . $slug . '.min.css';
                $rel = 'stylesheet';
        ?>
                <link rel="preload" href="<?php echo $path ?>" as="style" onload="this.onload=null;this.rel='<?php echo $rel ?>'">
                <noscript>
                    <link rel="<?php echo $rel ?>" href="<?php echo $path ?>">
                </noscript>
        <?php
            endforeach;
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
        /* Add inline CSS */
        add_action('wp_head', [$this, 'inline_sanitize_css'], 0);
        add_action('wp_head', [$this, 'inline_utilities_css'], 11);
        add_action('wp_head', [$this, 'inline_custom_css'], 11);

        /* Enable dark mode */
        if ($this->config['settings']['dark-mode']) :
            add_action('wp_head', [$this, 'inline_dark_mode_cookie'], 0);
        endif;

        /* Enable Font Awesome */
        if ($this->config['settings']['fontawesome']['all'] || $this->config['settings']['fontawesome']['brand'] || $this->config['settings']['fontawesome']['solid'] || $this->config['settings']['fontawesome']['regular']) :
            add_action('wp_head', [$this, 'inline_fontawesome'], 11);
            add_action('admin_head', [$this, 'add_fontawesome_to_admin'], 11);
        endif;

        /* Enable Google Tag Manager */
        if (isset($this->options['gtm_active'])) :
            add_action('wp_head', [$this, 'inline_tag_manager'], 0);
        endif;
    }
}
