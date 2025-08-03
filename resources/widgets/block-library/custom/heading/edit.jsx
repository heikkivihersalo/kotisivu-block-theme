/**
 * External dependencies
 */
import { clsx } from 'clsx/lite';

import {
	AlignmentControl,
	BlockControls,
	HeadingLevelDropdown,
	RichText,
	store as blockEditorStore,
	useBlockEditingMode,
	useBlockProps,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { Platform, useEffect } from '@wordpress/element';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { generateAnchor, setAnchor } from './autogenerate-anchors';

import './editor.scss';

function HeadingEdit({
	attributes,
	setAttributes,
	mergeBlocks,
	onReplace,
	style,
	clientId,
}) {
	const { textAlign, content, level, levelOptions, placeholder, anchor } =
		attributes;
	const tagName = 'h' + level;
	const blockProps = useBlockProps({
		className: clsx({
			[`has-text-align-${textAlign}`]: textAlign,
		}),
		style,
	});
	const blockEditingMode = useBlockEditingMode();

	const { canGenerateAnchors } = useSelect((select) => {
		const { getGlobalBlockCount, getSettings } = select(blockEditorStore);
		const settings = getSettings();

		return {
			canGenerateAnchors:
				!!settings.generateAnchors ||
				getGlobalBlockCount('core/table-of-contents') > 0,
		};
	}, []);

	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch(blockEditorStore);

	// Initially set anchor for headings that have content but no anchor set.
	// This is used when transforming a block to heading, or for legacy anchors.
	useEffect(() => {
		if (!canGenerateAnchors) {
			return;
		}

		if (!anchor && content) {
			// This side-effect should not create an undo level.
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({
				anchor: generateAnchor(clientId, content),
			});
		}
		setAnchor(clientId, anchor);

		// Remove anchor map when block unmounts.
		return () => setAnchor(clientId, null);
	}, [anchor, content, clientId, canGenerateAnchors]);

	const onContentChange = (value) => {
		const newAttrs = { content: value };
		if (
			canGenerateAnchors &&
			(!anchor || !value || generateAnchor(clientId, content) === anchor)
		) {
			newAttrs.anchor = generateAnchor(clientId, value);
		}
		setAttributes(newAttrs);
	};

	return (
		<>
			{blockEditingMode === 'default' && (
				<BlockControls group="block">
					<HeadingLevelDropdown
						value={level}
						options={levelOptions}
						onChange={(newLevel) =>
							setAttributes({ level: newLevel })
						}
					/>
					<AlignmentControl
						value={textAlign}
						onChange={(nextAlign) => {
							setAttributes({ textAlign: nextAlign });
						}}
					/>
				</BlockControls>
			)}
			<RichText
				identifier="content"
				tagName={tagName}
				value={content}
				onChange={onContentChange}
				onMerge={mergeBlocks}
				onReplace={onReplace}
				onRemove={() => onReplace([])}
				placeholder={placeholder || __('Heading')}
				textAlign={textAlign}
				{...blockProps}
			/>
		</>
	);
}

export default HeadingEdit;
