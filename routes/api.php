<?php

use Vihersalo\Core\Bootstrap\Application;
use Vihersalo\Core\Api\Router;
use Vihersalo\Core\Api\Enums\Permission;

use App\Http\Controllers\HelloController;

use Vihersalo\Core\Support\Facades\Route;

// Application::getInstance()->make(Router::class)->get(
// '/hello',
// [HelloController::class, 'index']
// )->auth(Permission::PUBLIC);

Route::get(
	'/hello',
	[ HelloController::class, 'index' ]
)->auth( Permission::PUBLIC );
