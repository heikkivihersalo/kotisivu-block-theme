import { useSelect } from '@wordpress/data';

/**
 * Get attributes of the parent block
 *
 * @param  clientId
 * @returns {Object} attributes
 * 
 * Original source:
 * @link https://pluginmachine.com/creating-reusable-react-hooks-for-the-wordpress-block-editor-or-whatever/
 */
const useParentBlockAttributes = (clientId) => {
    const attributes = useSelect((select) => {
        const parentClientId = select('core/block-editor').getBlockHierarchyRootClientId(clientId);
        return select('core/block-editor').getBlockAttributes(parentClientId);
    }, [clientId]);

    return attributes;
};

export { useParentBlockAttributes };
