/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { link, linkOff } from '@wordpress/icons';
import {
	BlockControls, // @ts-ignore
	__experimentalLinkControl as LinkControl, // eslint-disable-line
} from '@wordpress/block-editor';
import { ToolbarButton, Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
type LinkAttributes = {
	post: any | undefined;
	linkUrl: string | undefined;
	linkTarget: string | undefined;
	linkRel: string | undefined;
	linkTitle: string | undefined;
};

type Props = {
	attributes: LinkAttributes;
	isSelected: boolean;
	setAttributes: (attributes: Partial<LinkAttributes>) => void;
};

/**
 * Link controls component
 * @param {Props} props
 * @param {LinkAttributes} props.attributes Gutenberg block attributes
 * @param {boolean} props.isSelected Block selected state
 * @return {JSX.Element} Link controls
 */
const LinkControls = ({
	attributes,
	isSelected,
	setAttributes,
}: Props): JSX.Element => {
	const { post, linkUrl, linkTarget, linkRel } = attributes;

	const blockPropsRef = useRef();
	const richTextRef = useRef<HTMLDivElement | null>(null);
	const [isEditingURL, setIsEditingURL] = useState(false);
	const opensInNewTab = linkTarget === '_blank';
	const isURLSet = !!linkUrl;

	/**
	 * Toggle the link target between _blank and undefined.
	 * If the link target is set to _blank, also set the rel attribute to 'noreferrer noopener'.
	 * If the link target is set to undefined, remove the rel attribute.
	 * @param {boolean} value
	 * @return {void}
	 */
	const onToggleOpenInNewTab = (value: boolean): void => {
		const newLinkTarget = value ? '_blank' : undefined;

		let updatedRel = linkRel;
		if (newLinkTarget && !linkRel) {
			updatedRel = 'noreferrer noopener';
		} else if (!newLinkTarget && linkRel === 'noreferrer noopener') {
			updatedRel = undefined;
		}

		setAttributes({
			linkTarget: newLinkTarget,
			linkRel: updatedRel,
		});
	};

	/**
	 * Unlink the selected text.
	 * @return {void}
	 */
	const unlink = (): void => {
		setAttributes({
			post: undefined,
			linkUrl: undefined,
			linkTarget: undefined,
			linkRel: undefined,
		});

		setIsEditingURL(false);
	};

	/**
	 * Start editing the URL.
	 * @param {React.MouseEvent} event
	 * @return {void}
	 */
	const startEditing = (event: React.MouseEvent): void => {
		event.preventDefault();
		setIsEditingURL(true);
	};

	useEffect(() => {
		if (!isSelected) {
			setIsEditingURL(false);
		}
	}, [isSelected]);

	return (
		<>
			<BlockControls group="block">
				{!isURLSet && (
					<ToolbarButton
						icon={link}
						title={__('Link')}
						onClick={(event: React.MouseEvent) =>
							startEditing(event)
						}
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
					/>
				)}
				{isURLSet && (
					<ToolbarButton
						icon={linkOff}
						title={__('Unlink')}
						onClick={unlink}
						isActive={true}
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
					/>
				)}
			</BlockControls>
			{isSelected && (isEditingURL || isURLSet) && (
				<Popover
					position="bottom center"
					onClose={() => {
						setIsEditingURL(false);
						richTextRef.current?.focus();
					}}
					anchorRef={blockPropsRef?.current}
					focusOnMount={isEditingURL ? 'firstElement' : false}
					__unstableSlotName={'__unstable-block-tools-after'}
				>
					<LinkControl
						value={post}
						onChange={(newPost: any) => {
							setAttributes({
								post: newPost,
								linkUrl: newPost.url,
								linkTitle: newPost.title,
							});

							if (opensInNewTab !== newPost.opensInNewTab) {
								onToggleOpenInNewTab(newPost.opensInNewTab);
							}
						}}
						onRemove={() => {
							unlink();
							richTextRef.current?.focus();
						}}
						forceIsEditingLink={isEditingURL}
					/>
				</Popover>
			)}
		</>
	);
};

export { LinkControls };
