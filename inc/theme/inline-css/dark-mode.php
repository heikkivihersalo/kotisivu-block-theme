<style id="ksd-dark-mode-inline-css">
    :root {
        color-scheme: dark light;
    }

    body {
        --_color-black: hsl(180, 5%, 8%);
        --_color-white: hsl(0, 0%, 100%);
    }

    body {
        --wp--preset--color--background: var(--_color-white);
        --wp--preset--color--foreground: var(--_color-black);
    }

    [color-scheme="dark"] body {
        color-scheme: dark;
        --wp--preset--color--background: var(--_color-black);
        --wp--preset--color--foreground: var(--_color-white);
    }

    @media (prefers-color-scheme: dark) {
        body {
            color-scheme: dark;
            --wp--preset--color--background: var(--_color-black);
            --wp--preset--color--foreground: var(--_color-white);
        }

        [color-scheme="light"] body {
            color-scheme: light;
            --wp--preset--color--background: var(--_color-white);
            --wp--preset--color--foreground: var(--_color-black);
        }
    }

    @media (prefers-color-scheme: light) {
        body {
            color-scheme: light;
            --wp--preset--color--background: var(--_color-white);
            --wp--preset--color--foreground: var(--_color-black);
        }

        [color-scheme="dark"] body {
            color-scheme: dark;
            --wp--preset--color--background: var(--_color-black);
            --wp--preset--color--foreground: var(--_color-white);
        }
    }
</style>