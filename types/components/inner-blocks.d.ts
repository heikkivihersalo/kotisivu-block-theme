declare module '@components/inner-blocks' {
	import {
		Merged,
		Reserved,
	} from '@wordpress/block-editor/components/use-block-props';

	interface InnerBlocksAppenderProps {
		clientId: string;
		template: Array<any> | undefined;
		templateLock?: false | 'contentOnly' | 'all' | 'insert' | undefined;
		allowedBlocks?: string[];
		blockProps: Object;
	}

	type InnerBlocksAppenderComponent = Omit<{}, 'ref'> &
		Merged &
		Reserved & {
			children: React.ReactElement;
		};

	export type { InnerBlocksAppenderComponent };

	const InnerBlocksAppender: (
		props: InnerBlocksAppenderProps
	) => InnerBlocksAppenderComponent;

	export { InnerBlocksAppenderProps, InnerBlocksAppender };
}
