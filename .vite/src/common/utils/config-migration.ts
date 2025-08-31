/**
 * Configuration Utilities
 *
 * This file provides utilities for working with the categorized configuration structure.
 */

import type { PluginConfig } from '../types/plugin-config.ts';

/**
 * Extract specific category from config
 *
 * @param config - The unified config object
 * @param category - The category to extract
 * @returns The category config
 */
export function extractCategory<T extends keyof PluginConfig>(
	config: PluginConfig,
	category: T
): NonNullable<PluginConfig[T]> {
	return (config[category] || {}) as NonNullable<PluginConfig[T]>;
}

/**
 * Get build configuration
 */
export function getBuildConfig(config: PluginConfig) {
	return extractCategory(config, 'build');
}

/**
 * Get server configuration
 */
export function getServerConfig(config: PluginConfig) {
	return extractCategory(config, 'server');
}

/**
 * Get paths configuration
 */
export function getPathsConfig(config: PluginConfig) {
	return extractCategory(config, 'paths');
}

/**
 * Get WordPress configuration
 */
export function getWordPressConfig(config: PluginConfig) {
	return extractCategory(config, 'wordpress');
}

/**
 * Get environment configuration
 */
export function getEnvironmentConfig(config: PluginConfig) {
	return extractCategory(config, 'environment');
}

/**
 * Helper to get a specific build property
 */
export function getBuildProperty<
	K extends keyof NonNullable<PluginConfig['build']>,
>(config: PluginConfig, property: K): NonNullable<PluginConfig['build']>[K] {
	const buildConfig = getBuildConfig(config);
	return buildConfig[property];
}

/**
 * Helper to get a specific server property
 */
export function getServerProperty<
	K extends keyof NonNullable<PluginConfig['server']>,
>(config: PluginConfig, property: K): NonNullable<PluginConfig['server']>[K] {
	const serverConfig = getServerConfig(config);
	return serverConfig[property];
}

/**
 * Helper to get a specific paths property
 */
export function getPathsProperty<
	K extends keyof NonNullable<PluginConfig['paths']>,
>(config: PluginConfig, property: K): NonNullable<PluginConfig['paths']>[K] {
	const pathsConfig = getPathsConfig(config);
	return pathsConfig[property];
}
