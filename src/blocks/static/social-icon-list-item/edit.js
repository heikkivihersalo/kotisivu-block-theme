import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { ImageSelector } from '@common-components/image';
import { IconSelector } from '@common-components/inspector';
import LinkWrapper from './linkWrapper';

import './editor.css';


const Edit = (props) => {
	const {
		attributes: {
			unicode,
			isImage
		}
	} = props;

	const icons = [
		{ label: 'Facebook', value: 'fab fa-facebook' },
		{ label: 'Facebook (Square)', value: 'fab fa-facebook-square' },
		{ label: 'Instagram', value: 'fab fa-instagram' },
		{ label: 'Instagram (Square)', value: 'fab fa-instagram-square' },
		{ label: 'LinkedIn', value: 'fab fa-linkedin' },
		{ label: 'LinkedIn (Square)', value: 'fab fa-linkedin-square' },
		{ label: 'Pinterest', value: 'fab fa-pinterest' },
		{ label: 'Snapchat', value: 'fab fa-snapchat' },
		{ label: 'Spotify', value: 'fab fa-spotify' },
		{ label: 'Tiktok', value: 'fab fa-tiktok' },
		{ label: 'Twitter', value: 'fab fa-twitter' },
		{ label: 'Youtube', value: 'fab fa-youtube' },
		{ label: 'Custom', value: 'custom-icon' }
	]

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<IconSelector props={props} icons={icons} link img />
			<LinkWrapper children={props.children} attributes={props.attributes} editor>
				{!isImage ? <i className={`social-icon-list-item ${unicode}`} aria-hidden="true"></i> : <ImageSelector {...props} img />}
			</LinkWrapper>
		</div>
	);
};

export default Edit;
