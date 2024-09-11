declare module '@custom-blocks' {
	import type {
		BlockEditProps,
		BlockSaveProps,
		BlockConfiguration,
	} from '@wordpress/blocks';
	import { Variation } from '@components/variations';

	type BlockEdit = ({
		attributes,
		setAttributes,
	}: BlockEditProps<Record<string, any>>) => JSX.Element;

	type BlockSave = ({
		attributes,
	}: BlockSaveProps<Record<string, any>>) => JSX.Element | null;

	type BlockConfig = BlockConfiguration & {
		save: BlockSave;
		edit: BlockEdit;
		variations?: Array<Variation>;
		getEditWrapperProps?: () => { 'data-align': string };
	};

	export type { BlockEdit, BlockSave, BlockConfig };
}
