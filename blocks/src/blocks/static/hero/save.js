import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { ImageMarkup } from '@common-components/image';
import { cleanSpaces } from '@utilities/modifiers';

const Save = (props) => {
	const {
		attributes: {
			hasBackgroundImage,
			modifiers,
			heroClass
		}
	} = props;

	const blockProps = useBlockProps.save({
		className: cleanSpaces(`${heroClass} ${modifiers}`)
	});

	return (
		<section {...blockProps}>
			<div className="hero__container">
				<InnerBlocks.Content />
			</div>
			{hasBackgroundImage && <ImageMarkup {...props} />}
		</section>
	);
};

export default Save;
