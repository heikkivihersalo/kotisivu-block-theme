/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
1.0 Mobile Menu Toggle
  1.1 Add listener for opening mobile menu
  1.2 Add listener for closing mobile menu
2.0 Exports
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
  2.0 Exports
--------------------------------------------------------------*/

export { openMobileMenu, closeMobileMenu }
