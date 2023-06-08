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

    :where(.is-stacked > *) {
        grid-area: stack;
    }

    /** 
     * GRID COLUMNS 
     */
    :where(.grid-cols-1, .grid-cols-2, .grid-cols-3, .grid-cols-4, .grid-cols-5, .grid-cols-6) {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    @media screen and (min-width: 800px) {
        :where(.grid-cols-1, .grid-cols-1-rv) {
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }

        :where(.grid-cols-2, .grid-cols-2-rv) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        :where(.grid-cols-70-30, .grid-cols-70-30-rv) {
            display: grid;
            grid-template-columns: 0.67fr 0.33fr;
        }

        :where(.grid-cols-30-70, .grid-cols-30-70-rv) {
            display: grid;
            grid-template-columns: 0.33fr 0.67fr;
        }

        :where(.grid-cols-75-25, .grid-cols-75-25-rv) {
            display: grid;
            grid-template-columns: 0.75fr 0.25fr;
        }

        :where(.grid-cols-25-75, .grid-cols-25-75-rv) {
            display: grid;
            grid-template-columns: 0.75fr 0.25fr;
        }

        :where(.grid-cols-3) {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }


        :where(.grid-cols-4) {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        :where(.grid-cols-5) {
            grid-template-columns: repeat(5, minmax(0, 1fr));
        }

        :where(.grid-cols-6) {
            grid-template-columns: repeat(6, minmax(0, 1fr));
        }

        :where(:is(.grid-cols-2-rv, .grid-cols-70-30-rv, .grid-cols-75-25-rv, .grid-cols-30-70-rv, .grid-cols-25-75-rv):first-child) {
            order: 2
        }

        :where(:is(.grid-cols-2-rv, .grid-cols-70-30-rv, .grid-cols-75-25-rv, .grid-cols-30-70-rv, .grid-cols-25-75-rv):last-child) {
            order: 1
        }
    }


    /**
     * VISIBILITY
     */
    :where(.is-visually-hidden:not(:focus):not(:active)) {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }
</style>