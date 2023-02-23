import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { cleanSpaces } from "@utilities/modifiers";
import StatusIcon from './components/StatusIcon';
import DotsIcon from "./icons/dotsIcon";

import './editor.css';
import Inspector from "./components/inspector";

const Edit = (props) => {
	const {
		attributes: {
			timelineName,
			timelineStatus,
			timelineStatusText,
		},
		setAttributes
	} = props;

	const blockProps = useBlockProps({
		className: cleanSpaces(`timeline-list-item timeline-list-item--${timelineStatus}`)
	});

	return (
		<li {...blockProps}>
			<Inspector {...props} />
			<article>
				<RichText
					aria-label={__('Add timeline name', 'kotisivu-block-theme')}
					placeholder={__('Add timeline name', 'kotisivu-block-theme')}
					value={timelineName}
					className="timeline-list-item__name"
					tagName="h3"
					onChange={(content) => setAttributes({ timelineName: content })}
				/>
				<DotsIcon />
				<div className="timeline-list-item__status">
					<RichText
						aria-label={__('Add status text', 'kotisivu-block-theme')}
						placeholder={__('Add status text', 'kotisivu-block-theme')}
						value={timelineStatusText}
						className="timeline-list-item__status-text"
						tagName="span"
						onChange={(content) => setAttributes({ timelineStatusText: content })}
					/>
					<StatusIcon timelineStatus={timelineStatus} />
				</div>
			</article>
		</li>
	);
};

export default Edit;
