import domReady from '@wordpress/dom-ready';

domReady(function () {
	const LANG_PICKER_DROPDOWN = document.getElementsByClassName(
		'language-picker__dropdown'
	)[0] as HTMLElement;
	const LANG_PICKER_BUTTON = document.getElementsByClassName(
		'language-picker__button'
	)[0] as HTMLElement;

	/**
	 * Add listener for opening country picker
	 * @return {void}
	 */
	function handleCountryPickerClicks(): void {
		if (!LANG_PICKER_BUTTON) return;

		document.addEventListener('click', (e: MouseEvent) => {
			if (
				!LANG_PICKER_DROPDOWN.contains(e.target as HTMLElement) &&
				!LANG_PICKER_BUTTON.contains(e.target as HTMLElement)
			) {
				LANG_PICKER_BUTTON.setAttribute('aria-expanded', 'false');
				LANG_PICKER_DROPDOWN.setAttribute('data-open', 'false');
			}
		});

		LANG_PICKER_BUTTON.addEventListener('click', () => {
			const currentState =
				LANG_PICKER_BUTTON.getAttribute('aria-expanded');

			if (currentState === 'false') {
				LANG_PICKER_BUTTON.setAttribute('aria-expanded', 'true');
				LANG_PICKER_DROPDOWN.setAttribute('data-open', 'true');
			} else {
				LANG_PICKER_BUTTON.setAttribute('aria-expanded', 'false');
				LANG_PICKER_DROPDOWN.setAttribute('data-open', 'false');
			}
		});
	}

	/**
	 * Handle country picker keyboard events
	 * @return {void}
	 */
	function handleCountryPickerKeyboard(): void {
		LANG_PICKER_BUTTON.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				LANG_PICKER_BUTTON.click();
			}
		});

		LANG_PICKER_BUTTON.addEventListener('keyup', (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				LANG_PICKER_BUTTON.setAttribute('aria-expanded', 'false');
			}
		});
	}

	(async () => {
		try {
			handleCountryPickerClicks();
			handleCountryPickerKeyboard();
		} catch (err) {
			console.error(err);
		}
	})();
});
