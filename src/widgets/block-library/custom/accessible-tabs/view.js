import domReady from '@wordpress/dom-ready';

const ARROW = {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
};

/**
 * Handle DOM ready
 */
domReady(() => {
	/**
	 * Get all tabs and panels elements
	 */
	const TABLIST = document.querySelector('.accessible-tabs__list');
	const TABS = [
		...TABLIST.querySelectorAll('.accessible-tabs__list-item button'),
	];

	const FIRST_TAB = TABS[0];
	const LAST_TAB = TABS[TABS.length - 1];

	const TABPANEL = document.querySelector(
		'.accessible-tabs__panel-container'
	);
	const PANELS = [...TABPANEL.querySelectorAll('.accessible-tabs__panel')];

	/**
	 * Handle click events
	 */
	TABS.forEach((element) => {
		element.addEventListener('click', function () {
			setSelectedTab(element, TABS, PANELS);
		});
	});

	/**
	 * Handle panel tab index
	 *
	 */
	PANELS.forEach((element) => {
		determineTabindex(element);
	});

	/**
	 * Handle keyboard navigation
	 */
	TABS.forEach((element) => {
		element.addEventListener('keydown', function (e) {
			handleKeyboardClick(e, element, TABS, FIRST_TAB, LAST_TAB);
		});
	});
});

/**
 * Set selected tab
 * @param {HTMLElement} element Tab element
 * @param {Array} tabs Tabs array
 * @param {Array} panels Panels array
 * @return {void}
 */
function setSelectedTab(element, tabs, panels) {
	const selectedId = element.id;

	/** Handle tabs */
	tabs.forEach((e) => {
		const id = e.getAttribute('id');
		if (id === selectedId) {
			e.removeAttribute('tabindex');
			e.setAttribute('aria-selected', 'true');
		} else {
			e.setAttribute('tabindex', '-1');
			e.setAttribute('aria-selected', 'false');
		}
	});

	/** Handle panels */
	panels.forEach((e) => {
		const panelId = e.getAttribute('id');
		if (panelId === selectedId.replace('tab-', 'panel-')) {
			e.removeAttribute('hidden');
		} else {
			e.setAttribute('hidden', 'true');
		}
	});
}

/**
 * Determine tab index
 * If there are no focusable elements, set tabindex to 0
 * Otherwise set tabindex to -1
 * @param {HTMLElement} element Tab element
 * @return {void}
 */
function determineTabindex(element) {
	const focusableElements = element.querySelectorAll(
		'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
	).length;

	if (focusableElements === 0) {
		element.setAttribute('tabindex', '0');
	} else {
		element.setAttribute('tabindex', '-1');
	}
}

/**
 * Handle keyboard click
 * @param {Event} event Keyboard event
 * @param {HTMLElement} element Tab element
 * @param {Array} tabs Tabs array
 * @param {HTMLElement} firstTab First tab element
 * @param {HTMLElement} lastTab Last tab element
 * @return {void}
 */
function handleKeyboardClick(event, element, tabs, firstTab, lastTab) {
	if (event.keyCode === ARROW.UP || event.keyCode === ARROW.LEFT) {
		if (element === firstTab) {
			event.preventDefault();
			lastTab.focus();
		} else {
			event.preventDefault();
			const focusableElement = tabs.indexOf(element) - 1;
			tabs[focusableElement].focus();
		}
	} else if (event.keyCode === ARROW.DOWN || event.keyCode === ARROW.RIGHT) {
		if (element === lastTab) {
			event.preventDefault();
			firstTab.focus();
		} else {
			event.preventDefault();
			const focusableElement = tabs.indexOf(element) + 1;
			tabs[focusableElement].focus();
		}
	}
}
