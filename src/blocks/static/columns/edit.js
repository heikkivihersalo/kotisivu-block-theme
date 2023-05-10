/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	RangeControl,
} from '@wordpress/components';

import {
	InspectorControls,
	useInnerBlocksProps,
	__experimentalBlockVariationPicker,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { withDispatch, useDispatch, useSelect } from '@wordpress/data';
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';

function ColumnsEditContainer({ updateColumns, clientId }) {
	const { count, canInsertColumnBlock } = useSelect(
		(select) => {
			return {
				count: select(blockEditorStore).getBlockCount(clientId),
				canInsertColumnBlock: select(blockEditorStore).canInsertBlockType('ksd/column', clientId),
			};
		},
		[clientId]
	);

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ['ksd/column'],
		orientation: 'horizontal',
		renderAppender: false,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody>
					{canInsertColumnBlock && (
						<>
							<RangeControl
								__nextHasNoMarginBottom
								label={__('Columns')}
								value={count}
								onChange={(value) => updateColumns(count, value)}
								min={1}
								max={Math.max(6, count)}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps} />
		</>
	);
}

const ColumnsEditContainerWrapper = withDispatch(
	(dispatch, ownProps, registry) => ({
		/**
		 * Updates the column count, including necessary revisions to child Column
		 * blocks to grant required or redistribute available space.
		 *
		 * @param {number} previousColumns Previous column count.
		 * @param {number} newColumns      New column count.
		 */
		updateColumns(previousColumns, newColumns) {
			const { clientId } = ownProps;
			const { replaceInnerBlocks } = dispatch(blockEditorStore);
			const { getBlocks } = registry.select(blockEditorStore);

			let innerBlocks = getBlocks(clientId);

			// Redistribute available width for existing inner blocks.
			const isAddingColumn = newColumns > previousColumns;

			if (isAddingColumn) {
				innerBlocks = [
					...innerBlocks,
					...Array.from({ length: newColumns - previousColumns }).map(() => {
						return createBlock('ksd/column');
					}),
				];
			} else {
				// The removed column will be the last of the inner blocks.
				innerBlocks = innerBlocks.slice(0, -(previousColumns - newColumns));
			}

			replaceInnerBlocks(clientId, innerBlocks);
		},
	})
)(ColumnsEditContainer);

function Placeholder({ clientId, name, setAttributes }) {
	const { blockType, defaultVariation, variations } = useSelect(
		(select) => {
			const {
				getBlockVariations,
				getBlockType,
				getDefaultBlockVariation,
			} = select(blocksStore);

			return {
				blockType: getBlockType(name),
				defaultVariation: getDefaultBlockVariation(name, 'block'),
				variations: getBlockVariations(name, 'block'),
			};
		},
		[name]
	);

	const { replaceInnerBlocks } = useDispatch(blockEditorStore);
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<__experimentalBlockVariationPicker
				icon={blockType?.icon?.src}
				label={blockType?.title}
				variations={variations}
				onSelect={(variation = defaultVariation) => {
					if (variation.attributes) {
						setAttributes(variation.attributes);
					}

					if (variation.innerBlocks) {
						replaceInnerBlocks(
							clientId,
							createBlocksFromInnerBlocksTemplate(
								variation.innerBlocks
							),
							true
						);
					}
				}}
				allowSkip
			/>
		</div>
	);
}

const ColumnsEdit = (props) => {
	const { clientId } = props;
	const hasInnerBlocks = useSelect(
		(select) => select(blockEditorStore).getBlocks(clientId).length > 0, [clientId]
	);
	const Component = hasInnerBlocks
		? ColumnsEditContainerWrapper
		: Placeholder;

	return <Component {...props} />;
};

export default ColumnsEdit;
