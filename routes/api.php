<?php

use App\Enums\Permission;
use App\Http\Controllers\Settings\TagmanagerController;
use App\Http\Controllers\Settings\ContactController;
use App\Http\Controllers\Settings\SocialAccountController;
use App\Http\Controllers\Settings\CacheController;
use Vihersalo\Core\Support\Facades\Route;

Route::controller(TagmanagerController::class)->group(function () {
    Route::get('/settings/tagmanager', 'index')->auth(Permission::PUBLIC);
    Route::post('/settings/tagmanager', 'update')->auth(Permission::ADMIN);
});

Route::controller(ContactController::class)->group(function () {
    Route::get('/settings/contact', 'index')->auth(Permission::PUBLIC);
    Route::post('/settings/contact', 'update')->auth(Permission::ADMIN);
});

Route::controller(SocialAccountController::class)->group(function () {
    Route::get('/settings/socials', 'index')->auth(Permission::PUBLIC);
    Route::post('/settings/socials', 'update')->auth(Permission::ADMIN);
});

Route::controller(CacheController::class)->group(function () {
    Route::post('/settings/cache/purge', 'purge')->auth(Permission::ADMIN);
});
