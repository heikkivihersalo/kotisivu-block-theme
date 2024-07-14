declare module '@custom-blocks' {
	import { BlockStyles } from '@utils';

	interface ContainerBlockProps extends Record<string, any> {
		className: string;
		style: BlockStyles;
		'aria-label': any;
		'aria-labelledby': any;
	}

	export { ContainerBlockProps };
}
