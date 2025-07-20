import { describe, test, expect, beforeAll } from 'vitest';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Integration tests for block manifest generation in the Vite build process
 *
 * These tests ensure that the block manifest file is correctly generated
 * with all block configurations in proper PHP format.
 */
describe('Manifest Build Process', () => {
	const BUILD_DIR = join(process.cwd(), 'build');
	const MANIFEST_PATH = join(BUILD_DIR, 'block-manifest.php');

	beforeAll(() => {
		if (!existsSync(BUILD_DIR)) {
			throw new Error(
				'Build directory does not exist. Run `npm run build` first.'
			);
		}
	});

	/**
	 * Test that manifest file exists and has substantial content
	 */
	test('manifest file exists', () => {
		expect(existsSync(MANIFEST_PATH)).toBe(true);

		const stats = statSync(MANIFEST_PATH);
		expect(stats.size).toBeGreaterThan(1000); // Should be substantial file
	});

	/**
	 * Test that manifest file is valid PHP
	 */
	test('manifest file is valid PHP', () => {
		const content = readFileSync(MANIFEST_PATH, 'utf-8');

		// Should start with PHP opening tag
		expect(content).toMatch(/^\s*<\?php/);

		// Should contain WordPress security check
		expect(content).toContain("if (!defined('ABSPATH'))");
		expect(content).toContain('exit');

		// Should return an array
		expect(content).toContain('return [');
		expect(content).toMatch(/;\s*$/); // Should end with semicolon
	});

	/**
	 * Test that manifest contains all expected blocks
	 */
	test('manifest contains all expected blocks', () => {
		const content = readFileSync(MANIFEST_PATH, 'utf-8');

		// Should contain blocks from all categories
		expect(content).toContain("'ksd/hero'");
		expect(content).toContain("'ksd/container'");
		expect(content).toContain("'ksd/header'");
		expect(content).toContain("'ksd/footer'");
		expect(content).toContain("'ksd/template-404'");
		expect(content).toContain("'ksd/part-logo'");

		// Count the number of block entries - should match discovered blocks
		const blockMatches = content.match(/'ksd\/[^']+'/g);
		expect(blockMatches).not.toBeNull();
		expect(blockMatches!.length).toBeGreaterThan(30); // We expect 35+ blocks
	});

	/**
	 * Test that manifest has correct PHP array structure
	 */
	test('manifest has correct PHP array structure', () => {
		const content = readFileSync(MANIFEST_PATH, 'utf-8');

		// Should have proper PHP array syntax
		expect(content).toContain('=>');
		expect(content).toContain('[');
		expect(content).toContain(']');

		// Should contain typical block.json properties
		expect(content).toContain("'name'");
		expect(content).toContain("'title'");
		expect(content).toContain("'apiVersion'");
		expect(content).toContain("'category'");

		// Should contain file references
		expect(content).toContain("'editorScript'");
		expect(content).toContain("'style'");
		expect(content).toContain("'editorStyle'");
	});

	/**
	 * Test that manifest contains proper data types
	 */
	test('manifest contains proper data types', () => {
		const content = readFileSync(MANIFEST_PATH, 'utf-8');

		// Boolean values should be properly converted
		expect(content).toContain('true');
		expect(content).toContain('false');

		// Numbers should be unquoted
		expect(content).toMatch(/apiVersion.*?=>\s*3/);

		// Strings should be properly quoted and escaped
		expect(content).toContain("'ksd/");

		// Arrays should be properly structured
		expect(content).toContain('[\n');
	});

	/**
	 * Test that manifest is generated with metadata
	 */
	test('manifest is generated with metadata', () => {
		const content = readFileSync(MANIFEST_PATH, 'utf-8');

		// Should contain generation timestamp
		expect(content).toContain('Generated on:');
		expect(content).toMatch(/Generated on: \d{4}-\d{2}-\d{2}T/);

		// Should contain package info
		expect(content).toContain('@package KotisivuBlockTheme');

		// Should contain description
		expect(content).toContain('Block Manifest');
		expect(content).toContain('Auto-generated');
	});

	/**
	 * Test that manifest can be evaluated as PHP
	 */
	test('manifest can be evaluated as PHP', () => {
		// This test ensures the generated PHP is syntactically valid
		// Note: This is a basic syntax check, not execution
		const content = readFileSync(MANIFEST_PATH, 'utf-8');

		// Check for common PHP syntax errors
		expect(content).not.toContain(',,'); // Double commas
		expect(content).not.toContain('=>,'); // Missing values
		expect(content).not.toContain("'undefined'"); // JS artifacts
		expect(content).not.toContain("'null'"); // Should be null, not 'null'

		// Check balanced brackets
		const openBrackets = (content.match(/\[/g) || []).length;
		const closeBrackets = (content.match(/\]/g) || []).length;
		expect(openBrackets).toBe(closeBrackets);

		// Check that arrays and objects are properly structured
		expect(content).not.toMatch(/=>\s*$/m); // No empty values at end of lines
		expect(content).not.toMatch(/\[\s*,/); // No leading commas in arrays
		expect(content).not.toMatch(/,\s*\]/); // No trailing commas before closing brackets
	});

	/**
	 * Test that manifest integrates with development workflow
	 */
	test('manifest integrates with development workflow', () => {
		// This test ensures the manifest is created during build process
		// and can be used by WordPress
		const content = readFileSync(MANIFEST_PATH, 'utf-8');

		// Should be creatable by including in PHP
		expect(content.startsWith('<?php')).toBe(true);
		expect(content.includes('return [')).toBe(true);

		// Should contain file references that match build output
		expect(content).toContain("'editorScript' => 'file:./index.js'");
		expect(content).toContain("'style' => 'file:./style-index.css'");
		expect(content).toContain("'editorStyle' => 'file:./index.css'");

		// File size should be reasonable (not too small, indicating content exists)
		const stats = statSync(MANIFEST_PATH);
		expect(stats.size).toBeGreaterThan(10000); // At least 10KB for 35+ blocks
		expect(stats.size).toBeLessThan(500000); // But not unreasonably large (< 500KB)
	});

	/**
	 * Test that manifest contains block hierarchy information
	 */
	test('manifest contains block hierarchy information', () => {
		const content = readFileSync(MANIFEST_PATH, 'utf-8');

		// Should contain parent/child relationships
		expect(content).toContain("'parent'");
		expect(content).toContain("'ancestor'");

		// Should contain context information for blocks that use it
		expect(content).toContain("'usesContext'");
		expect(content).toContain("'providesContext'");
	});

	/**
	 * Test that manifest contains WordPress-specific properties
	 */
	test('manifest contains WordPress-specific properties', () => {
		const content = readFileSync(MANIFEST_PATH, 'utf-8');

		// Should contain WordPress block properties
		expect(content).toContain("'supports'");
		expect(content).toContain("'attributes'");
		expect(content).toContain("'textdomain'");

		// Should contain file references (at least some of these)
		const hasRender = content.includes("'render'");
		const hasViewScript = content.includes("'viewScript'");
		const hasEditorScript = content.includes("'editorScript'");
		const hasStyle = content.includes("'style'");

		// At least some file references should exist
		expect(hasRender || hasViewScript || hasEditorScript || hasStyle).toBe(
			true
		);
	});

	/**
	 * Test that manifest blocks have consistent structure
	 */
	test('manifest blocks have consistent structure', () => {
		const content = readFileSync(MANIFEST_PATH, 'utf-8');

		// Extract individual block definitions
		const blockMatches = content.match(
			/'ksd\/[^']+'\s*=>\s*\[[\s\S]*?\],?(?=\s*'ksd\/|\s*\];)/g
		);

		if (blockMatches) {
			for (const blockMatch of blockMatches) {
				// Each block should have basic required properties
				expect(blockMatch).toContain("'name'");
				expect(blockMatch).toContain("'title'");
				expect(blockMatch).toContain("'apiVersion'");
			}
		}
	});
});
