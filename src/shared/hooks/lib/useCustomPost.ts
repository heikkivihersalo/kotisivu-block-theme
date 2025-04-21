import { useSelect } from '@wordpress/data';

/**
 * Hook to get custom posts
 * @param {number} perPage  Number of posts to return per page
 * @param {string} postType Post type to query
 * @return {Array}
 *
 * Original source:
 * {@link https://pluginmachine.com/creating-reusable-react-hooks-for-the-wordpress-block-editor-or-whatever/}
 */
const useCustomPosts = (perPage: number = 6, postType: string): Array<any> => {
	return useSelect((select) => {
		const data = select('core').getEntityRecords('postType', postType, {
			per_page: perPage,
		});

		return data || [];
	});
};

export { useCustomPosts };

declare module '@wordpress/data' {
	function useSelect<T>(selector: (select: any) => T): T; // eslint-disable-line
}
