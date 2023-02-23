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
 * Fetches posts from ajax
 * @param {*} { url, data, headers }
 * @return {*} 
 */
const getPosts = async ({ url, data, headers }) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: (new URLSearchParams(data)).toString()
    });

    const posts = await response.json();
    
    return {
        posts: posts.posts,
        postCount: posts.post_count
    }
}

/**
 * Handle user requests about loading more blog posts
 * @return void
 */
function loadMoreBlogPosts() {
    /**
     * Helper functions
     */

    /**
     * Init variables
     */
    let postsLoaded = BLOG_POST_GRID.childElementCount; // Init to amount of child elements.

    /**
     * Send fetch request to ajax and update current page value
     */
    BLOG_LOAD_MORE.addEventListener('click', () => {
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

export { getPosts, createPostCardNode, createErrorNode }
