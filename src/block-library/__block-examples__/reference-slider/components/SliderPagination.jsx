import { __ } from "@wordpress/i18n";
import { useContext } from "@wordpress/element";

import SliderContext from "../context/SliderContext";

import { CircleFilled, CircleOutline } from "../icons";

/**
 * Slider Pagination Component
 * @param {array} props - Component props.
 * @returns {JSX.Element} Slider Pagination Component.
 */
const SliderPagination = ({ data }) => {
	const { sliderIndex, setSliderIndex } = useContext(SliderContext);

	return (
		<div className="reference-slider__pagination">
			{data.map((_, index) => (
				<button
					key={index}
					className="reference-slider__pagination-btn"
					aria-label={`View Reference ${index + 1}`}
					onClick={() => setSliderIndex(index)}
				>
					<span className="is-visually-hidden">{`View Reference ${
						index + 1
					}`}</span>
					{index === sliderIndex ? (
						<CircleFilled aria-hidden />
					) : (
						<CircleOutline aria-hidden />
					)}
				</button>
			))}
		</div>
	);
};

export default SliderPagination;
