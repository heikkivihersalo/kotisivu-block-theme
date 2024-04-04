/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Preview from './common/inspector/preview';
import LazyLoad from './common/inspector/lazyLoad';
import FullWidth from './common/inspector/fullWidth';
import Sidebar from './common/inspector/sidebar';

/**
 * Image selector sidebar component
 * @param {Object} props Component properties
 * @return {JSX.Element} Image selector sidebar component
 */
const ImageSelectorSidebar = (props) => {
	const {
		attributes: { mediaUrl },
	} = props;

	return (
		<PanelBody
			title={__('Select background image', 'kotisivu-block-theme')}
			initialOpen={true}
		>
			<Sidebar {...props} />
			{mediaUrl && <Preview {...props} />}
			<FullWidth {...props} />
			<LazyLoad {...props} />
		</PanelBody>
	);
};

export { ImageSelectorSidebar };
