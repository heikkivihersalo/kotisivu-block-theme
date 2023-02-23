export const setContent = (props) => {
    const {
        attributes: {
            content,
            iconClass,
            iconToggle
        },
        setAttributes,
    } = props;

    let newContent =
        iconToggle
            ? `<i className=address__icon ${iconClass}></i> ${content}`
            : `${content}`

    setAttributes({ linkText: newContent });
}
