import { __ } from "@wordpress/i18n";
import {
	InnerBlocks,
	useBlockProps,
} from "@wordpress/block-editor";
import './editor.css';

const Edit = (props) => {
	const ALLOWED_BLOCKS = [
		['core/shortcode'],
		['core/paragraph'],
		['core/heading']
	]

	const TEMPLATE = [
		['core/heading', { className: 'form__heading', placeholder: 'Otsikko', level: 2 }],
		['core/shortcode', { className: 'form__shortcode', text: '[fluentform id="3"]' }]
	]

	const blockProps = useBlockProps({
		className: `contact-us form-container`
	});

	return (
		<>
			<section {...blockProps}>
				<InnerBlocks orientation="horizontal" template={TEMPLATE} templateLock="all" allowedBlocks={ALLOWED_BLOCKS} />
			</section>
		</>
	);
};

export default Edit;
