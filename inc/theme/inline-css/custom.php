<style id="ksd-custom-inline-css">
    /* Set footer to be always on site bottom */
    .wp-site-blocks {
        min-height: 100vh;
        min-height: 100dvh;

        display: grid;
        grid-template-rows: auto 1fr auto;
    }

    /* Set default margin and padding excluding hero */
    main>section:not(section:first-of-type) {
        margin-top: var(--wp--custom--layout--section--margin-top);
        padding-top: var(--wp--custom--layout--section--padding-top);
    }

    /* Set default margin and padding excluding last element */
    main>section:not(section:last-of-type) {
        margin-bottom: var(--wp--custom--layout--section--margin-bottom);
        padding-bottom: var(--wp--custom--layout--section--padding-bottom);
    }
</style>