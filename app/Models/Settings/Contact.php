<?php

declare(strict_types=1);

namespace App\Models\Settings;

use Vihersalo\Core\Support\Models\Settings;

class Contact extends Settings {
    /**
     * The settings identifier.
     *
     * @var string
     */
    protected string $id = 'app-settings-contact';

    /**
     * Get the contact settings.
     *
     * @return array The contact settings.
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
