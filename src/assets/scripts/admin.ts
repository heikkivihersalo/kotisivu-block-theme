import '../styles/admin.css';

/**
 * Internal dependencies
 */
declare const wp: any;

/**
 * Register the AI shortcuts
 */
wp.data.dispatch('core/keyboard-shortcuts').registerShortcut({
	name: 'kotisivu-block-theme/shortcut-ai-open' /* unique identifier */,
	category: 'block' /* global, block, selection */,
	description:
		'Shortcut to open the open-ai popover' /* human-readable description */,
	keyCombination: {
		modifier: 'primary',
		character: '.',
	},
});
