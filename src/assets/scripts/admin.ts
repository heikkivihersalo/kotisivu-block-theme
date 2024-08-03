import '../styles/admin.css';

/**
 * Internal dependencies
 */
declare const wp: any;

/**
 * Register the AI open shortcut
 */
wp.data.dispatch('core/keyboard-shortcuts').registerShortcut({
	// Shortcut name (identifier)
	name: 'kotisivu-block-theme/shortcut-ai-open',

	// Catergory (global, block or selection)
	category: 'block',

	// Description
	description: 'Generate AI content',

	// The key combination used to trigger the shortcut
	// Could be just a single character or a character with
	// a modifier.
	keyCombination: {
		modifier: 'primary',
		character: '.',
	},
});
