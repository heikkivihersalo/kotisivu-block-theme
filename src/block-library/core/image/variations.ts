import type { BlockStyle } from 'core-blocks';

const variations: BlockStyle[] = [
	{
		name: 'default',
		label: 'Default',
		isDefault: true,
	},
	{
		name: 'square',
		label: 'Square',
		isDefault: false,
	},
	{
		name: 'rectangle',
		label: 'Rectangle',
		isDefault: false,
	},
	{
		name: 'full',
		label: 'Full',
		isDefault: false,
	},
];

export default variations;
