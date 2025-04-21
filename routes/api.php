<?php

declare(strict_types=1);

use App\Enums\Auth;
use App\Http\Controllers\Settings\CacheController;
use App\Http\Controllers\Settings\ContactController;
use App\Http\Controllers\Settings\SocialAccountController;
use App\Http\Controllers\Settings\TagmanagerController;
use Vihersalo\Core\Support\Facades\Route;

Route::controller(TagmanagerController::class)->group(function () {
    Route::get('/settings/tagmanager', 'index');
    Route::post('/settings/tagmanager', 'update')->auth(Auth::ADMIN);
});

Route::controller(ContactController::class)->group(function () {
    Route::get('/settings/contact', 'index');
    Route::post('/settings/contact', 'update')->auth(Auth::ADMIN);
});

Route::controller(SocialAccountController::class)->group(function () {
    Route::get('/settings/socials', 'index');
    Route::post('/settings/socials', 'update')->auth(Auth::ADMIN);
});

Route::controller(CacheController::class)->group(function () {
    Route::post('/settings/cache/purge', 'purge')->auth(Auth::ADMIN);
});
