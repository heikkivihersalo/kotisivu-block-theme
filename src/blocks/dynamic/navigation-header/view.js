import domReady from '@wordpress/dom-ready';
import { openMobileMenu, closeMobileMenu, setStickyHeader } from "./scripts/helpers";

domReady(function () {
    /**
     * Get DOM elements
     */
    const elements = {
        header: document.getElementsByTagName("header")[0],
        toggle: document.getElementsByClassName("site-nav__toggle")[0],
        links: document.querySelectorAll(".site-nav__menu a"),
        stickyOptions: {
            threshold: 1.0,
            rootMargin: '200px',
        }
    };

    /** 
     * Set listener for opening mobile menu
     */
    elements.toggle.addEventListener("click", () => {
        openMobileMenu(elements);
    });

    /** 
     * Set listener for closing mobile menu
     */
    elements.links.forEach((link) => {
        link.addEventListener("click", () => {
            closeMobileMenu(elements);
        });
    });

    /**
     * Set observer for sticky header
     */
    let stickyThreshold = elements.stickyOptions.threshold;
    let stickyMargin = elements.stickyOptions.rootMargin;

    const headerObserver = new IntersectionObserver(elements => {
        setStickyHeader(elements);
    }, {
        threshold: stickyThreshold,
        rootMargin: stickyMargin,
    });

    headerObserver.observe(elements.header);
});