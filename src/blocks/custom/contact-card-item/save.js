import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Wrapper } from './wrapper.js';


const Save = (props) => {
	const {
		attributes: {
			blockClass,
			blockWrapper
		}
	} = props;

	const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save({
		className: blockClass
	}));

	let wrapperProps = {
		children: innerBlocksProps.children,
		blockWrapper: blockWrapper,
		classes: innerBlocksProps.className,
		styles: innerBlocksProps.style
	}

	return (
		<Wrapper {...wrapperProps} />
	)
};

export default Save;
