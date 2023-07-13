<style id="ksd-custom-inline-css">
    /* Set footer to be always on site bottom */
    .wp-site-blocks {
        min-height: 100vh;
        min-height: 100dvh;

        display: grid;
        grid-template-rows: auto 1fr auto;
    }

    /* Set default margin and padding excluding hero */
    main > .entry-content > section:not(section:first-of-type) {
        margin-top: var(--wp--preset--spacing--60);
    }

    /* Set default margin and padding excluding last element */
    main > .entry-content > section:not(section:last-of-type) {
        margin-bottom: var(--wp--preset--spacing--60);
    }
</style>