<?php
/**
 * TODO: Move this to a dynamic block and use html template instead
 * 
 */
?>
<button class="header__toggle" aria-controls="primary-navigation" aria-expanded="false">
    <span class="is-visually-hidden"><?php echo __('Menu', 'kotisivu-block-theme'); ?></span>
    <svg fill="var(--_toggle-color)" viewBox="0 0 100 100" width="50" aria-hidden="true">
        <rect className="line top" width="80" height="10" x="10" y="25" rx="5">
        </rect>
        <rect className="line middle" width="80" height="10" x="10" y="45" rx="5">
        </rect>
        <rect className="line bottom" width="80" height="10" x="10" y="65" rx="5">
        </rect>
    </svg>
</button>