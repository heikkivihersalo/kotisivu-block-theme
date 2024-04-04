import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';
import {
	getPosts,
	createPostCardNode,
	createErrorNode,
} from './scripts/helpers';

/**
 * Handle user requests about loading more blog posts
 * @return {void}
 */
domReady(function () {
	const elements = {
		container: document.getElementById('posts-container'),
		list: document.getElementById('posts-list'),
		cards: document.querySelectorAll('.posts__list-item'),
		loadMore: document.getElementById('load-next-posts'),
	};

	const counters = {
		postsLoaded: elements.list.childElementCount,
	};

	const request = {
		url: AJAX.url, // eslint-disable-line no-undef
		data: {
			action: 'get_next_page',
			security: AJAX.nonce, // eslint-disable-line no-undef
			paged: 2, // Init to 2 because first page is already loaded.
		},
		headers: {
			'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
	};

	/**
	 * Send fetch request to ajax and update current page value
	 */
	elements.loadMore.addEventListener('click', async () => {
		try {
			//Get posts from ajax
			const data = await getPosts(request);

			// Insert to new post elements DOM
			data.posts.forEach((post) => {
				elements.list.append(createPostCardNode(post.content));
				counters.postsLoaded++;
			});

			//Update current page index
			request.data.paged++;

			// If reached end of the list hide add more button
			if (counters.postsLoaded === data.postCount) {
				elements.loadMore.disabled = true;
				elements.loadMore.setAttribute('aria-disabled', 'true');
			}
		} catch (err) {
			elements.list.append(
				createErrorNode(
					__('Error while loading more posts', 'kotisivu-block-theme')
				)
			);
			console.error('Error:', err);
		}
	});

	/**
	 * Handle post card clicks
	 */
	elements.cards.forEach((card) => {
		card.addEventListener('click', () => {
			window.location.assign(card.dataset.url);
		});
	});
});
