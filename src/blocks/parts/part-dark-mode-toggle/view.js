import domReady from '@wordpress/dom-ready';
import { __ } from "@wordpress/i18n";

/**
 * On DOM ready
 */
domReady(function () {
    const html = document.getElementsByTagName("html")[0];
    const schemeToggleButtons = document.querySelectorAll(".scheme-toggle");
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

    /**
     * Switch to dark mode
     * @return {void}
     */
    const switchToDarkMode = () => {
        html.setAttribute("color-scheme", "dark");
        schemeToggleButtons.forEach((btn) => {
            btn.setAttribute("aria-label", __('Dark color scheme', 'kotisivu-block-theme'));
        });
    };

    /**
     * Switch to light mode
     * @return {void}
     */
    const switchToLightMode = () => {
        html.setAttribute("color-scheme", "light");
        schemeToggleButtons.forEach((btn) => {
            btn.setAttribute("aria-label", __('Light color scheme', 'kotisivu-block-theme'));
        });
    };

    /** 
     * Add cookie to user browser according to used scheme
     * Cookie age is set to 30 days
     * @return {void}
     */
    const setSchemeCookie = () => {
        document.cookie =
            "color-scheme = " +
            html.getAttribute("color-scheme") +
            "; " +
            "max-age=2592000; path=/; samesite=strict; secure";
    };

    /**
     * Write to dataLayer
     * @return {void}
     */
    const writeToDataLayer = () => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "button_click",
            category: "site_preferences",
            action: "switch_color_scheme",
            value: html.getAttribute("color-scheme"),
        });
    };

    /**
     * Initialize scheme
     */
    if (prefersDarkMode.matches && html.getAttribute("color-scheme") !== "light") {
        switchToDarkMode();
    } else {
        switchToLightMode();
    }

    /**
     * Loop through all elements including '.scheme-toggle' class
     */
    schemeToggleButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const currentScheme = html.getAttribute("color-scheme");

            /**
             * Switch to dark mode if user prefers dark mode
             */
            if (prefersDarkMode.matches) {
                currentScheme === "dark" || null ? switchToLightMode() : switchToDarkMode();
            } else {
                /**
                 * Else switch to light mode
                 */
                currentScheme === "light" || null ? switchToDarkMode() : switchToLightMode();
            }

            /**
             * Write event to dataLayer
             */
            writeToDataLayer();

            /**
             * Set cookie according to used scheme
             */
            setSchemeCookie();
        });
    });
});
