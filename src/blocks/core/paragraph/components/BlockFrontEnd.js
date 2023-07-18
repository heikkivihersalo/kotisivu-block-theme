const addMaxWidthToFrontEnd = (props, block, attributes) => {
    if (block.name !== 'core/paragraph') {
        return props;
    }

    console.log("PROPS:", props);
    console.log("BLOCK:", block);
    console.log("ATTRIBUTES:", attributes);

    return {
        ...props,
        style: {
            ...attributes.style,
            maxWidth: attributes.style?.maxWidth
        }
    }
};

export { addMaxWidthToFrontEnd };
