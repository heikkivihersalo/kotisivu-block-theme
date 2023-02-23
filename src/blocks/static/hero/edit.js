import { __ } from "@wordpress/i18n";
import { useSelect } from '@wordpress/data';
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import { ImageMarkup } from '@features/image';
import { cleanSpaces } from '@utils/modifiers';
import Inspector from "./components/Inspector";
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			modifiers,
			hasBackgroundImage,
			heroClass
		},
		clientId,
	} = props;

	const template = [
		['ksd/image-optimized', { className: 'hero__logo' }],
		['core/heading', {  level: 1, className: 'hero__heading' }],
		['ksd/image-optimized', { className: 'hero__decorative-image' }],
		['ksd/image-optimized', { className: 'hero__decorative-image--arch' }],
	];

	const allowedBlocks = [
		['ksd/image-optimized']
		['core/heading']
	];

	const blockProps = useBlockProps({
		className: cleanSpaces(`${heroClass} ${modifiers}`)
	});


	/**
	 * Get render appender
	 */
	const { hasChildBlocks } = useSelect(
		(select) => {
			const { getBlockOrder } = select(blockEditorStore);

			return {
				hasChildBlocks: getBlockOrder(clientId).length > 0,
			};
		},
		[clientId]
	);

	const innerBlocksProps = useInnerBlocksProps(
		{ ...blockProps },
		{
			template: template,
			templateLock: "all",
			allowedBlocks,
			renderAppender: hasChildBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<Inspector {...props} />
			<section {...blockProps}>
				<div className="hero__container">
					{innerBlocksProps.children}
				</div>
				{hasBackgroundImage && <ImageMarkup {...props} />}
			</section>
		</>
	);
};

export default Edit;
