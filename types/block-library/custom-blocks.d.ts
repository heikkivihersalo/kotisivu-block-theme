declare module '@block-library/custom' {
	import type { BlockConfiguration } from '@wordpress/blocks';
	import { Variation } from '@components/variations';

	type Template = Array<Array<string | Record<string, any>>>;
	type TemplateLock = 'all' | 'insert' | false;
	type AllowedBlocks = Array<string>;

	type BlockEdit<A, S> = ({
		attributes,
		setAttributes,
		clientId,
		context,
	}: {
		attributes: A;
		setAttributes?: S;
		clientId?: string;
		context?: Record<string, any>;
	}) => JSX.Element;

	type BlockSave<A> = ({
		attributes,
	}: {
		attributes?: A;
	}) => JSX.Element | null;

	type BlockConfig<A, S> = BlockConfiguration & {
		edit: BlockEdit<A, S>;
		save: BlockSave<A>;
		variations?: Array<Variation>;
		getEditWrapperProps?: () => { 'data-align': string };
	};

	export type {
		BlockEdit,
		BlockSave,
		BlockConfig,
		Template,
		TemplateLock,
		AllowedBlocks,
	};
}
