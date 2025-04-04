<?php

declare(strict_types=1);

namespace App\Enums;

use Closure;
use Vihersalo\Core\Contracts\Enums\Permission as PermissionContract;

enum Auth implements PermissionContract {
    case ADMIN;
    case PUBLIC;

    public function callback(): Closure|bool {
        return match ($this) {
            self::ADMIN => function () {
                /**
                 * Get initial user to check
                 */
                $user = wp_get_current_user();

                /**
                 * In some cases we don't have direct user object, so we need to authenticate
                 * user with PHP_AUTH_USER and PHP_AUTH_PW headers
                 */
                if (0 === $user->ID) {
                    $php_auth_user = isset($_SERVER['PHP_AUTH_USER'])
                        ? sanitize_text_field(wp_unslash($_SERVER['PHP_AUTH_USER']))
                        : '';

                    $php_auth_pw = isset($_SERVER['PHP_AUTH_PW'])
                        ? sanitize_text_field(wp_unslash($_SERVER['PHP_AUTH_PW']))
                        : '';

                    $user = wp_authenticate_application_password(
                        get_user_by('login', $php_auth_user),
                        $php_auth_user,
                        $php_auth_pw
                    );

                    if (is_wp_error($user)) {
                        return false;
                    }
                }

                /**
                 * If user is not found, return false
                 */
                if (! $user) {
                    return false;
                }

                /**
                 * If user has administrator role, return true
                 */
                if (in_array('administrator', (array) $user->roles, true)) {
                    return true;
                }
            },
            self::PUBLIC => function () {
                return true;
            },
        };
    }
}
