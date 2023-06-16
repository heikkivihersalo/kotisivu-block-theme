import { __ } from "@wordpress/i18n";

import { ImageMarkup } from '@features/image';

const Save = (props) => {
	return (
		<>
			<ImageMarkup {...props} srcset />
		</>
	);
};

export default Save;
