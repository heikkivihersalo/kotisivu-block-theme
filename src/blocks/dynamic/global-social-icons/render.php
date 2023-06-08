<?php

function render_global_social_icons($block_attributes, $content) { ?>
    <?php wp_enqueue_script('ksd-global-social-icons-view-script') ?>
    <?php var_dump($block_attributes); ?>
    <?php $accounts = array(
        'facebook' => array(
            'url' => $block_attributes["options"]["facebook-url"],
            'icon' => 'fab fa-facebook-f',
            'label' => 'Facebook',
            'slug' => 'facebook',
            'aria-label' => __('Follow us on Facebook', 'kotisivu-block-theme')
        ),
        'twitter' => array(
            'url' => $block_attributes["options"]["twitter_url"],
            'icon' => 'fab fa-twitter',
            'label' => 'Twitter',
            'slug' => 'twitter',
            'aria-label' => __('Follow us on Twitter', 'kotisivu-block-theme')
        ),
        'instagram' => array(
            'url' => $block_attributes["options"]["instagram-url"],
            'icon' => 'fab fa-instagram',
            'label' => 'Instagram',
            'slug' => 'instagram',
            'aria-label' => __('Follow us on Instagram', 'kotisivu-block-theme')
        ),
        'linkedin' => array(
            'url' => $block_attributes["options"]["linkedin-url"],
            'icon' => 'fab fa-linkedin-in',
            'label' => 'LinkedIn',
            'slug' => 'linkedin',
            'aria-label' => __('Follow us on LinkedIn', 'kotisivu-block-theme')
        ),
        'youtube' => array(
            'url' => $block_attributes["youtube-url"],
            'icon' => 'fab fa-youtube',
            'label' => 'YouTube',
            'slug' => 'youtube',
            'aria-label' => __('Follow us on YouTube', 'kotisivu-block-theme')
        ),
        'pinterest' => array(
            'url' => $block_attributes["options"]["pinterest-url"],
            'icon' => 'fab fa-pinterest-p',
            'label' => 'Pinterest',
            'slug' => 'pinterest',
            'aria-label' => __('Follow us on Pinterest', 'kotisivu-block-theme')
        ),
        'snapchat' => array(
            'url' => $block_attributes["options"]["snapchat-url"],
            'icon' => 'fab fa-snapchat-ghost',
            'label' => 'Snapchat',
            'slug' => 'snapchat',
            'aria-label' => __('Follow us on Snapchat', 'kotisivu-block-theme')
        ),
        'tiktok' => array(
            'url' => $block_attributes["options"]["tiktok-url"],
            'icon' => 'fab fa-tiktok',
            'label' => 'TikTok',
            'slug' => 'tiktok',
            'aria-label' => __('Follow us on TikTok', 'kotisivu-block-theme')
        ),
        'twitch' => array(
            'url' => $block_attributes["options"]["twitch-url"],
            'icon' => 'fab fa-twitch',
            'label' => 'Twitch',
            'slug' => 'twitch',
            'aria-label' => __('Follow us on Twitch', 'kotisivu-block-theme')
        ),
        'reddit' => array(
            'url' => $block_attributes["options"]["reddit-url"],
            'icon' => 'fab fa-reddit-alien',
            'label' => 'Reddit',
            'slug' => 'reddit',
            'aria-label' => __('Follow us on Reddit', 'kotisivu-block-theme')
        ),
        'discord' => array(
            'url' => $block_attributes["options"]["discord-url"],
            'icon' => 'fab fa-discord',
            'label' => 'Discord',
            'slug' => 'discord',
            'aria-label' => __('Follow us on Discord', 'kotisivu-block-theme')
        ),
        'whatsapp' => array(
            'url' => $block_attributes["options"]["whatsapp-url"],
            'icon' => 'fab fa-whatsapp',
            'label' => 'WhatsApp',
            'slug' => 'whatsapp',
            'aria-label' => __('Follow us on WhatsApp', 'kotisivu-block-theme')
        ),
    ); ?>
    <?php ob_start(); ?>
    <div class="global-social-icons">
        <?php foreach ($accounts as $account) : ?>
            <?php if (empty($account['url'])) continue; ?>
            <a class="global-social-icons__link  global-social-icons__link--<?php echo $account["slug"]; ?>" href="<?php echo $account['url'] ?>" target="_blank" rel="noopener noreferrer" title="<?php echo $account['label'] ?>" aria-label="<?php echo $account['aria-label'] ?>" data-track="true" data-type="social" data-label="<?php echo $account["label"]; ?>">
                <i class="global-social-icons__icon <?php echo $account['icon'] ?>" aria-hidden="true"></i>
                <span class="is-visually-hidden global-social-icons__text"><?php echo $account['label'] ?></span>
            </a>
        <?php endforeach; ?>
    </div>
    <?php return ob_get_clean(); ?>
<?php } ?>