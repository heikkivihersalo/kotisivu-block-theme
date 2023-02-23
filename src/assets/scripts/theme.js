/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
1.0 Settings
2.0 Constants
3.0 Initialization / Main
4.0 Functions
  4.1 Navigation
    4.1.1 enableStickyHeader()
    4.1.2 openMobileMenu()
    4.1.3 closeMobileMenu()
  4.2 Blog
    4.2.1 loadMoreBlogPosts()
--------------------------------------------------------------*/

/*--------------------------------------------------------------
  ==============================================================
  >>> 1.0 Settings
  ==============================================================
  *
  *
  *
  * 
  * 
  * 
--------------------------------------------------------------*/

"use strict";

/**
 * Translations
 * 
 * Inside your scripts you will then be able to use wp-18n as follows:
 * __( '__', 'my-domain' );
 * _x( '_x', '_x_context', 'my-domain' );
 * _n( '_n_single', '_n_plural', number, 'my-domain' );
 * _nx( '_nx_single', '_nx_plural', number, '_nx_context', 'my-domain' );
 * 
 * These functions mirror their PHP counterparts and can be used in exactly the same manner. 
 * 
 * @url https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
 */
const { __, _x, _n, _nx } = wp.i18n;


/*--------------------------------------------------------------
  ==============================================================
  >>> 2.0 Constants
  ==============================================================
  *
  *
  *
  * 
  * 
  * 
--------------------------------------------------------------*/

/* General */
const TEXTDOMAIN = "kotisivu-block-theme";

/* Ajax */
const AJAX_URL = PHP_VARIABLES.ajax_url;
const AJAX_NONCE = PHP_VARIABLES.ajax_nonce;

/* Navigation */
const NAV_CONTAINER = document.getElementsByTagName("header")[0];
const NAV_MOBILE_TOGGLE = document.getElementsByClassName("menu__toggle")[0];
const NAV_LINKS = document.querySelectorAll(".wp-block-pages-list__item");

/* Blog */
const BLOG_POST_CONTAINER = document.getElementById("blog-post-container");
const BLOG_POST_GRID = document.getElementById("blog-post-list");
const BLOG_POST_CARDS = document.querySelectorAll(".blog-grid__item");
const BLOG_LOAD_MORE = document.getElementById("blog-load-more");

/*--------------------------------------------------------------
  ==============================================================
  >>> 3.0 Initialization / Main
  ==============================================================
  *
  *
  *
  * 
  * 
  * 
--------------------------------------------------------------*/

(async () => {
    /**
     * Mobile menu
     */
    try {
        enableStickyHeader();
        openMobileMenu();
        closeMobileMenu();
    } catch (err) {
        console.error(err);
    }
    /**
     * Blog posts
     */
    try {
        handlePostCardClick();
        loadMoreBlogPosts();
    } catch (err) {
        console.error(err);
    }
})();


/*--------------------------------------------------------------
  ==============================================================
  >>> 4.0 Functions
  ==============================================================
  *
  *
  *
  * 
  * 
  * 
--------------------------------------------------------------*/

/*--------------------------------------------------------------
  4.1 Navigation
--------------------------------------------------------------*/

/**
 * Enable sticky header
 * @return void
 */
function enableStickyHeader() {
    if (typeof NAV_CONTAINER == "undefined" || NAV_CONTAINER == undefined) return;

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
    if (typeof NAV_CONTAINER == "undefined" || NAV_CONTAINER == undefined) return;

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
    if (typeof NAV_CONTAINER == "undefined" || NAV_CONTAINER == undefined) return;

    NAV_LINKS.forEach((link) => {
        link.addEventListener("click", () => {
            NAV_CONTAINER.classList.remove("active");
            NAV_MOBILE_TOGGLE.classList.remove("active");
        });
    });
}

/*--------------------------------------------------------------
  4.2 Blog
--------------------------------------------------------------*/
function handlePostCardClick() {
    if (typeof BLOG_POST_CARDS == "undefined" || BLOG_POST_CARDS == undefined) return;

    BLOG_POST_CARDS.forEach((card) => {
        card.addEventListener("click", () => {
            window.location.assign(card.dataset.url);
        });
    })
}

/**
 * Handle user requests about loading more blog posts
 * @return void
 */
function loadMoreBlogPosts() {
    /**
     * Guard clauses
     */
    if (typeof BLOG_POST_GRID == "undefined" || BLOG_POST_GRID == undefined) return;

    /**
     * Helper functions
     */

    /**
     * Creates DOM element from given html string
     * @param {string} string 
     * @returns Given html string as a DOM element
     */
    const createPostCardNode = (string) => {
        let element = document.createElement('div') // Create temporary 'div' -element
        element.innerHTML = string;
        return element.firstChild.nextSibling; // exclude temporary div from return statement
    }

    /**
     * Creates DOM element from given string
     * @param {string} errorMessage 
     */
    const createErrorNode = (errorMessage) => {
        let element = document.createElement('div');
        element.className = "blog-post-list__error-message";
        element.innerHTML = `<p>${errorMessage}</p>`;

        return element;
    }

    /**
     * Init variables
     */
    let currentPage = 2; // Initial query starts with page one, so we'll start with page two from here
    let loadMoreButton = document.querySelector('#blog-post-container > .wp-block-button');
    let postsLoaded = BLOG_POST_GRID.childElementCount; // Init to amount of child elements.

    /**
     * Send fetch request to ajax and update current page value
     */
    BLOG_LOAD_MORE.addEventListener('click', () => {
        let data = {
            action: 'load_more_posts',
            security: AJAX_NONCE,
            paged: currentPage
        };

        let headers = {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }

        /**
         * Fetch next posts
         */
        fetch(AJAX_URL, {
            method: 'POST',
            headers: headers,
            body: (new URLSearchParams(data)).toString()
        }).then((response) => response.json())
            .then((data) => {
                /**
                 * Save response data
                 */
                let posts = data.posts;
                let postCount = data.post_count

                /** 
                 * Insert to new post elements DOM
                 */
                posts.forEach((post) => {
                    BLOG_POST_GRID.append(createPostCardNode(post.content));
                    postsLoaded++;
                });

                /**
                 * Update current page index
                 */
                currentPage++;

                /**
                 * Log succesful fetch
                 */
                if (data.length == 0) {
                    console.info(__('No more posts to fetch:', TEXTDOMAIN));
                } else {
                    console.info(__('Posts fetched succesfully:', TEXTDOMAIN), posts);
                }

                /**
                 * If reached end of the list hide add more button
                 */
                if (postsLoaded == postCount) {
                    BLOG_LOAD_MORE.disabled = true;
                    BLOG_LOAD_MORE.setAttribute("aria-disabled", "true");
                }

            })
            .catch((error) => {
                /**
                 * Append error message to DOM
                 */
                BLOG_POST_GRID.append(createErrorNode(__('Error while loading more posts', TEXTDOMAIN)));

                /**
                 * Log error
                 */
                console.error('Error:', error);
            });
    });
}
