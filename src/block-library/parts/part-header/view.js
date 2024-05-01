import domReady from '@wordpress/dom-ready';

// TODO: Handle arrow navigation
// TODO: Handle rest of the keyboard navigation
domReady(function () {
	const dialog = {
		container: document.getElementById('header-dialog-container'),
		toggleOpen: document.getElementById('header-dialog-btn--open'),
		toggleClose: document.getElementById('header-dialog-btn--close'),
	};

	const site = {
		header: document.getElementsByTagName('header')[0],
		content: document.getElementsByClassName('content-area')[0],
		footer: document.getElementsByTagName('footer')[0],
	};

	const menu = {
		container: document.getElementsByClassName('site-header__menu')[0],
		links: document.querySelectorAll('.site-header__menu-item'),
		first: document.querySelectorAll('.site-header__menu-item a')[0],
		last: document.querySelectorAll(
			'.site-header__menu-item:last-child > :is(a, span)'
		)[0],
	};

	const attributes = {
		modal: 'data-modal',
		expanded: 'aria-expanded',
		transition: 'data-transition',
		sticky: 'data-sticky',
	};

	(async () => {
		try {
			handleToggleClicks(site, dialog, menu, attributes);
			handleLinkClicks(site, dialog, menu, attributes);
			handleStickyHeader(site.header, attributes);
			handleKeyboardNavigation(site, dialog, menu, attributes);
		} catch (err) {
			console.error(err);
		}
	})();
});

/**
 * Add listener for opening mobile menu
 * @param {Object}      site                - Site elements object
 * @param {HTMLElement} site.header         - Site header element
 * @param {HTMLElement} site.content        - Site content element
 * @param {HTMLElement} site.footer         - Site footer element
 * @param {Object}      dialog              - Dialog elements object
 * @param {HTMLElement} dialog.container    - Dialog container element
 * @param {HTMLElement} dialog.toggleOpen   - Open mobile menu button
 * @param {HTMLElement} dialog.toggleClose  - Close mobile menu button
 * @param {Object}      menu                - Menu elements object
 * @param {HTMLElement} menu.container      - Menu container element
 * @param {NodeList}    menu.links          - Menu links
 * @param {Object}      attributes          - Attributes object
 * @param {string}      attributes.modal    - Modal attribute. Default is 'data-modal'
 * @param {string}      attributes.expanded - Expanded attribute. Default is 'aria-expanded'
 * @return {void}
 */
function handleToggleClicks(site, dialog, menu, attributes) {
	const toggles = [dialog.toggleOpen, dialog.toggleClose];

	toggles.forEach((toggle) => {
		toggle.addEventListener('click', (e) => {
			const currentState = site.header.getAttribute(attributes.modal);

			if (!currentState || currentState === 'closed') {
				openMobileMenu(
					e,
					site,
					dialog.toggleOpen,
					menu.first,
					attributes
				);
			} else {
				closeMobileMenu(e, site, dialog.toggleOpen, attributes);
			}
		});
	});
}

/**
 * Add listener for closing mobile menu when link is clicked
 * This prevents anchor links from not working when used in mobile device
 * @param {Object}      site                  - Site elements object
 * @param {HTMLElement} site.header           - Site header element
 * @param {HTMLElement} site.content          - Site content element
 * @param {HTMLElement} site.footer           - Site footer element
 * @param {Object}      dialog                - Dialog elements object
 * @param {HTMLElement} dialog.container      - Dialog container element
 * @param {HTMLElement} dialog.toggleOpen     - Open mobile menu button
 * @param {HTMLElement} dialog.toggleClose    - Close mobile menu button
 * @param {Object}      menu                  - Menu elements object
 * @param {HTMLElement} menu.container        - Menu container element
 * @param {NodeList}    menu.links            - Menu links
 * @param {Object}      attributes            - Attributes object
 * @param {string}      attributes.modal      - Modal attribute. Default is 'data-modal'
 * @param {string}      attributes.expanded   - Expanded attribute. Default is 'aria-expanded'
 * @param {string}      attributes.transition - Transition attribute. Default is 'data-transition'
 * @param {string}      attributes.sticky     - Sticky attribute. Default is 'data-sticky'
 * @return {void}
 */
function handleLinkClicks(site, dialog, menu, attributes) {
	menu.links.forEach((link) => {
		link.addEventListener('click', (e) => {
			if (site.header.getAttribute(attributes.modal) === 'open') {
				closeMobileMenu(e, site, dialog.toggleOpen, attributes);
			}
		});
	});
}

/**
 * Open mobile menu
 * @param {Event}       [event = null]      - Event object
 * @param {Object}      site                - Site elements object
 * @param {HTMLElement} site.header         - Site header element
 * @param {HTMLElement} site.content        - Site content element
 * @param {HTMLElement} site.footer         - Site footer element
 * @param {HTMLElement} toggleOpen          - Open mobile menu button
 * @param {HTMLElement} menuFirstElement    - First element in the mobile menu
 * @param {Object}      attributes          - Attributes object
 * @param {string}      attributes.modal    - Modal attribute. Default is 'data-modal'
 * @param {string}      attributes.expanded - Expanded attribute. Default is 'aria-expanded'
 * @return {void}
 */
