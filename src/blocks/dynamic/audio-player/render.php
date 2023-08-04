<?php

function render_audio_player($block_attributes, $content) { ?>
    <?php wp_enqueue_script('ksd-audio-player-view-script') ?>
    <?php ob_start(); ?>
    <div id="audio-player" class="audio-player"></div>
    <?php return ob_get_clean(); ?>
<?php } ?>