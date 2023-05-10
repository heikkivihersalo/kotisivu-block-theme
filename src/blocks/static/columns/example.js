/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Template option choices for predefined columns layouts.
 *
 */
const example = {
    viewportWidth: 800, // Columns collapse "@media (max-width: 799px)".
    innerBlocks: [
        {
            name: 'core/column',
            innerBlocks: [
                {
                    name: 'core/paragraph',
                    attributes: {
                        /* translators: example text. */
                        content: __(
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.'
                        ),
                    },
                },
                {
                    name: 'core/image',
                    attributes: {
                        url: 'https://s.w.org/images/core/5.3/Windbuchencom.jpg',
                    },
                },
                {
                    name: 'core/paragraph',
                    attributes: {
                        /* translators: example text. */
                        content: __(
                            'Suspendisse commodo neque lacus, a dictum orci interdum et.'
                        ),
                    },
                },
            ],
        },
        {
            name: 'core/column',
            innerBlocks: [
                {
                    name: 'core/paragraph',
                    attributes: {
                        /* translators: example text. */
                        content: __(
                            'Etiam et egestas lorem. Vivamus sagittis sit amet dolor quis lobortis. Integer sed fermentum arcu, id vulputate lacus. Etiam fermentum sem eu quam hendrerit.'
                        ),
                    },
                },
                {
                    name: 'core/paragraph',
                    attributes: {
                        /* translators: example text. */
                        content: __(
                            'Nam risus massa, ullamcorper consectetur eros fermentum, porta aliquet ligula. Sed vel mauris nec enim.'
                        ),
                    },
                },
            ],
        },
    ],
}

export default example;
