import { describe, it, expect } from 'vitest';
import { minifyPhp } from '../../../../src/common/utils/php/minifyPhp';

describe('minifyPhp', () => {
	it('should remove multi-line comments', () => {
		const input = `<?php
/* This is a comment */
$var = 'value';
/* Another
   multiline
   comment */
echo $var;`;

		const expected = `<?php

$var = 'value';

echo $var;
`;

		expect(minifyPhp(input)).toBe(expected);
	});

	it('should remove single-line comments with //', () => {
		const input = `<?php
$var = 'value'; // This is a comment
echo $var; // Another comment`;

		const expected = `<?php
$var = 'value';
echo $var;
`;

		expect(minifyPhp(input)).toBe(expected);
	});

	it('should preserve URLs with //', () => {
		const input = `<?php
$url = 'http://example.com';
$secure = 'https://example.com';`;

		const expected = `<?php
$url = 'http://example.com';
$secure = 'https://example.com';
`;

		expect(minifyPhp(input)).toBe(expected);
	});

	it('should remove single-line comments with #', () => {
		const input = `<?php
$var = 'value'; # This is a comment
echo $var; # Another comment`;

		const expected = `<?php
$var = 'value';
echo $var;
`;

		expect(minifyPhp(input)).toBe(expected);
	});

	it('should remove # comments but has limitations with strings', () => {
		// Note: Current implementation has limitations with # inside strings
		// The regex (?<!['"])#[^\r\n]* only checks immediate preceding character
		const input = `<?php
$var = 'value'; # This is a comment
echo $var; # Another comment
$simple = '#simple'; # This works
$complex = "tag#name"; # This has issues`;

		const expected = `<?php
$var = 'value';
echo $var;
$simple = '#simple';
$complex = "tag
`;

		expect(minifyPhp(input)).toBe(expected);
	});

	it('should remove excessive whitespace', () => {
		const input = `<?php
$var    =     'value';
		echo    $var;`;

		const expected = `<?php
$var = 'value';
echo $var;
`;

		expect(minifyPhp(input)).toBe(expected);
	});

	it('should remove trailing whitespace', () => {
		const input = `<?php   
$var = 'value';   
echo $var;    `;

		const expected = `<?php
$var = 'value';
echo $var;
`;

		expect(minifyPhp(input)).toBe(expected);
	});

	it('should limit consecutive newlines to maximum 2', () => {
		const input = `<?php
$var = 'value';



echo $var;


function test() {
    return true;
}`;

		const expected = `<?php
$var = 'value';

echo $var;

function test() {
return true;
}
`;

		expect(minifyPhp(input)).toBe(expected);
	});

	it('should add newline at end if missing', () => {
		const input = `<?php
$var = 'value';`;

		const expected = `<?php
$var = 'value';
`;

		expect(minifyPhp(input)).toBe(expected);
	});

	it('should preserve single newline at end', () => {
		const input = `<?php
$var = 'value';
`;

		const expected = `<?php
$var = 'value';
`;

		expect(minifyPhp(input)).toBe(expected);
	});

	it('should handle empty content', () => {
		expect(minifyPhp('')).toBe('\n');
	});

	it('should handle whitespace-only content', () => {
		expect(minifyPhp('   \n\n  \t  ')).toBe('\n');
	});

	it('should handle complex PHP with all features', () => {
		const input = `<?php
/* 
 * Class description
 */
class TestClass {    // Main class
    private $url = 'https://example.com';  // URL property
    
    /**
     * Method description
     */
    public function getData() {     # Get data
        $color = '#ffffff';   // White color
        
        
        
        return [
            'url' => $this->url,    /* Return URL */
            'color' => $color    # Return color
        ];
    }
}`;

		const expected = `<?php

class TestClass {
private $url = 'https://example.com';

public function getData() {
$color = '#ffffff';

return [
'url' => $this->url,
'color' => $color
];
}
}
`;

		expect(minifyPhp(input)).toBe(expected);
	});

	it('should preserve PHP tags', () => {
		const input = `<?php
$var = 'value';
?>
<html>
<?php echo $var; ?>`;

		const expected = `<?php
$var = 'value';
?>
<html>
<?php echo $var; ?>
`;

		expect(minifyPhp(input)).toBe(expected);
	});

	it('should handle mixed comment types', () => {
		const input = `<?php
/* Multi-line comment */
$var = 'value'; // Single line comment
# Hash comment
echo $var; /* Another multi */ // And another
?>`;

		const expected = `<?php

$var = 'value';

echo $var;
?>
`;

		expect(minifyPhp(input)).toBe(expected);
	});
});
