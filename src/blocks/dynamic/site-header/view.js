import domReady from '@wordpress/dom-ready';
import { openMobileMenu, closeMobileMenu, getStickyHeaderPadding, getStickyHeaderWidth } from "./scripts/helpers";

domReady(function () {
    /**
     * Get DOM elements
     */
    const elements = {
        header: document.getElementsByTagName("header")[0],
        toggle: document.getElementsByClassName("header__toggle")[0],
        links: document.querySelectorAll(".header__menu a")
    };

    /**
     * Init sticky header
     */
    let scroll = window.scrollY <= 100 ? Math.round(window.scrollY) : 100;

    if( scroll > 3) {
        elements.header.style.setProperty("--_inline-background-color", `hsla(206, 56%, 20%, ${scroll / 100})`);
        elements.header.style.setProperty("--_inline-padding", `${getStickyHeaderPadding(scroll)}px`);
        elements.header.style.setProperty("--_inline-width", `${getStickyHeaderWidth(scroll)}rem`);

        window.scrollY > 50 ? elements.header.classList.add("sticky") : elements.header.classList.remove("sticky");
    }

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
     * Set listener for sticky header
     */
    document.addEventListener("scroll", (event) => {
        let scroll = window.scrollY <= 100 ? Math.round(window.scrollY) : 100;

        elements.header.style.setProperty("--_inline-background-color", `hsla(206, 56%, 20%, ${scroll / 100})`);
        elements.header.style.setProperty("--_inline-padding", `${getStickyHeaderPadding(scroll)}px`);
        elements.header.style.setProperty("--_inline-width", `${getStickyHeaderWidth(scroll)}rem`);

        if (window.scrollY > 50) {
            elements.header.classList.add("sticky");
        } else {
            elements.header.classList.remove("sticky");
        }
    });
});