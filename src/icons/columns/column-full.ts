import { createElement } from '@wordpress/element';
import { SVG, Path } from '@wordpress/primitives';

export const columnFull = createElement(
	SVG,
	{
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: '0 0 48 48',
		width: '48px',
	},
	createElement(Path, {
		d: 'M0 10a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Z',
	})
);
