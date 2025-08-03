/**
 * Shared processors for style and script processing
 * These processors are used by both blocks-plugin and assets-plugin
 * to avoid code duplication
 */

export { processStyle, processStyles } from './styleProcessor.ts';
export { processScript, processScripts } from './scriptProcessor.ts';
export { processPhp, processPhpFiles, minifyPhp } from './phpProcessor.ts';
