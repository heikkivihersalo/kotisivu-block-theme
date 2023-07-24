const addMaxWidthToFrontEnd = (props, block, attributes) => {
    if (block.name !== 'core/paragraph') {
        return props;
    }

    return {
        ...props,
        style: {
            ...attributes.style,
            maxWidth: attributes.style?.maxWidth
        }
    }
};

export { addMaxWidthToFrontEnd };
