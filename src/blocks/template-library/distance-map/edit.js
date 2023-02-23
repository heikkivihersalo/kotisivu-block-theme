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
				className: "distance-map__column",
				"templateLock": true,
				"template": [
					["ksd/image-optimized", { "className": "distance-map__image" }]
				]
			}
		],
		["ksd/inner-column",
			{
				className: "distance-map__column",
				"templateLock": true,
				"template": [
					["core/heading", { "level": 2, "className": "distance-map__heading" }],
					["ksd/icon-list", {
						"className": "distance-map__icon-list",
						"template": [
							["ksd/icon-list-item", { "className": "distance-map__icon-list-item" }],
							["ksd/icon-list-item", { "className": "distance-map__icon-list-item" }],
						]
					}
					],
					["core/table", { "className": "distance-map__table" }]
				]
			}
		]
	]

	const blockProps = useBlockProps({
		className: "distance-map"
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
