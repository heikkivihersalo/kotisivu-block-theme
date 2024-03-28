/**
 * Creates DOM element from given html string
 * @param {string} string 
 * @returns Given html string as a DOM element
 */
const createPostCardNode = (string) => {
    let element = document.createElement('div') // Create temporary 'div' -element
    element.innerHTML = string;
    return element.firstChild; // exclude temporary div from return statement
}

/**
 * Creates DOM element from given string
 * @param {string} errorMessage 
 */
const createErrorNode = (errorMessage) => {
    let element = document.createElement('div');
    element.className = "posts__message--error";
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

export { getPosts, createPostCardNode, createErrorNode }
