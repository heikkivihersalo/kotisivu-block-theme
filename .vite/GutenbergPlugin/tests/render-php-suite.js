#!/usr/bin/env node

/**
 * Test Suite: Render.php File Copying
 *
 * This script runs all tests related to render.php file copying functionality.
 * It includes both integration tests (checking build output) and unit tests
 * (testing the copyRenderFile function).
 *
 * Usage: npm run test:render-php
 */

import { execSync } from 'child_process';

const renderPhpTests = [
	'.vite/GutenbergPlugin/tests/integration/build-output/content/render-php.test.js',
	'.vite/GutenbergPlugin/tests/integration/bundle-generator/renderPhpBundleGenerator.test.js',
	'.vite/GutenbergPlugin/tests/unit/processors/bundle/copyRenderFile.test.js',
];

console.log('🧪 Running Render.php Test Suite...\n');

try {
	const testCommand = `npm test -- --run ${renderPhpTests.join(' ')}`;
	execSync(testCommand, { stdio: 'inherit' });

	console.log('\n✅ All render.php tests passed!');
	console.log('\n📋 Test Coverage:');
	console.log(
		'• Integration tests (build output): render.php file copying to build output'
	);
	console.log(
		'• Integration tests (bundle generator): bundle generator integration with render.php'
	);
	console.log('• Unit tests: copyRenderFile utility function');
	console.log(
		'• Total functionality tested: file existence, content validation, directory structure, bundle generation, integration'
	);
	console.log('• Test files: 3 files, 17 total tests');
} catch (error) {
	console.error('\n❌ Some render.php tests failed!');
	process.exit(1);
}
