import domReady from '@wordpress/dom-ready';

domReady(function () {
    const NAV_CONTAINER = document.getElementsByTagName("header")[0];
    const NAV_MOBILE_TOGGLE = document.getElementsByClassName("header__toggle")[0];
    const NAV_LINKS = document.querySelectorAll(".header__menu .menu-item");

    /**
     * Enable sticky header
     * @return void
     */
    function enableStickyHeader() {
        if (!NAV_CONTAINER) return;

        document.addEventListener("scroll", () => {
            /* Set opacity to 0 to animate sticky transition */
            window.scrollY > 100
                ? NAV_CONTAINER.classList.add("has-transition")
                : NAV_CONTAINER.classList.remove("has-transition");

            /* Set position to 'sticky' for sticky header */
            window.scrollY > 300
                ? NAV_CONTAINER.classList.add("is-sticky")
                : NAV_CONTAINER.classList.remove("is-sticky");
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

    (async () => {
        try {
            enableStickyHeader();
            openMobileMenu();
            closeMobileMenu();
        } catch (err) {
            console.error(err);
        }
    })();
});