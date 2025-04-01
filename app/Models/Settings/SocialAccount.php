<?php

declare(strict_types=1);

namespace App\Models\Settings;

use Vihersalo\Core\Support\Models\Settings;

class SocialAccount extends Settings {
    /**
     * The settings identifier.
     *
     * @var string
     */
    protected string $id = 'app-settings-socials';

    /**
     * Get the analytics settings.
     *
     * @return array The analytics settings.
     */
    public function default(): array {
        return [
            'facebook'  => '',
            'twitter'   => '',
            'instagram' => '',
            'linkedin'  => '',
            'youtube'   => '',
            'pinterest' => '',
            'snapchat'  => '',
            'tiktok'    => '',
            'twitch'    => '',
            'reddit'    => '',
            'discord'   => '',
            'whatsapp'  => '',
        ];
    }
}
