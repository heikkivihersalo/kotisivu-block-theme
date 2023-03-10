<style id="ksd-utilities-inline-css">
    /**
     * ALIGNMENT
     */
    :where(.has-text-align-left) {
        text-align: left;
    }

    :where(.has-text-align-center) {
        text-align: center;
    }

    :where(.has-text-align-right) {
        text-align: right;
    }

    :where(.has-text-align-justify) {
        text-align: justify;
    }

    /**
     * SPACING
     */
    :where(.has-top-bottom-margin-small) {
        margin-top: var(--wp--preset--spacing--30);
        margin-bottom: var(--wp--preset--spacing--30);
    }

    :where(.has-top-bottom-margin-medium) {
        margin-top: var(--wp--preset--spacing--60);
        margin-bottom: var(--wp--preset--spacing--60);
    }

    :where(.has-top-bottom-margin-large) {
        margin-top: var(--wp--preset--spacing--80);
        margin-bottom: var(--wp--preset--spacing--80);
    }

    /**
     * GRID
     */
    :where.is-stacked {
        display: grid;
        grid-template-areas: "stack";
    }

    .is-stacked>* {
        grid-area: stack;
    }

    /** 
     * COLUMNS 
     */
    :is(.is-two-columns, .is-three-columns, .is-four-columns) {
        display: grid;
        gap: var(--wp--preset--spacing--30);
    }

    @media screen and (min-width: 800px) {
        .is-two-columns {
            grid-template-columns: repeat(2, 1fr);
        }

        .is-three-columns {
            grid-template-columns: repeat(3, 1fr);
        }

        .is-four-columns {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    /**
     * VISIBILITY
     */
    .visually-hidden:not(:focus):not(:active) {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }
</style>