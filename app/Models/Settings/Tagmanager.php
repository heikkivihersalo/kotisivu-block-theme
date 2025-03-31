<?php

declare(strict_types=1);

namespace App\Models\Settings;

use Vihersalo\Core\Support\Traits\CanConnectDatabase;

class Tagmanager {
    use CanConnectDatabase;

    /**
     * The database ID for the analytics settings.
     *
     * @var string
     */
    protected string $id = 'app-analytics';

    /**
     * The keys for the analytics settings
     *
     * @var string
     */
    protected array $keys = [
        'active',
        'id',
        'url',
        'timeout',
    ];

    /**
     * Get the analytics settings.
     *
     * @return array The analytics settings.
     */
    public function default(): array {
        return [
            'active'  => false,
            'id'      => '',
            'url'     => 'www.googletagmanager.com',
            'timeout' => 1500,
        ];
    }
}
