import { __ } from "@wordpress/i18n";
import { useContext, useEffect } from "@wordpress/element";

import SliderContext from "../context/SliderContext";

import { ArrowLeft, ArrowRight } from "../icons";

/**
 * Slider Controls Component
 * @param {object} props - Component props.
 * @returns {JSX.Element} Slider Controls Component.
 */
const SliderControls = ({ length }) => {
	const { sliderIndex, setSliderIndex } = useContext(SliderContext);

	useEffect(() => {
		setInterval(() => {
			showNextSlide();
		}, 2000);
	}, []);

	const showNextSlide = () => {
		setSliderIndex((index) => {
			if (index === length - 1) return 0;
			return index + 1;
		});
	};

	const showPrevSlide = () => {
		setSliderIndex((index) => {
			if (index === 0) return length - 1;
			return index - 1;
		});
	};

	return (
		<div className="reference-slider__controls">
			<button
				onClick={showPrevSlide}
				className="reference-slider__btn reference-slider__btn--prev"
				aria-label={__("View Previous Reference", "kotisivu-block-theme")}
			>
				<span className="is-visually-hidden">
					{__("Previous", "kotisivu-block-theme")}
				</span>
				<ArrowLeft aria-hidden />
			</button>
			<button
				onClick={showNextSlide}
				className="reference-slider__btn reference-slider__btn--next"
				aria-label={__("View Next Reference", "kotisivu-block-theme")}
			>
				<span className="is-visually-hidden">
					{__("Next", "kotisivu-block-theme")}
				</span>
				<ArrowRight aria-hidden />
			</button>
		</div>
	);
};

export default SliderControls;
