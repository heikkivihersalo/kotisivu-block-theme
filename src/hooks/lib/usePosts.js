import { useSelect } from '@wordpress/data';

/**
 * Get posts
 * @param perPage Number of posts to return per page
 * @returns {{posts: *[]}}
 * 
 * Original source:
 * @link https://pluginmachine.com/creating-reusable-react-hooks-for-the-wordpress-block-editor-or-whatever/
 */
const usePosts = (perPage) => {
    const posts = useSelect((select) => {
        let data = select('core').getEntityRecords('postType', 'post', {
            per_page: perPage,
        });
        if (!data) {
            return [];
        }
        return data;
    });
    return posts;
};

export { usePosts };