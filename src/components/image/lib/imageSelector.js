/**
 * Internal dependencies
 */
import Preview from './common/inspector/preview';
import SelectorButton from './common/inspector/button';

/**
 * Image selector component
 * @param {Object} props Component properties
 * @return {JSX.Element} Image selector component
 */
const ImageSelector = (props) => {
    const {
        attributes: {
            mediaUrl,
        }
    } = props;

    return (
        <>
            <SelectorButton {...props} />
            {mediaUrl && <Preview {...props} />}
        </>
    );
}

export { ImageSelector };
