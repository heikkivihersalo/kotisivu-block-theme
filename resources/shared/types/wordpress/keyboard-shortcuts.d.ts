declare module '@wordpress/keyboard-shortcuts' {
	function useShortcut(
		name: string,
		useCallback: (event: KeyboardEvent) => void
	): void;

	export { useShortcut };
}
