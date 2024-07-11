import domReady from '@wordpress/dom-ready';

interface Dialog {
	container: HTMLElement | null;
	toggleOpen: HTMLElement | null;
	toggleClose: HTMLElement | null;
}

interface Site {
	header: HTMLElement | null;
	content: HTMLElement | null;
	footer: HTMLElement | null;
}

interface Menu {
	container: HTMLElement | null;
	links: NodeListOf<HTMLElement>;
	first: HTMLElement | null;
	last: HTMLElement | null;
}

interface Attributes {
	modal: string;
	expanded: string;
	transition: string;
	sticky: string;
}

domReady(function () {
	const dialog: Dialog = {
		container: document.getElementById('header-dialog-container'),
		toggleOpen: document.getElementById('header-dialog-btn--open'),
		toggleClose: document.getElementById('header-dialog-btn--close'),
	};

	const site: Site = {
		header: document.getElementsByTagName('header')[0],
		content: document.getElementsByClassName(
			'content-area'
		)[0] as HTMLElement,
		footer: document.getElementsByTagName('footer')[0],
	};

	const menu: Menu = {
		container: document.getElementsByClassName(
			'site-header__menu'
		)[0] as HTMLElement,
		links: document.querySelectorAll('.site-header__menu-item'),
		first: document.querySelectorAll(
			'.site-header__menu-item a'
		)[0] as HTMLElement,
		last: document.querySelectorAll(
			'.site-header__menu-item:last-child > :is(a, span)'
		)[0] as HTMLElement,
	};

	const attributes: Attributes = {
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

function handleToggleClicks(
	site: Site,
	dialog: Dialog,
	menu: Menu,
	attributes: Attributes
): void {
	const toggles = [dialog.toggleOpen, dialog.toggleClose];

	toggles.forEach((toggle) => {
		toggle?.addEventListener('click', (e) => {
			const currentState = site.header?.getAttribute(attributes.modal);

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

function handleLinkClicks(
	site: Site,
	dialog: Dialog,
	menu: Menu,
	attributes: Attributes
): void {
	menu.links.forEach((link) => {
		link.addEventListener('click', (e) => {
			const href = (link.children[0] as HTMLAnchorElement).href;
			if (
				href.includes('#') &&
				site.header?.getAttribute(attributes.modal) === 'open'
			) {
				closeMobileMenu(e, site, dialog.toggleOpen, attributes);
			}
		});
	});
}

async function openMobileMenu(
	event: Event | null,
	site: Site,
	toggleOpen: HTMLElement | null,
	menuFirstElement: HTMLElement | null,
	attributes: Attributes
): Promise<void> {
	if (event) {
		event.preventDefault();
	}

	Object.values(site).forEach((element) => {
		if (element === site.header) return;

		element?.setAttribute('inert', 'true');
		element?.setAttribute('aria-hidden', 'true');
	});

	document.getElementsByTagName('body')[0].style.overflow = 'hidden';

	site.header?.setAttribute(attributes.modal, 'open');
	toggleOpen?.setAttribute(attributes.expanded, 'true');
	menuFirstElement?.focus();
}

function closeMobileMenu(
	event: Event | null,
	site: Site,
	toggleOpen: HTMLElement | null,
	attributes: Attributes
): void {
	if (event) {
		event.preventDefault();
	}

	Object.values(site).forEach((element) => {
		if (element === site.header) return;

		element?.removeAttribute('inert');
		element?.removeAttribute('aria-hidden');
	});

	document.getElementsByTagName('body')[0].removeAttribute('style');

	site.header?.setAttribute(attributes.modal, 'closed');
	toggleOpen?.setAttribute(attributes.expanded, 'false');
	toggleOpen?.focus();
}

function handleStickyHeader(
	header: HTMLElement | null,
	attributes: Attributes
): void {
	document.addEventListener('scroll', () => {
		if (window.scrollY > 100) {
			header?.setAttribute(attributes.transition, 'true');
		} else {
			header?.removeAttribute(attributes.transition);
		}

		if (window.scrollY > 300) {
			header?.setAttribute(attributes.sticky, 'true');
		} else {
			header?.removeAttribute(attributes.sticky);
		}
	});
}

function handleKeyboardNavigation(
	site: Site,
	dialog: Dialog,
	menu: Menu,
	attributes: Attributes
): void {
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

	document.addEventListener('keydown', (e) => {
		const isModalOpen =
			site.header?.getAttribute(attributes.modal) === 'open';

		switch (e.key) {
			case 'Tab':
				if (isModalOpen) {
					const currentElement =
						document.activeElement as HTMLElement; // eslint-disable-line @wordpress/no-global-active-element

					if (e.shiftKey) {
						if (currentElement === menu.last) {
							return;
						}

						if (currentElement === dialog.toggleClose) {
							menu.last?.focus();
							e.preventDefault();
							return;
						}
					}

					if (currentElement === menu.last) {
						dialog.toggleClose?.focus();
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
