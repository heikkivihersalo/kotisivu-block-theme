<style id="ksd-custom-inline-css">
    /* Set footer to be always on site bottom */
    :where(.wp-site-blocks) {
        min-height: 100vh;
        min-height: 100dvh;

        display: grid;
        grid-template-rows: auto 1fr auto;
    }

    /* Set global max width for content and center it to page */
    :where(main>.entry-content) {
        max-width: var(--wp--style--global--wide-size);
        margin-inline: auto;
    }

    /* Set default margin and padding excluding hero */
    :where(main>.entry-content>section):not(section:first-of-type) {
        margin-top: var(--wp--preset--spacing--60);
    }

    /* Set default margin and padding excluding last element */
    :where(main>.entry-content>section):not(section:last-of-type) {
        margin-bottom: var(--wp--preset--spacing--60);
    }

    @media screen and (min-width: 1600px) {
        body {
            --wp--style--global--content-size: min(calc(100% - calc(var(--wp--preset--spacing--40)) * 2), 1400px);
        }
    }
</style>