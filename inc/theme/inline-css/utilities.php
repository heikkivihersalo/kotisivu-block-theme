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

    :where(.is-content-justification-center) {
        justify-content: center;
    }

    :where(.is-content-alignment-center) {
        align-items: center;
    }

    :where(.is-content-alignment-top) {
        align-items: flex-start;
    }

    :where(.is-content-alignment-bottom) {
        align-items: flex-end;
    }

    :where(.is-content-alignment-stretch) {
        align-items: stretch;
    }

    :where(.is-content-alignment-space-between) {
        align-items: space-between;
    }

    :where(.is-content-alignment-space-around) {
        align-items: space-around;
    }

    :where(.is-content-justification-right) {
        justify-content: flex-end;
    }

    :where(.is-content-justification-left) {
        justify-content: flex-start;
    }

    :where(.is-content-justification-space-between) {
        justify-content: space-between;
    }

    :where(.is-content-justification-space-around) {
        justify-content: space-around;
    }

    :where(.is-content-justification-space-evenly) {
        justify-content: space-evenly;
    }

    :where(.is-items-alignment-center) {
        align-content: center;
    }

    :where(.is-items-alignment-top) {
        align-content: flex-start;
    }

    :where(.is-items-alignment-bottom) {
        align-content: flex-end;
    }

    :where(.is-items-alignment-stretch) {
        align-content: stretch;
    }

    :where(.is-items-justification-center) {
        justify-items: center;
    }

    :where(.is-items-justification-left) {
        justify-items: start;
    }

    :where(.is-items-justification-right) {
        justify-items: end;
    }

    :where(.is-items-justification-stretch) {
        justify-items: stretch;
    }

    :where(.has-extra-small-gap) {
        gap: var(--wp--preset--spacing--20);
    }

    :where(.has-small-gap) {
        gap: var(--wp--preset--spacing--30);
    }

    :where(.has-medium-gap) {
        gap: var(--wp--preset--spacing--40);
    }

    :where(.has-large-gap) {
        gap: var(--wp--preset--spacing--50);
    }

    :where(.has-extra-large-gap) {
        gap: var(--wp--preset--spacing--60);
    }

    :where(.has-huge-gap) {
        gap: var(--wp--preset--spacing--70);
    }

    :where(.has-colossal-gap) {
        gap: var(--wp--preset--spacing--80);
    }

    /**
     * FLEX
     */
    :where(.is-layout-flex) {
        display: flex;
    }

    /**
     * GRID
     */
    :where(.is-layout-grid) {
        display: grid;
    }

    :where(.is-stacked) {
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
        margin-inline: auto;
    }

    :where(.grid-cols-2, .grid-cols-3, .grid-cols-4, .grid-cols-5, .grid-cols-6) {
        gap: var(--wp--preset--spacing--40);
    }

    :is(.grid-cols-2, .grid-cols-3, .grid-cols-4, .grid-cols-5, .grid-cols-6) h1,
    :is(.grid-cols-2, .grid-cols-3, .grid-cols-4, .grid-cols-5, .grid-cols-6) h2,
    :is(.grid-cols-2, .grid-cols-3, .grid-cols-4, .grid-cols-5, .grid-cols-6)>div>p:first-child {
        margin-top: 0;
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

        :where(:is(.grid-cols-2-rv, .grid-cols-70-30-rv, .grid-cols-75-25-rv, .grid-cols-30-70-rv, .grid-cols-25-75-rv, .is-reversed) div:first-child) {
            order: 2
        }

        :where(:is(.grid-cols-2-rv, .grid-cols-70-30-rv, .grid-cols-75-25-rv, .grid-cols-30-70-rv, .grid-cols-25-75-rv, .is-reversed) div:last-child) {
            order: 1
        }
    }

    /**
     * ICONS
     */
    :where(.is-square-icon) {
        --_icon-color: var(--wp--preset--color--white);
        --_icon-background: var(--wp--preset--color--primary);
        --_icon-background-hover: var(--wp--preset--color--grey);
        --_size: var(--wp--preset--font-size--x-large);

        display: grid;
        place-items: center;

        width: calc(var(--_size) * 1.5);
        height: calc(var(--_size) * 1.5);

        border-radius: 50%;
    }

    :where(.is-square-icon svg) {
        font-size: var(--wp--preset--font-size--large);
    }

    :where(a .is-square-icon):hover {
        --_icon-background: var(--_icon-background-hover);
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