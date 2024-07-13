/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@components/inner-blocks';
import { VariationPicker } from '@components/variations';
import { getBlockStyles, getIsReversedClass } from '@utils';

import Inspector from './components/Inspector.jsx';

import metadata from './block.json';
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Properties
 * @return {JSX.Element} React component
 */
export default function Edit(props) {
	const {
		attributes: {
			blockClass,
			template,
			templateLock,
			style,
			variationName,
			isReversed,
			headingContent,
			isOpenOnLoad,
		},
		setAttributes,
		clientId,
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames(blockClass, getIsReversedClass(isReversed)),
		style: getBlockStyles({ style }),
		open: isOpenOnLoad,
	});

	const { children, ...innerBlocksProps } = InnerBlocksAppender({
		clientId,
		template,
		templateLock,
		blockProps,
	});

	/* If variation isn't selected, render variation select screen */
	if (!variationName) {
		return (
			<VariationPicker
				blockName={metadata.name}
				setAttributes={setAttributes}
			/>
		);
	}

	return (
		<>
			<Inspector {...props} />
			<details {...innerBlocksProps}>
				<RichText
					tagName="summary"
					className="details__heading"
					value={headingContent}
					onChange={(content) =>
						setAttributes({ headingContent: content })
					}
					placeholder={__(
						'Add a descriptive text here…',
						'kotisivu-block-theme'
					)}
				/>
				{children}
			</details>
		</>
	);
}
