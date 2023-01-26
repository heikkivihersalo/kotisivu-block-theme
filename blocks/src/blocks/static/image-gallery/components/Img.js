const Img = ({image, imageClass}) => {
    return (
        <img
            data-id={image.mediaID}
            loading={image.lazyLoad}
            className={imageClass}
            src={image.mediaURL}
            alt={image.mediaAlt}
            width={image.mediaWidth}
            height={image.mediaHeight}
            type={image.mediaMime}
        />
    )
}

export default Img
