import domReady from '@wordpress/dom-ready';

domReady(function () {
    const SITE_HEADER = document.getElementsByClassName("site-header")[0];

    const NAV_CONTAINER = document.getElementById("header-dialog-container");
    const NAV_TOGGLE_OPEN = document.getElementById("header-dialog-btn--open");
    const NAV_TOGGLE_CLOSE = document.getElementById("header-dialog-btn--close");

    const MENU_CONTAINER = document.getElementsByClassName("site-header__menu")[0];
    const MENU_LINKS = document.querySelectorAll(".site-header__menu-item");

    const MENU_FIRST_ITEM = MENU_LINKS[0].children[0];
    const MENU_LAST_ITEM = MENU_LINKS[MENU_LINKS.length - 1].children[0];

    const ATTRIBUTES = {
        MODAL: 'data-modal',
        EXPANDED: 'aria-expanded',
        TRANSITION: 'data-transition',
        STICKY: 'data-sticky'
    };

    /**
     * Open mobile menu
     * @param {PointerEvent|KeyboardEvent} [event = null] - Event object
     * @return void
     */
    async function openMobileMenu(event = null) {
        if (event) {
            event.preventDefault();
        }

        SITE_HEADER.setAttribute(ATTRIBUTES.MODAL, "open");
        NAV_TOGGLE_OPEN.setAttribute(ATTRIBUTES.EXPANDED, "true");

        document.querySelectorAll(".site-header__menu-item a")[0].focus();
    }

    /**
     * Close mobile menu
     * @return void
     */
    function closeMobileMenu() {
        SITE_HEADER.setAttribute(ATTRIBUTES.MODAL, "closed");
        NAV_TOGGLE_OPEN.setAttribute(ATTRIBUTES.EXPANDED, "false");
        NAV_TOGGLE_OPEN.focus();
    }

    /**
     * Handle sticky header
     * @return void
     */
    function handleStickyHeader() {
        document.addEventListener("scroll", () => {
            /* Set opacity to 0 to animate sticky transition */
            window.scrollY > 100
                ? SITE_HEADER.setAttribute(ATTRIBUTES.TRANSITION, "true")
                : SITE_HEADER.removeAttribute(ATTRIBUTES.TRANSITION);

            /* Set position to 'sticky' for sticky header */
            window.scrollY > 300
                ? SITE_HEADER.setAttribute(ATTRIBUTES.STICKY, "true")
                : SITE_HEADER.removeAttribute(ATTRIBUTES.STICKY);
        });
    }

    function handleKeyboardNavigation() {
        /**
         * Events to trigger on keydown event
         * Keydown event shows CURRENT focused element
         */
        document.addEventListener("keyup", (e) => {
            const isModalOpen = SITE_HEADER.getAttribute(ATTRIBUTES.MODAL) === "open";

            switch (e.key) {
                case "Tab":
                    break;
                case "Enter":

                    break;
                case "Escape":
                    closeMobileMenu();
                    break;
                default:
                    break;
            }
        });

        /**
         * Events to trigger on keydown event
         * Keydown event shows LAST focused element
         * Meaning it shows the element that was focused before the current one
         */
        document.addEventListener("keydown", (e) => {
            const isModalOpen = SITE_HEADER.getAttribute(ATTRIBUTES.MODAL) === "open";

            switch (e.key) {
                case "Tab":
                    if (isModalOpen) {
                        if (e.shiftKey) {
                            /* Guard Clause. If last item, allow default behaviour */
                            if (document.activeElement === MENU_LAST_ITEM) {
                                return;
                            }

                            if (document.activeElement === NAV_TOGGLE_CLOSE) {
                                MENU_LAST_ITEM.focus();
                                e.preventDefault();
                                return;
                            }
                        }

                        if (document.activeElement === MENU_LAST_ITEM) {
                            NAV_TOGGLE_CLOSE.focus();
                            e.preventDefault();

                            return;
                        }
                    }
                    break;
                case "Enter":
                    break;
                case "Escape":
                    break;
                default:
                    break;
            }
        });
    }

    /**
     * Add listener for opening mobile menu
     * @return void
     */
    function handleToggleClicks() {
        const toggles = [NAV_TOGGLE_OPEN, NAV_TOGGLE_CLOSE];

        toggles.forEach((toggle) => {
            toggle.addEventListener("click", (e) => {
                const currentState = SITE_HEADER.getAttribute(ATTRIBUTES.MODAL);

                if (!currentState || currentState === "closed") {
                    openMobileMenu(e);
                } else {
                    closeMobileMenu();
                }
            });
        });
    }

    /**
     * Add listener for closing mobile menu when link is clicked
     * @return void
     */
    function handleLinkClicks() {
        MENU_LINKS.forEach((link) => {
            link.addEventListener("click", () => {
                closeMobileMenu();
            });
        });
    }

    /**
     * Initialize Menu
     */
    (async () => {
        try {
            handleToggleClicks();
            handleLinkClicks();
            handleStickyHeader();
            handleKeyboardNavigation();
        } catch (err) {
            console.error(err);
        }
    })();
});