<?php

declare(strict_types=1);

namespace App\Models\Settings;

use Vihersalo\Core\Support\Traits\CanConnectDatabase;

class Contact {
    use CanConnectDatabase;

    /**
     * The database ID for the analytics settings.
     *
     * @var string
     */
    protected string $id = 'app-contact';

    /**
     * The keys for the analytics settings
     *
     * @var string
     */
    protected array $keys = [
        'name',
        'address',
        'zip',
        'city',
        'country',
        'vat',
        'business_id',
        'phone',
        'email',
    ];

    /**
     * Get the analytics settings.
     *
     * @return array The analytics settings.
     */
    public function default(): array {
        return [
            'name'        => '',
            'address'     => '',
            'zip'         => '',
            'city'        => '',
            'country'     => '',
            'vat'         => '',
            'business_id' => '',
            'phone'       => '',
            'email'       => '',
        ];
    }
}
