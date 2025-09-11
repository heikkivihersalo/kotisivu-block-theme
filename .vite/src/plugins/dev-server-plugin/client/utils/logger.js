/**
 * Logging Utilities for HMR Client
 *
 * Consistent logging functionality across the HMR system
 */

/**
 * Log levels
 */
export const LOG_LEVELS = {
	DEBUG: 'debug',
	LOG: 'log',
	WARN: 'warn',
	ERROR: 'error',
};

/**
 * DevServer logger with consistent formatting
 */
export class DevLogger {
	/**
	 * @param {string} prefix - Logger prefix (default: DevServer)
	 * @param {boolean} enabled - Whether logging is enabled
	 */
	constructor(prefix = 'DevServer', enabled = true) {
		this.prefix = prefix;
		this.enabled = enabled;
	}

	/**
	 * Log a message with DevServer formatting
	 * @param {string} level - Log level
	 * @param {string} message - Message to log
	 * @param {...any} args - Additional arguments
	 */
	log(level, message, ...args) {
		if (!this.enabled) return;

		const formattedMessage = `[${this.prefix}] ${message}`;

		if (console[level]) {
			console[level](formattedMessage, ...args);
		} else {
			console.log(formattedMessage, ...args);
		}
	}

	/**
	 * Log debug message
	 * @param {string} message - Message to log
	 * @param {...any} args - Additional arguments
	 */
	debug(message, ...args) {
		this.log(LOG_LEVELS.DEBUG, message, ...args);
	}

	/**
	 * Log info message
	 * @param {string} message - Message to log
	 * @param {...any} args - Additional arguments
	 */
	info(message, ...args) {
		this.log(LOG_LEVELS.LOG, message, ...args);
	}

	/**
	 * Log warning message
	 * @param {string} message - Message to log
	 * @param {...any} args - Additional arguments
	 */
	warn(message, ...args) {
		this.log(LOG_LEVELS.WARN, message, ...args);
	}

	/**
	 * Log error message
	 * @param {string} message - Message to log
	 * @param {...any} args - Additional arguments
	 */
	error(message, ...args) {
		this.log(LOG_LEVELS.ERROR, message, ...args);
	}

	/**
	 * Log asset action with consistent formatting
	 * @param {string} action - Action being performed
	 * @param {string} assetPath - Asset path
	 * @param {string} level - Log level
	 */
	asset(action, assetPath, level = LOG_LEVELS.LOG) {
		this.log(level, `${action}:`, assetPath);
	}

	/**
	 * Enable or disable logging
	 * @param {boolean} enabled - Whether to enable logging
	 */
	setEnabled(enabled) {
		this.enabled = enabled;
	}

	/**
	 * Create a child logger with additional prefix
	 * @param {string} childPrefix - Additional prefix
	 * @returns {DevLogger} Child logger
	 */
	child(childPrefix) {
		return new DevLogger(`${this.prefix}:${childPrefix}`, this.enabled);
	}
}

/**
 * Default DevServer logger instance
 */
export const logger = new DevLogger();

/**
 * Quick logging functions for common use cases
 */
export const log = {
	debug: (message, ...args) => logger.debug(message, ...args),
	info: (message, ...args) => logger.info(message, ...args),
	warn: (message, ...args) => logger.warn(message, ...args),
	error: (message, ...args) => logger.error(message, ...args),
	asset: (action, assetPath, level) => logger.asset(action, assetPath, level),
};
