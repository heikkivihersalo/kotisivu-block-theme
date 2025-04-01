<?php

declare(strict_types=1);

namespace App\Models\Settings;

use Vihersalo\Core\Support\Models\Settings;

class Tagmanager extends Settings {
    /**
     * Get the analytics settings.
     *
     * @return array The analytics settings.
     */
    public function default(): array {
        return [
            'active'  => false,
            'id'      => $this->id(),
            'url'     => 'www.googletagmanager.com',
            'timeout' => 1500,
        ];
    }
}
