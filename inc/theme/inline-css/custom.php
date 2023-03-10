<style id="ksd-custom-inline-css">
    /*--------------------------------------------------------------
    >>> TABLE OF CONTENTS:
    ----------------------------------------------------------------
    1.0 Global
    2.0 Elements
      2.1 Buttons
    --------------------------------------------------------------*/
    /*--------------------------------------------------------------
    1.0 Global
    --------------------------------------------------------------*/

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

    /*--------------------------------------------------------------
    2.0 Elements
    --------------------------------------------------------------*/
    /**
     * 2.1 Buttons
     */
    .wp-block-button {
        --_border-width: 1px;
        --_border-color: var(--wp--preset--color--secondary);

        position: relative;
        width: fit-content;

        margin-inline: auto;
    }

    .wp-block-button__link {
        color: var(--wp--preset--color--secondary);
        background-color: transparent;
        padding: 0.5em 1.5em;
    }

    .wp-block-button__link::after {
        content: "";
        width: 100%;
        height: 1.5em;
        position: absolute;
        bottom: 0;
        left: 0;

        border-left: var(--_border-width) solid var(--_border-color);
        border-right: var(--_border-width) solid var(--_border-color);
        border-bottom: var(--_border-width) solid var(--_border-color);
    }

    /* Set hover state */
    .wp-block-button__link:hover {
        color: var(--wp--preset--color--white);
        background-color: var(--wp--preset--color--secondary);
    }

    /* Set disabled state */
    .wp-block-button__link:disabled {
        color: grey;
        pointer-events: none;
        visibility: hidden;
    }
</style>