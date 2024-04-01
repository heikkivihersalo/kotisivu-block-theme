/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useContext, useState, useRef } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { useElementDimensions } from "@hooks";

/**
 * Component dependencies
 */
import { Quote } from "../icons";
import { stripHTML } from "../scripts/helpers.js";

/**
 * Context
 */
import SliderContext from "../context/SliderContext";

/**
 * Slider Item Component
 * @param {object} props - Component props.
 * @returns {JSX.Element} Slider Item Component.
 */
const SliderItem = ({ featured_image, logo, excerpt, name, link }) => {
	return (
		<div className="reference-slider__slide">
			<div className="reference-slider__image-container is-stacked">
				<img
					className="reference-slider__image reference-slider__image--background"
					src={featured_image.url}
					alt={featured_image.alt}
					width={featured_image.width}
					height={featured_image.height}
				/>
				<img
					className="reference-slider__image reference-slider__image--logo"
					src={logo.url}
					alt={logo.alt}
					width={logo.width}
					height={logo.height}
				/>
			</div>
			<div className="reference-slider__content-container">
				<Quote aria-hidden className="reference-slider__quote" />
				<div className="reference-slider__content-wrapper">
					<p className="reference-slider__excerpt">{stripHTML(excerpt)}</p>
					<p className="reference-slider__name">{name}</p>
					<div class="references-slider__button wp-block-button">
						<a class="wp-block-button__link wp-element-button" href={link}>
							{__("Explore", "kotisivu-block-theme")}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

/**
 * Slider Images Component
 * @param {object} props - Component props.
 * @returns {JSX.Element} Slider Images Component.
 */
const Slider = (props) => {
	const ref = useRef(null);
	const { sliderIndex, setSliderIndex } = useContext(SliderContext);
	const slides = Object.keys(props);
	const elementDimensions = useElementDimensions(ref);
	const [touch, setTouch] = useState({
		x: null,
		locked: false,
		offset: 0,
		factor: 0,
	});

	/**
	 * Unify touch and mouse events
	 */
	const unify = (e) => {
		return e.changedTouches ? e.changedTouches[0] : e;
	};

	/**
	 * Lock the slider
	 * @param {object} e - Event object.
	 * @returns {void}
	 */
	const lock = (e) => {
		setTouch({
			...touch,
			x: unify(e).clientX,
			locked: true,
		});
	};

	/**
	 * Move the slider
	 * @param {object} e - Event object.
	 * @returns {void}
	 */
	const move = (e) => {
		/**
		 * If the user hasn't touched the slider, return.
		 */
		if (!touch.locked) return;

		/**
		 * Get values for calculations.
		 */
		let threshold = 0.2;
		let dx = unify(e).clientX - touch.x;
		let s = Math.sign(dx); // sign. -1 = left, 1 = right
		let f = +((s * dx) / elementDimensions.width).toFixed(2);
		let n = Object.keys(props).length;

		/**
		 * Get booleans for necessary checks.
		 */
		let isSwipingLeft = sliderIndex > 0 || s < 0;
		let isSwipingRight = sliderIndex < n - 1 || s > 0;
		let isSwipingPastThreshold = f > threshold;

		/**
		 * If the user is swiping left or right, and has swiped past the threshold,
		 * move the slider to the next or previous slide. Update the touch state.
		 */
		if (isSwipingLeft && isSwipingRight && isSwipingPastThreshold) {
			setSliderIndex((index) => {
				if (s < 0) return index + 1;
				if (s > 0) return index - 1;
			});

			setTouch({
				x: null,
				factor: 1 - f,
				offset: 0,
				locked: false,
			});
		}
	};

	/**
	 * Drag the slider
	 * @param {object} e - Event object.
	 * @returns {void}
	 */
	const drag = (e) => {
		e.preventDefault();

		if (touch.locked) {
			let tmp = Math.round(unify(e).clientX - touch.x);
			setTouch({
				...touch,
				offset: tmp,
			});
		}
	};

	/**
	 * Render the component
	 */
	return (
		<div
			ref={ref}
			className={
				"reference-slider__slides" + (touch.locked ? " is-smooth" : "")
			}
			style={{
				"--slide-count": slides.length,
				"--slide-index": sliderIndex,
				"--slide-offset": touch.offset + "px",
				"--slide-transition-factor": touch.factor,
			}}
			onTouchStart={(e) => lock(e)}
			onTouchEnd={(e) => move(e)}
			onTouchMove={(e) => drag(e)}
		>
			<div className="reference-slider__track">
				{slides.map((key, index) => {
					return <SliderItem key={index} {...props[key].metadata.reference} />;
				})}
			</div>
		</div>
	);
};

export default Slider;
