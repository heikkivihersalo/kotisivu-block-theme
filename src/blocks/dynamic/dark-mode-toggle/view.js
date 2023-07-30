import domReady from '@wordpress/dom-ready';

/**
 * Change WordPress color variables
 * @return {void}
 */
const changeCSSVariables = () => {
    const body = document.getElementsByTagName("body")[0];
    const bodyStyles = getComputedStyle(body);

    const currentBackground = bodyStyles.getPropertyValue("--wp--preset--color--background");
    const currentForeground = bodyStyles.getPropertyValue("--wp--preset--color--foreground");

    body.style.setProperty("--wp--preset--color--background", currentForeground);
    body.style.setProperty("--wp--preset--color--foreground", currentBackground);
};

/**
 * Update data attributes
 * @return {void}
 */
const updateDataAttributes = () => {
    const html = document.getElementsByTagName("html")[0];
    const schemeIcon = document.querySelector(".scheme-icon");

    if (html.getAttribute("data-scheme") == "dark") {
        html.setAttribute("data-scheme", "light");
        schemeIcon.setAttribute("data-scheme", "light");
    } else {
        html.setAttribute("data-scheme", "dark");
        schemeIcon.setAttribute("data-scheme", "dark");
    }
};

/**
 * On DOM ready
 */
domReady(function () {
    const html = document.getElementsByTagName("html")[0];
    const schemeToggle = document.querySelectorAll(".scheme-toggle");
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

    /**
     * Check current cookies and set icon according to used scheme
     */
    const schemeIcon = document.querySelector(".scheme-icon");
    const cookies = document.cookie.split(";");

    /* Dark Mode */
    if (cookies.some((c) => c.includes("color-scheme=dark"))) {
        schemeIcon.setAttribute("data-scheme", "dark");

        /* Light Mode */
    } else if (cookies.some((c) => c.includes("color-scheme=light"))) {
        schemeIcon.setAttribute("data-scheme", "light");
    }

    /**
     * Loop through all elements including '.scheme-toggle' class
     */
    schemeToggle.forEach((btn) => {
        btn.addEventListener("click", () => {
            /**
             * Check if user has preferred dark mode and no scheme has been set 
             * -> set dark mode as default
             */
            if (html.getAttribute("data-scheme") == null && prefersDarkMode.matches) {
                html.setAttribute("data-scheme", "dark");
                schemeIcon.setAttribute("data-scheme", "dark");
            } else {
                /**
                 * If no preferred scheme has been set or user has preferred light mode
                 * -> continue schema switching as normal
                 */

                /* Change CSS variables based to current value */
                changeCSSVariables();

                /* Update data attributes based to current value */
                updateDataAttributes();
            }

            /** 
             * Add cookie to user browser according to used scheme
             * Cookie age is set to 30 days
             */
            document.cookie =
                "color-scheme = " +
                html.getAttribute("data-scheme") +
                "; " +
                "max-age=2592000; path=/; samesite=strict; secure";
        });
    });

});
