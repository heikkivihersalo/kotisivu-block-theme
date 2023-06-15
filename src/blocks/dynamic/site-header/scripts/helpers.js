/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
1.0 Mobile Menu Toggle
  1.1 Add listener for opening mobile menu
  1.2 Add listener for closing mobile menu
2.0 Sticky Header
  2.1 Set class for sticky header
3.0 Exports
--------------------------------------------------------------*/

/*--------------------------------------------------------------
  1.0 Mobile Toggle
--------------------------------------------------------------*/
/**
 * Add listener for opening mobile menu
 * @param {*} { container, toggle }
 * @return void
 */
const openMobileMenu = ({ header, toggle }) => {
    const currentState = toggle.getAttribute("data-state");

    if (!currentState || currentState === "closed") {
        toggle.setAttribute("data-state", "opened");
        toggle.setAttribute("aria-expanded", "true");
    } else {
        toggle.setAttribute("data-state", "closed");
        toggle.setAttribute("aria-expanded", "false");
    }

    header.classList.toggle("active");
}

/**
 * Add listener for closing mobile menu
 * @param {*} { container, toggle, links }
 * @return void
 */
const closeMobileMenu = ({ header, toggle, links }) => {
    links.forEach((link) => {
        link.addEventListener("click", () => {
            header.classList.remove("active");
            toggle.classList.remove("active");
        });
    });
}

/*--------------------------------------------------------------
  2.0 Sticky Header
--------------------------------------------------------------*/
/**
 * Set class for sticky header
 * @return void
 */
const setStickyHeader = (elements) => {
    const {
        target,
        isIntersecting
    } = elements[0];
    
    if (isIntersecting) {
        target.classList.remove("sticky");
    } else {
        target.classList.add("sticky");
    }
}

const getStickyHeaderPadding = (scroll) => {
    return scroll <= 100 ? 50 - (scroll / 4) : 25;
}

const getStickyHeaderWidth = (scroll) => {
    return scroll <= 100 ? 30 - (scroll / 5) : 10;
}

/*--------------------------------------------------------------
  3.0 Exports
--------------------------------------------------------------*/

export { openMobileMenu, closeMobileMenu, setStickyHeader, getStickyHeaderPadding, getStickyHeaderWidth }
