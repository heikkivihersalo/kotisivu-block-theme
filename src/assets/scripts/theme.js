import '../styles/theme.css';

(async function trackLinkClicks() {
    /**
     * Get all links with the `data-track` attribute set to `true`
     */
    const links = document.querySelectorAll('a[data-track="true"]');

    /**
     * Make sure the global `dataLayer` array exists
     */
    window.dataLayer = window.dataLayer || [];

    /**
     * Add a click event listener to each link
     */
    links.forEach(link => {
        link.addEventListener('click', () => {
            let eventName = 'link_click';
            let eventType = link.dataset.type;
            let eventLabel = link.dataset.label;

            /**
             * Push an event to the `dataLayer` array
             * See: https://developers.google.com/tag-manager/devguide
             */
            window.dataLayer.push({
                'event': eventName,
                'event_category': eventType,
                'event_label': eventLabel
            });
        });
    });
})();
