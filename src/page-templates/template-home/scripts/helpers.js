/**
 * Creates DOM element from given html string
 * @param {string} string
 * @return {HTMLUnknownElement} DOM element // TODO: Check if this is correct
 */
const createPostCardNode = (string) => {
	const element = document.createElement('div'); // Create temporary 'div' -element
	element.innerHTML = string;
	return element.firstChild; // exclude temporary div from return statement
};

/**
 * Creates DOM element from given string
 * @param {string} errorMessage
 * @return {HTMLDivElement} - Error message as a DOM element
 */
const createErrorNode = (errorMessage) => {
	const element = document.createElement('div');
	element.className = 'posts__message--error';
	element.innerHTML = `<p>${errorMessage}</p>`;

	return element;
};

/**
 * Fetches posts from ajax
 * @param {Object} options         - Options for fetch request
 * @param {string} options.url     - URL for fetch request
 * @param {Object} options.data    - Data for fetch request
 * @param {Object} options.headers - Headers for fetch request
 * @return {Object} Posts and post count
 */
const getPosts = async ({ url, data, headers }) => {
	const response = await fetch(url, {
		method: 'POST',
		headers,
		body: new URLSearchParams(data).toString(),
	});

	const posts = await response.json();

	return {
		posts: posts.posts,
		postCount: posts.post_count,
	};
};

export { getPosts, createPostCardNode, createErrorNode };
