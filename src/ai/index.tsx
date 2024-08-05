/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import TextPromptControls from './components/TextPromptControls.tsx';

/**
 * Filters
 */
addFilter(
	'editor.BlockEdit',
	'kotisivu-block-theme/ai-controls',
	TextPromptControls
);
