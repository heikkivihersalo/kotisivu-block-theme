/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import PromptControls from './components/PromptControls.tsx';

/**
 * Filters
 */
addFilter(
	'editor.BlockEdit',
	'kotisivu-block-theme/ai-prompt-controls',
	PromptControls
);
