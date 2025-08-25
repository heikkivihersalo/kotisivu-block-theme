/**
 * Shared processors for style and script processing
 * These processors are used by both blocks-plugin and assets-plugin
 * to avoid code duplication
 */

export { CssProcessor } from './CssProcessor.ts';
export { ScriptProcessor } from './ScriptProcessor.ts';
export { processPhp, processPhpFiles } from './PhpProcessor.ts';
