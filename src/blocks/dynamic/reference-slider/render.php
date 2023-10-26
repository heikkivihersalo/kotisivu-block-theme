<?php

function render_reference_slider($block_attributes, $content) { ?>
    <?php wp_enqueue_script('ksd-reference-slider-view-script') ?>
    <?php ob_start(); ?>
    <section id="referenssit">
        <h2 class="is-visually-hidden"><?php _e('Our References', 'kotisivu-block-theme'); ?></h2>
        <div id="reference-slider" class="reference-slider"></div>
    </section>
    <?php return ob_get_clean(); ?>
<?php } ?>