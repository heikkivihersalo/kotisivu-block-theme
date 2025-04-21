import type { BlockConfiguration } from '@wordpress/blocks';
import { BlockVariation } from './block-variations';

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

type BlockSave<A> = ({ attributes }: { attributes?: A }) => JSX.Element | null;

type BlockConfig<A, S> = BlockConfiguration & {
	edit: BlockEdit<A, S>;
	save: BlockSave<A>;
	variations?: Array<BlockVariation>;
	getEditWrapperProps?: () => { 'data-align': string };
};

type BlockStyleAttributes = {
	background?: string | undefined;
	marginTop?: string | undefined;
	marginBottom?: string | undefined;
	paddingTop?: string | undefined;
	paddingBottom?: string | undefined;
	paddingLeft?: string | undefined;
	paddingRight?: string | undefined;
	width?: string | undefined;
	height?: string | undefined;
	display?: string | undefined;
	justifyItems?: string | undefined;
	alignItems?: string | undefined;
	alignContent?: string | undefined;
	gap?: string | undefined;
};

type BlockJSON_StyleAttributes = {
	backgroundColor?: string;
	spacing?: {
		margin?: {
			top?: string;
			bottom?: string;
		};
		padding?: {
			top?: string;
			bottom?: string;
			left?: string;
			right?: string;
		};
	};
	width?: string;
	height?: string;
	justifyContent?: string;
	justifyItems?: string;
	alignItems?: string;
	alignContent?: string;
	gap?: string;
};
