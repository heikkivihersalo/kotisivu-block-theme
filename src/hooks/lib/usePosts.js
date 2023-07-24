import { useSelect } from '@wordpress/data';

/**
 * Get posts
 * @param perPage Number of posts to return per page
 * @returns {array}
 * 
 * Original source:
 * @link https://pluginmachine.com/creating-reusable-react-hooks-for-the-wordpress-block-editor-or-whatever/
 */
const usePosts = (perPage = 6) => {
    /**
     * Get the posts
     */
    const result = useSelect((select) => {
        let data = select('core').getEntityRecords('postType', 'post', {
            per_page: perPage,
        });
        if (!data) {
            return [];
        }
        return data;
    });

    return result;
};

export { usePosts };