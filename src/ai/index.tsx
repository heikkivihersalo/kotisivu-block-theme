/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import AiControls from './components/AiControls.tsx';

/**
 * Filters
 */
addFilter('editor.BlockEdit', 'kotisivu-block-theme/ai-controls', AiControls);
