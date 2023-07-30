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
            const cookies = document.cookie.split(";");
            const html = document.getElementsByTagName("html")[0];
            const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
            const isDarkMode = cookies.some((s => s.includes("color-scheme=dark")));
            const isLightMode = cookies.some((s => s.includes("color-scheme=light")));
            const noSchemeCookies = !isLightMode && !isDarkMode;

            /**
             * If no color scheme cookie is set and user prefers dark mode, set cookie and reload page
             */
            if (noSchemeCookies && prefersDarkMode.matches) {
                document.cookie =
                    "color-scheme = " +
                    "dark" +
                    "; " +
                    "max-age=2592000; path=/; samesite=strict; secure";
                window.location.reload();
            }

            /**
             * Otherwise continue as normal and set data-scheme attribute from cookie
             */
            if (isDarkMode) {
                html.setAttribute("data-scheme", "dark");
            } else {
                html.setAttribute("data-scheme", "light");
            }
        </script>
        <?php
    }

    function filter_dark_mode_color_variables($theme_json) {
        $color_scheme = isset($_COOKIE['color-scheme']) && $_COOKIE['color-scheme'] == 'dark' ? 'dark' : 'light';

        $new_data = array(
            'version'  => 2,
            "settings" => array(
                'color' => array(
                    'palette' => array(
                        array(
                            'slug' => 'background',
                            'color' => 'hsl(180, 5%, 8%)',
                            'name' => 'Background'
                        ),
                        array(
                            'slug' => 'foreground',
                            'color' => 'hsl(0, 0%, 100%)',
                            'name' => 'Foreground'
                        ),
                    )
                )
            )
        );

        if ($color_scheme == 'dark') {
            return $theme_json->update_with($new_data);
        }

        return $theme_json;
    }

    /**
     * Inline Font Awesome
     * @return void 
     */
    public function inline_fontawesome(): void {
        if (isset($this->config['settings']['fontawesome'])) :
            $folder = $this->parent_uri . '/public/icons/fontawesome/css/';

            foreach ($this->config['settings']['fontawesome'] as $slug => $is_enabled) :
                if (!$is_enabled) continue;

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
        add_action('wp_head', [$this, 'inline_utilities_css'], 11);
        add_action('wp_head', [$this, 'inline_custom_css'], 11);

        /* Enable dark mode */
        if ($this->config['settings']['dark-mode']) :
            add_action('wp_head', [$this, 'inline_dark_mode_cookie'], 0);
            add_filter('wp_theme_json_data_theme', [$this, 'filter_dark_mode_color_variables']);
        endif;

        /* Enable Font Awesome */
        if ($this->config['settings']['fontawesome']['all'] || $this->config['settings']['fontawesome']['brand'] || $this->config['settings']['fontawesome']['solid'] || $this->config['settings']['fontawesome']['regular']) :
            add_action('wp_head', [$this, 'inline_fontawesome'], 11);
            add_action('admin_head', [$this, 'add_fontawesome_to_admin'], 11);
        endif;

        /* Enable Google Tag Manager */
        if (isset($this->analytics['tagmanager-active'])) :
            add_action('wp_head', [$this, 'inline_tag_manager'], 0);
        endif;
    }
}
