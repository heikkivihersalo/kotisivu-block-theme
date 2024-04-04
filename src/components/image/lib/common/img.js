/**
 * Image component
 * @param {Object} props Component properties
 * @return {JSX.Element} Image component
 */
const Img = (props) => {
    const {
        attributes: {
            className,
            mediaUrl,
            mediaAlt,
            mediaWidth,
            mediaHeight,
            lazyLoad
        }
    } = props;
    return (
        <img
            loading={`${lazyLoad ? "lazy" : "eager"}`}
            className={className}
            src={mediaUrl}
            alt={mediaAlt}
            width={`${mediaWidth ? `${mediaWidth}px` : ''}`}
            height={`${mediaHeight ? `${mediaHeight}px` : ''}`}
        />
    )
}

export default Img