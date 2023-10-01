import { useSelect } from '@wordpress/data';

/**
 * Hook to get posts
 * @param perPage Number of posts to return per page
 * @returns {array}
 * 
 * Original source:
 * @link https://pluginmachine.com/creating-reusable-react-hooks-for-the-wordpress-block-editor-or-whatever/
 */
const usePosts = (perPage = 6) => {
    return useSelect((select) => {
        const data = select('core').getEntityRecords('postType', 'post', {
            per_page: perPage,
        });
        return data || [];
    });
};

export { usePosts };
