import { __ } from "@wordpress/i18n";

/**
 * 
 * @param {*} sizes 
 * @returns 
 */
const convertToSrcSet = (sizes) => {
    return sizes.slice(0).reverse().map((size, index) => {
        let width = size.width;
        let url = size.url;

        return `${url} ${width}w`
    })
        .join(', ');
}

/**
 * 
 * @param {*} sizes 
 * @returns 
 */
const convertToSizes = (sizes) => {
    const sizesReverse = sizes.slice(0).reverse();
    return sizesReverse.map((size, index) => {
        return index == (sizesReverse.length - 1)
            ? `${size.width}px`
            : `(max-width: ${size.width}px) ${size.width}px`
    })
        .join(', ');
}

/**
 * 
 * @param {*} obj 
 * @returns 
 */
const getImageSizes = (obj) => {
    const sizes = Object.entries(obj).map(
        ([key, value], index) => {
            return {
                id: index,
                name: key,
                url: value.url,
                width: value.width,
                height: value.height
            }
        }
    )

    /* Sort images from largest to smallest */
    sizes[0].width >= sizes[0].height
        ? sizes.sort((a, b) => b.width - a.width) /* Image orientation is horizontal */
        : sizes.sort((a, b) => b.height - a.height) /* Image orientation is vertical */

    return sizes
}

/**
 * 
 * @param {*} media 
 * @param {*} props 
 */
const setImage = (media, props) => {
    /* If image is svg, set svg properties correctly */
    if (media.mime == "image/svg+xml") {
        props.setAttributes({
            mediaUrl: media.url,
            mediaId: media.id,
            mediaAlt: media.alt,
            mediaMime: media.mime,
        });

        return;
    } 

    /* Get image sizes from WordPress */
    const imageSizes = getImageSizes(media.sizes);

    /* Set attributes for image block */
    props.setAttributes({
        mediaUrl: media.url,
        mediaId: media.id,
        mediaAlt: media.alt,
        mediaMime: media.mime,
        mediaWidth: media.width,
        mediaHeight: media.height,
        mediaSrcSet: convertToSrcSet(imageSizes),
        mediaSrcSizes: convertToSizes(imageSizes)
    });
}

export { setImage }
