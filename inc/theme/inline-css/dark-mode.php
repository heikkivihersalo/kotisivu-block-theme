<style id="ksd-dark-mode-inline-css">
    /**
     * Set color values and scheme
     */
    :root {
        color-scheme: dark light;
    }

    body {
        --_color-black: hsl(180, 5%, 8%);
        --_color-white: hsl(0, 0%, 100%);
        --_color-grey-light: hsl(0, 0%, 95%);
        --_color-grey: hsl(233, 4%, 52%);
        --_color-grey-dark: hsl(233, 4%, 22%);
        --_color-grey-extra-dark: hsl(233, 4%, 12%);
    }

    /**
     * Override color values.
     * No preference is given to DARK or LIGHT mode.
     * !NOTE - This is the default color scheme and there probably is no need to edit these values.
     */
    body {
        --wp--preset--color--background: var(--_color-white);
        --wp--preset--color--foreground: var(--_color-black);
        --wp--preset--color--grey-light: var(--_color-grey-light);
        --wp--preset--color--grey: var(--_color-grey);
        --wp--preset--color--grey-dark: var(--_color-grey-dark);
    }

    [color-scheme="dark"] body {
        color-scheme: dark;
        --wp--preset--color--background: var(--_color-black);
        --wp--preset--color--foreground: var(--_color-white);
        --wp--preset--color--grey-light: var(--_color-grey-extra-dark);
        --wp--preset--color--grey: var(--_color-grey);
        --wp--preset--color--grey-dark: var(--_color-grey-dark);
    }

    /**
     * Override color values.
     * Preference is given to DARK mode.
     * !NOTE - There probably is no need to edit these values.
     */
    @media (prefers-color-scheme: dark) {
        body {
            color-scheme: dark;
            --wp--preset--color--background: var(--_color-black);
            --wp--preset--color--foreground: var(--_color-white);
            --wp--preset--color--grey-light: var(--_color-grey-extra-dark);
            --wp--preset--color--grey: var(--_color-grey);
            --wp--preset--color--grey-dark: var(--_color-grey-dark);
        }

        [color-scheme="light"] body {
            color-scheme: light;
            --wp--preset--color--background: var(--_color-white);
            --wp--preset--color--foreground: var(--_color-black);
            --wp--preset--color--grey-light: var(--_color-grey-light);
            --wp--preset--color--grey: var(--_color-grey);
            --wp--preset--color--grey-dark: var(--_color-grey-dark);
        }
    }

    /**
     * Override color values.
     * Preference is given to LIGHT mode.
     * !NOTE - There probably is no need to edit these values.
     */
    @media (prefers-color-scheme: light) {
        body {
            color-scheme: light;
            --wp--preset--color--background: var(--_color-white);
            --wp--preset--color--foreground: var(--_color-black);
            --wp--preset--color--grey-light: var(--_color-grey-light);
            --wp--preset--color--grey: var(--_color-grey);
            --wp--preset--color--grey-dark: var(--_color-grey-dark);
        }

        [color-scheme="dark"] body {
            color-scheme: dark;
            --wp--preset--color--background: var(--_color-black);
            --wp--preset--color--foreground: var(--_color-white);
            --wp--preset--color--grey-light: var(--_color-grey-extra-dark);
            --wp--preset--color--grey: var(--_color-grey);
            --wp--preset--color--grey-dark: var(--_color-grey-dark);
        }
    }
</style>