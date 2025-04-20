import { createElement } from '@wordpress/element';
import { SVG, Path } from '@wordpress/primitives';

export const columnThreeHalfs = createElement(
	SVG,
	{
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: '0 0 48 48',
		width: '48px',
		height: '48px',
	},
	createElement(Path, {
		d: 'M0 10a2 2 0 0 1 2-2h10.531c1.105 0 1.969.895 1.969 2v28c0 1.105-.864 2-1.969 2H2a2 2 0 0 1-2-2V10Zm16.5 0c0-1.105.864-2 1.969-2H29.53c1.105 0 1.969.895 1.969 2v28c0 1.105-.864 2-1.969 2H18.47c-1.105 0-1.969-.895-1.969-2V10Zm17 0c0-1.105.864-2 1.969-2H46a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H35.469c-1.105 0-1.969-.895-1.969-2V10Z',
	})
);
