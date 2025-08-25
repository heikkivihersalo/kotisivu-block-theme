/**
 * Shared processors for style and script processing
 * These processors are used by both blocks-plugin and assets-plugin
 * to avoid code duplication
 */

export { CssProcessor } from './CssProcessor.ts';
export { processScript, processScripts } from './scriptProcessor.ts';
export { processPhp, processPhpFiles } from './phpProcessor.ts';
