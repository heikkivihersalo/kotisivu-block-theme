<?php

if ( ! file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	return;
}

/**
 * Include autoload.php to load all dependencies.
 */
require_once __DIR__ . '/vendor/autoload.php';

/**
 * Include Dotenv library to pull config options from .env file.
 */
if ( ! class_exists( 'Dotenv\Dotenv' ) ) {
	return;
}

$dotenv = Dotenv\Dotenv::createImmutable( __DIR__ );
$dotenv->load();
