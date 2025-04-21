import { useSelect } from '@wordpress/data';

type BlockEditSelector = {
	getBlockHierarchyRootClientId: (clientId: string) => string;
	getBlockAttributes: (clientId: string) => Object;
};

/**
 * Hook to get attributes of the parent block
 *
 * @param {string} clientId
 * @return {Object} attributes of the parent block
 *
 * Original source:
 * {@link https://pluginmachine.com/creating-reusable-react-hooks-for-the-wordpress-block-editor-or-whatever/}
 */
const useParentBlockAttributes = (clientId: string): object => {
	return useSelect(
		(select) => {
			const { getBlockHierarchyRootClientId, getBlockAttributes } =
				select('core/block-editor') as BlockEditSelector;

			const parentClientId = getBlockHierarchyRootClientId(clientId);

			return getBlockAttributes(parentClientId);
		},
		[clientId]
	);
};

export { useParentBlockAttributes };
