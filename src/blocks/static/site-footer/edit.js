import { __ } from "@wordpress/i18n";
import {
	InnerBlocks,
	useBlockProps,
} from "@wordpress/block-editor";

import './editor.css';

const Edit = (props) => {
	const {
		attributes: { }
	} = props;

	const TEMPLATE = [
		["ksd/inner-column", {
			"className": "footer__row-1",
			"templateLock": "all",
			"template": [
				["core/heading", { level: 2, "className": "footer__heading-small" }],
				["ksd/social-icon-list", {
					"className": "footer__social-icons",
					"template": [
						["ksd/social-icon-list-item"],
						["ksd/social-icon-list-item"]
					]
				}],
				["core/heading", { level: 2, "className": "footer__heading-small" }],
				["ksd/contact-list", {
					"className": "footer__contact",
					"template": [
						["ksd/contact-list-item"],
						["ksd/contact-list-item"]
					]
				}]
			]
		}],
		["ksd/inner-column", {
			"className": "footer__row-2",
			"templateLock": "all",
			"template": [
				["ksd/image-optimized", { "className": "footer__logo" }]
			]
		}],
		["ksd/inner-column", {
			"className": "footer__row-3",
			"templateLock": "all",
			"template": [
				["ksd/image-optimized", { "className": "footer__partners" }],
				["ksd/navigation-footer"]
			]
		}],
	]

	const blockProps = useBlockProps({
		className: "footer"
	})

	return (
		<div {...blockProps}>
			<InnerBlocks orientation="horizontal" template={TEMPLATE} />
		</div>
	);
};

export default Edit;
