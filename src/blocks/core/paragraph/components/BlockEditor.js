import { createHigherOrderComponent } from '@wordpress/compose';

const addMaxWidth = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
        const {
            attributes,
            attributes: { style },
            name,
        } = props;

        if (name !== 'core/paragraph') {
            return <BlockListBlock {...props} />;
        }

        return (
            <BlockListBlock
                {...props}
                style={{ ...style, maxWidth: style?.maxWidth }}
            />
        );
    };
}, 'addMaxWidth');

export { addMaxWidth };
