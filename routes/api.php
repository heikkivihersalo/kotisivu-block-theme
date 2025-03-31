<?php

use App\Enums\Permission;
use App\Http\Controllers\HelloController;
use App\Http\Controllers\Settings\TagmanagerController;
use App\Http\Controllers\Settings\ContactController;
use App\Http\Controllers\Settings\SocialAccountController;
use Vihersalo\Core\Support\Facades\Route;

Route::controller(HelloController::class)->group(function () {
    Route::get('/hello', 'index');
    Route::get('/apina', 'index');
});

Route::controller(TagmanagerController::class)->group(function () {
    Route::get('/settings/tagmanager', 'index')->auth(Permission::PUBLIC);
    Route::get('/settings/tagmanager', 'update')->auth(Permission::ADMIN);
});

Route::controller(ContactController::class)->group(function () {
    Route::get('/settings/contact', 'index')->auth(Permission::PUBLIC);
    Route::get('/settings/contact', 'update')->auth(Permission::ADMIN);
});

Route::controller(SocialAccountController::class)->group(function () {
    Route::get('/settings/socials', 'index')->auth(Permission::PUBLIC);
    Route::get('/settings/socials', 'update')->auth(Permission::ADMIN);
});
