/**
 * Configuration Utilities
 *
 * This file provides utilities for working with the categorized configuration structure.
 */

import type { UnifiedPluginConfig } from '../types/unified-config.ts';

/**
 * Extract specific category from config
 *
 * @param config - The unified config object
 * @param category - The category to extract
 * @returns The category config
 */
export function extractCategory<T extends keyof UnifiedPluginConfig>(
	config: UnifiedPluginConfig,
	category: T
): NonNullable<UnifiedPluginConfig[T]> {
	return (config[category] || {}) as NonNullable<UnifiedPluginConfig[T]>;
}

/**
 * Get build configuration
 */
export function getBuildConfig(config: UnifiedPluginConfig) {
	return extractCategory(config, 'build');
}

/**
 * Get server configuration
 */
export function getServerConfig(config: UnifiedPluginConfig) {
	return extractCategory(config, 'server');
}

/**
 * Get paths configuration
 */
export function getPathsConfig(config: UnifiedPluginConfig) {
	return extractCategory(config, 'paths');
}

/**
 * Get WordPress configuration
 */
export function getWordPressConfig(config: UnifiedPluginConfig) {
	return extractCategory(config, 'wordpress');
}

/**
 * Get environment configuration
 */
export function getEnvironmentConfig(config: UnifiedPluginConfig) {
	return extractCategory(config, 'environment');
}

/**
 * Helper to get a specific build property
 */
export function getBuildProperty<
	K extends keyof NonNullable<UnifiedPluginConfig['build']>,
>(
	config: UnifiedPluginConfig,
	property: K
): NonNullable<UnifiedPluginConfig['build']>[K] {
	const buildConfig = getBuildConfig(config);
	return buildConfig[property];
}

/**
 * Helper to get a specific server property
 */
export function getServerProperty<
	K extends keyof NonNullable<UnifiedPluginConfig['server']>,
>(
	config: UnifiedPluginConfig,
	property: K
): NonNullable<UnifiedPluginConfig['server']>[K] {
	const serverConfig = getServerConfig(config);
	return serverConfig[property];
}

/**
 * Helper to get a specific paths property
 */
export function getPathsProperty<
	K extends keyof NonNullable<UnifiedPluginConfig['paths']>,
>(
	config: UnifiedPluginConfig,
	property: K
): NonNullable<UnifiedPluginConfig['paths']>[K] {
	const pathsConfig = getPathsConfig(config);
	return pathsConfig[property];
}
