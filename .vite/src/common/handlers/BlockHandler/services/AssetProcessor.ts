/**
 * External dependencies
 */
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

/**
 * Internal dependencies
 */
import { generateOutputConfig } from '../../../utils';
import type { BlockInfo, OutputConfig } from '../../../types';
import type {
	AssetProcessorService,
	ServiceDependencies,
	ProcessingConfig,
	SharedProcessors,
} from '../types';

/**
 * Service for processing WordPress block assets (CSS, JS, PHP)
 *
 * This service is responsible for:
 * - Processing CSS files with LightningCSS
 * - Processing JavaScript files with ESBuild
 * - Processing PHP files with minification
 * - Handling WordPress naming conventions
 * - Coordinating asset processing workflows
 */
export class AssetProcessor implements AssetProcessorService {
	private css: SharedProcessors['css'];
	private js: SharedProcessors['js'];
	private php: SharedProcessors['php'];
	private outputDirectory: string;

	constructor(
		{ outputDirectory }: Pick<ServiceDependencies, 'outputDirectory'>,
		processors: SharedProcessors
	) {
		this.css = processors.css;
		this.js = processors.js;
		this.php = processors.php;
		this.outputDirectory = outputDirectory;
	}

	/**
	 * Extract scripts from block.json with file: prefix handling
	 */
	private extractScripts(blockJson: any): string[] {
		const scripts: string[] = [];

		['script', 'editorScript', 'viewScript'].forEach((prop) => {
			const scriptValue = blockJson[prop];
			if (typeof scriptValue === 'string') {
				if (scriptValue.startsWith('file:')) {
					scripts.push(scriptValue.replace('file:./', ''));
				}
			} else if (Array.isArray(scriptValue)) {
				scriptValue.forEach((script) => {
					if (
						typeof script === 'string' &&
						script.startsWith('file:')
					) {
						scripts.push(script.replace('file:./', ''));
					}
				});
			}
		});

		return scripts;
	}

	/**
	 * Extract styles from block.json with file: prefix handling
	 */
	private extractStyles(blockJson: any): string[] {
		const styles: string[] = [];

		['style', 'editorStyle', 'viewStyle'].forEach((prop) => {
			const styleValue = blockJson[prop];
			if (typeof styleValue === 'string') {
				if (styleValue.startsWith('file:')) {
					styles.push(styleValue.replace('file:./', ''));
				}
			} else if (Array.isArray(styleValue)) {
				styleValue.forEach((style) => {
					if (
						typeof style === 'string' &&
						style.startsWith('file:')
					) {
						styles.push(style.replace('file:./', ''));
					}
				});
			}
		});

		return styles;
	}

	/**
	 * Process WordPress convention CSS files (editor.css and style.css)
	 */
	private async processWordPressConventionFiles(
		block: BlockInfo,
		config: OutputConfig
	): Promise<void> {
		// Handle WordPress convention CSS files with proper naming
		// editor.css -> index.css (editor styles)
		const editorCssPath = resolve(block.path, 'editor.css');
		if (!existsSync(editorCssPath)) {
			throw new Error(
				`Required editor.css file not found at: ${editorCssPath}`
			);
		}

		// Create a custom config for the editor CSS with WordPress naming convention
		const editorConfig = {
			...config,
			outputPath: config.outputPath, // Will generate index.css automatically
		};
		await this.css.processStyle('editor.css', editorConfig);

		// style.css -> style-index.css (frontend styles)
		const styleCssPath = resolve(block.path, 'style.css');
		if (!existsSync(styleCssPath)) {
			throw new Error(
				`Required style.css file not found at: ${styleCssPath}`
			);
		}

		// Create a custom config for the style CSS with WordPress naming convention
		const styleConfig = {
			...config,
			outputPath: config.outputPath, // Will need to handle style-index.css naming
		};
		// For now, use the existing handler - we may need to enhance it later
		// to handle the style-index.css naming convention
		await this.css.processStyle('style.css', styleConfig);
	}

	/**
	 * Process block assets (CSS, JS, PHP) in parallel
	 */
	async processAssets(
		block: BlockInfo,
		config: OutputConfig,
		options: ProcessingConfig = {}
	): Promise<void> {
		const { sourcemap = false, minifyPhp = true } = options;

		// Extract scripts and styles from block.json
		const scripts = this.extractScripts(block.blockJson);
		const styles = this.extractStyles(block.blockJson);

		// Process all assets in parallel for better performance
		const promises: Promise<void>[] = [];

		if (styles.length > 0) {
			promises.push(this.css.processStyles(styles, config));
		}

		if (scripts.length > 0) {
			promises.push(this.js.processScripts(scripts, config, sourcemap));
		}

		await Promise.all(promises);
	}

	/**
	 * Process a complete block with all its assets including WordPress conventions
	 */
	async processCompleteBlock(
		block: BlockInfo,
		config: OutputConfig,
		options: ProcessingConfig = {}
	): Promise<void> {
		// Process regular block assets first
		await this.processAssets(block, config, options);

		// Process WordPress convention files
		await this.processWordPressConventionFiles(block, config);
	}

	/**
	 * Process a block with automatic config generation
	 */
	async processBlockWithAutoConfig(
		block: BlockInfo,
		options: ProcessingConfig = {}
	): Promise<void> {
		// Generate output configuration
		const config = generateOutputConfig(
			block.path,
			block.name,
			block.outputPath,
			this.outputDirectory
		);

		await this.processCompleteBlock(block, config, options);
	}
}
