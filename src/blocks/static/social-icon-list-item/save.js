import { __ } from "@wordpress/i18n";
import { ImageMarkup } from '@features/image';
import LinkWrapper from './linkWrapper';

const Save = (props) => {
	const {
		attributes: {
			unicode,
			isImage
		},
	} = props;

	return (
		<LinkWrapper children={props.children} attributes={props.attributes}>
			{!isImage ? <i className={`social-icon-list-item ${unicode} aria-hidden="true"`}></i> : <ImageMarkup {...props} img />}
		</LinkWrapper>
	);
};

export default Save;
