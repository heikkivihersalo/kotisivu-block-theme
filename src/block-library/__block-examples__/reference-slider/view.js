/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import domReady from '@wordpress/dom-ready';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getReferences } from './scripts/helpers.js';

/**
 * Contexts
 */
import SliderContext from './context/SliderContext';

/**
 * Components
 */
import SliderPagination from './components/SliderPagination.jsx';
import SliderControls from './components/SliderControls.jsx';
import Slider from './components/Slider.jsx';

const ReferenceSlider = () => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getReferences({ per_page: 10 });
            setData(data);
        }

        fetchData();
    }, []);

    if (data.length === 0) return null;

    return (
        <SliderContext.Provider value={{ sliderIndex, setSliderIndex }}>
            <a href="#skip-slider-controls" className="is-visually-hidden">{__('Skip Slider Controls', 'kotisivu-block-theme')}</a>
            <Slider {...data} />
            <SliderControls length={data.length} />
            <SliderPagination data={data} />
            <div id="skip-slider-controls" />
        </SliderContext.Provider>
    )
}

/**
 * Render the component
 */
domReady(async function () {
    createRoot(document.getElementById('reference-slider')).render(<ReferenceSlider />);
});
