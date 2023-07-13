import domReady from '@wordpress/dom-ready';
import { openMobileMenu, closeMobileMenu, getStickyHeaderPadding, getStickyHeaderWidth } from "./scripts/helpers";

domReady(function () {
    // ========================
    // ====== CONSTANTS =======
    // ========================

    const NAV_CONTAINER = document.getElementsByTagName("header")[0];
    const NAV_MOBILE_TOGGLE = document.getElementsByClassName("header__toggle")[0];
    const NAV_LINKS = document.querySelectorAll(".wp-block-pages-list__item");

    // ========================
    // ====== FUNCTIONS =======
    // ========================

    /**
     * Enable sticky header
     * @return void
     */
    function enableStickyHeader() {
        if (!NAV_CONTAINER) return;

        document.addEventListener("scroll", () => {
            /* Set opacity to 0 to animate sticky transition */
            window.scrollY > 100
                ? NAV_CONTAINER.classList.add("sticky-opacity")
                : NAV_CONTAINER.classList.remove("sticky-opacity");

            /* Set position to 'sticky' for sticky header */
            window.scrollY > 500
                ? NAV_CONTAINER.classList.add("sticky-header")
                : NAV_CONTAINER.classList.remove("sticky-header");
        });
    }

    /**
     * Add listener for opening mobile menu
     * @return void
     */
    function openMobileMenu() {
        if (!NAV_CONTAINER) return;

        NAV_MOBILE_TOGGLE.addEventListener("click", () => {
            const currentState = NAV_MOBILE_TOGGLE.getAttribute("data-state");

            if (!currentState || currentState === "closed") {
                NAV_MOBILE_TOGGLE.setAttribute("data-state", "opened");
                NAV_MOBILE_TOGGLE.setAttribute("aria-expanded", "true");
            } else {
                NAV_MOBILE_TOGGLE.setAttribute("data-state", "closed");
                NAV_MOBILE_TOGGLE.setAttribute("aria-expanded", "false");
            }

            NAV_CONTAINER.classList.toggle("active");
        });
    }

    /**
     * Add listener for closing mobile menu
     * @return void
     */
    function closeMobileMenu() {
        if (!NAV_CONTAINER) return;

        NAV_LINKS.forEach((link) => {
            link.addEventListener("click", () => {
                NAV_CONTAINER.classList.remove("active");
                NAV_MOBILE_TOGGLE.classList.remove("active");
            });
        });
    }

    // ========================
    // ========= INIT =========
    // ========================

    (async () => {
        try {
            /**
             * Mobile menu
             */
            enableStickyHeader();
            openMobileMenu();
            closeMobileMenu();
        } catch (err) {
            console.error(err);
        }
    })();
});