async function openMobileMenu(
	event = null,
	site,
	toggleOpen,
	menuFirstElement,
	attributes = { modal: 'data-modal', expanded: 'aria-expanded' }
) {
	if (event) {
		event.preventDefault();
	}

	/**
	 * Disable site content interaction and visibility to prevent interaction with the site content when mobile menu is open
	 */
	Object.values(site).forEach((element) => {
		if (element === site.header) return;

		element.setAttribute('inert', true);
		element.setAttribute('aria-hidden', 'true');
	});

	document.getElementsByTagName('body')[0].style.overflow = 'hidden';

	/**
	 * Open mobile menu and set focus to the first element in the menu
	 */
	site.header.setAttribute(attributes.modal, 'open');
	toggleOpen.setAttribute(attributes.expanded, 'true');
	menuFirstElement.focus();
}

/**
 * Close mobile menu
 * @param {Event}       [event = null]      - Event object
 * @param {Object}      site                - Site elements object
 * @param {HTMLElement} site.header         - Site header element
 * @param {HTMLElement} site.content        - Site content element
 * @param {HTMLElement} site.footer         - Site footer element
 * @param {HTMLElement} toggleOpen          - Open mobile menu button
 * @param {Object}      attributes          - Attributes object
 * @param {string}      attributes.modal    - Modal attribute. Default is 'data-modal'
 * @param {string}      attributes.expanded - Expanded attribute. Default is 'data-expanded'
 * @return {void}
 */
function closeMobileMenu(
	event = null,
	site,
	toggleOpen,
	attributes = { modal: 'data-modal', expanded: 'data-expanded' }
) {
	if (event) {
		event.preventDefault();
	}

	/**
	 * Restore site content interaction and visibility to normal
	 */
	Object.values(site).forEach((element) => {
		if (element === site.header) return;

		element.removeAttribute('inert');
		element.removeAttribute('aria-hidden');
	});

	document.getElementsByTagName('body')[0].removeAttribute('style');

	/**
	 * Close mobile menu
	 */
	site.header.setAttribute(attributes.modal, 'closed');
	toggleOpen.setAttribute(attributes.expanded, 'false');
	toggleOpen.focus();
}

/**
 * Handle sticky header
 * @param {HTMLElement} header                - Site header element
 * @param {Object}      attributes            - Attributes object
 * @param {string}      attributes.transition - Transition attribute. Default is 'data-transition'
 * @param {string}      attributes.sticky     - Sticky attribute. Default is 'data-sticky'
 * @return {void}
 */
function handleStickyHeader(
	header,
	attributes = { transition: 'data-transition', sticky: 'data-sticky' }
) {
	document.addEventListener('scroll', () => {
		/* Set opacity to 0 to animate sticky transition */
		/* eslint-disable-next-line no-unused-expressions */
		window.scrollY > 100
			? header.setAttribute(attributes.transition, 'true')
			: header.removeAttribute(attributes.transition);

		/* Set position to 'sticky' for sticky header */
		/* eslint-disable-next-line no-unused-expressions */
		window.scrollY > 300
			? header.setAttribute(attributes.sticky, 'true')
			: header.removeAttribute(attributes.sticky);
	});
}

/**
 * Handle keyboard navigation
 * @param {Object}      site                  - Site elements object
 * @param {HTMLElement} site.header           - Site header element
 * @param {HTMLElement} site.content          - Site content element
 * @param {HTMLElement} site.footer           - Site footer element
 * @param {Object}      dialog                - Dialog elements object
 * @param {HTMLElement} dialog.container      - Dialog container element
 * @param {HTMLElement} dialog.toggleOpen     - Open mobile menu button
 * @param {HTMLElement} dialog.toggleClose    - Close mobile menu button
 * @param {Object}      menu                  - Menu elements object
 * @param {HTMLElement} menu.container        - Menu container element
 * @param {NodeList}    menu.links            - Menu links
 * @param {Object}      attributes            - Attributes object
 * @param {string}      attributes.modal      - Modal attribute. Default is 'data-modal'
 * @param {string}      attributes.expanded   - Expanded attribute. Default is 'aria-expanded'
 * @param {string}      attributes.transition - Transition attribute. Default is 'data-transition'
 * @param {string}      attributes.sticky     - Sticky attribute. Default is 'data-sticky'
 * @return {void}
 */
function handleKeyboardNavigation(site, dialog, menu, attributes) {
	/**
	 * Events to trigger on keydown event
	 * Keydown event shows CURRENT focused element
	 */
	document.addEventListener('keyup', (e) => {
		switch (e.key) {
			case 'Tab':
				break;
			case 'Enter':
				break;
			case 'Escape':
				closeMobileMenu(e, site, dialog.toggleOpen, attributes);
				break;
			default:
				break;
		}
	});

	/**
	 * Events to trigger on keydown event
	 * Keydown event shows LAST focused element
	 * Meaning it shows the element that was focused before the current one
	 */
	document.addEventListener('keydown', (e) => {
		const isModalOpen =
			site.header.getAttribute(attributes.modal) === 'open';

		switch (e.key) {
			case 'Tab':
				if (isModalOpen) {
					/* eslint-disable-next-line @wordpress/no-global-active-element */
					const currentElement = document.activeElement;

					if (e.shiftKey) {
						/* Guard Clause. If last item, allow default behaviour */
						if (currentElement === menu.last) {
							return;
						}

						if (currentElement === dialog.toggleClose) {
							menu.last.focus();
							e.preventDefault();
							return;
						}
					}

					if (currentElement === menu.last) {
						dialog.toggleClose.focus();
						e.preventDefault();
					}
				}
				break;
			case 'Enter':
				break;
			case 'Escape':
				break;
			default:
				break;
		}
	});
}
