import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import Inspector from './components/Inspector'
import { useRef } from '@wordpress/element';
import { Email, Phone } from '@icons';

import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			content,
			type
		},
		setAttributes
	} = props;

	const blockPropsRef = useRef();
	const richTextRef = useRef();

	const blockProps = useBlockProps(blockPropsRef);

	const getIcon = (type, props) => {
		switch (type) {
			case 'email':
				return <Email {...props} />;
			case 'phone':
				return <Phone {...props} />;
			default:
				return '';
		}
	}

	return (
		<li className={`contact-info-list__item`} {...blockProps}>
			<Inspector {...props} />
			{getIcon(type, { "aria-hidden": "true", tabIndex: -1 }) || ''}
			<RichText
				ref={richTextRef}
				aria-label={__(`Add ${type}`, 'kotisivu-block-theme')}
				placeholder={__(`Add ${type}`, 'kotisivu-block-theme')}
				value={content}
				onChange={(content) => setAttributes({ content: content })}
				withoutInteractiveFormatting
			/>
		</li>
	);
};

export default Edit;
