import type { BlockStyle } from 'core-blocks';

const variations: BlockStyle[] = [
	{
		name: 'default',
		label: 'Default',
		isDefault: true,
	},
	{
		name: 'centered',
		label: 'Centered',
		isDefault: false,
	},
	{
		name: 'custom-icon',
		label: 'Custom Icon',
		isDefault: false,
	},
	{
		name: 'colored-checkmark',
		label: 'Colored Checkmark',
		isDefault: false,
	},
];

export default variations;
