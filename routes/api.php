<?php

use Vihersalo\Core\Api\Enums\Permission;
use App\Http\Controllers\HelloController;
use Vihersalo\Core\Support\Facades\Route;

Route::get(
    '/hello',
    [ HelloController::class, 'index' ]
)->auth(Permission::PUBLIC);
