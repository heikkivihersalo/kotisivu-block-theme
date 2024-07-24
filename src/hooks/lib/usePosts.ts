import { useSelect } from '@wordpress/data';

/**
 * Hook to get posts
 * @param {number} perPage Number of posts to return per page
 * @return {Array}
 *
 * Original source:
 * {@link https://pluginmachine.com/creating-reusable-react-hooks-for-the-wordpress-block-editor-or-whatever/}
 */
const usePosts = (perPage: number = 6): Array<any> => {
	return useSelect((select: any) => {
		const data = select('core').getEntityRecords('postType', 'post', {
			per_page: perPage,
		});
		return data || [];
	});
};

export { usePosts };

declare module '@wordpress/data' {
	function useSelect<T>(selector: (select: any) => T): T;
}
