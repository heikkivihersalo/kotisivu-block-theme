import { createElement } from '@wordpress/element';
import { SVG, Path } from '@wordpress/primitives';

export const columnThreeHalfsBigMiddle = createElement(
	SVG,
	{
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: '0 0 48 48',
		width: '48px',
		height: '48px',
	},
	createElement(Path, {
		d: 'M0 10a2 2 0 0 1 2-2h7.531c1.105 0 1.969.895 1.969 2v28c0 1.105-.864 2-1.969 2H2a2 2 0 0 1-2-2V10Zm13.5 0c0-1.105.864-2 1.969-2H32.53c1.105 0 1.969.895 1.969 2v28c0 1.105-.864 2-1.969 2H15.47c-1.105 0-1.969-.895-1.969-2V10Zm23 0c0-1.105.864-2 1.969-2H46a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2h-7.531c-1.105 0-1.969-.895-1.969-2V10Z',
	})
);
