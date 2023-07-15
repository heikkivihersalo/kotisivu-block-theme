import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { cleanSpaces } from "@utils/index";
import StatusIcon from './components/StatusIcon';
import DotsIcon from "./icons/dotsIcon";

const Save = (props) => {
	const {
		attributes: {
			timelineName,
			timelineStatus,
			timelineStatusText
		},
	} = props;

	const blockProps = useBlockProps.save({
		className: cleanSpaces(`timeline-list-item timeline-list-item--${timelineStatus}`)
	});

	return (
		<li {...blockProps}>
			<article>
				<RichText.Content
					value={timelineName}
					className="timeline-list-item__name"
					tagName="h3"
				/>
				<DotsIcon />
				<div className="timeline-list-item__status">
					<RichText.Content
						value={timelineStatusText}
						className="timeline-list-item__status-text"
						tagName="span"
					/>
					<StatusIcon timelineStatus={timelineStatus} />
				</div>
			</article>
		</li>
	);
};

export default Save;
