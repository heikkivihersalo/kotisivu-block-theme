/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import AiControls from './components/AiControls.tsx';
import './style.css';

/**
 * Filters
 */
addFilter('editor.BlockEdit', 'kotisivu-block-theme/ai-controls', AiControls);
