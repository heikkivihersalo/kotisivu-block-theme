import Preview from './common/inspector/preview';
import SelectorButton from './common/inspector/button';

const ImageSelector = (props) => {
    const {
        attributes: {
            mediaUrl,
        }
    } = props;

    return (
        <>
            <SelectorButton {...props}/>
            {mediaUrl && <Preview {...props}/>}
        </>
    );
}

export { ImageSelector };