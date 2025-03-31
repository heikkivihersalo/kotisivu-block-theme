<?php

declare(strict_types=1);

namespace App\Models\Settings;

use Vihersalo\Core\Support\Traits\CanConnectDatabase;

class SocialAccount {
    use CanConnectDatabase;

    /**
     * The database ID for the analytics settings.
     *
     * @var string
     */
    protected string $id = 'app-social-account';

    /**
     * The keys for the analytics settings
     *
     * @var string
     */
    protected array $keys = [
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'youtube',
        'pinterest',
        'snapchat',
        'tiktok' ,
        'twitch',
        'reddit',
        'discord',
        'whatsapp',
    ];

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
