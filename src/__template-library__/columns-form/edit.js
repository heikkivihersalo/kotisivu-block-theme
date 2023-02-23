import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			templateLock
		}
	} = props;

	const template = [
		["ksd/inner-column",
			{
				className: "columns-form__column",
				"templateLock": true,
				"template": [
					["core/heading", { "level": 2, "className": "columns-form__heading" }],
					["core/shortcode", { "text": '[fluentform id="3"]' }],
					["ksd/image-optimized", { "className": "columns-form__decorative-image--arch" }]
				]
			}
		],
		["ksd/inner-column",
			{
				className: "columns-form__column",
				"templateLock": true,
				"template": [
					["ksd/image-optimized", { "className": "columns-form__image" }]
				]
			}
		]
	]

	const blockProps = useBlockProps({
		className: "columns-form"
	});

	return (
		<section {...blockProps}>
			<InnerBlocks
				allowedBlocks={["ksd/inner-column"]}
				template={template}
				templateLock={templateLock}
			/>
		</section>
	);
};

export default Edit;
