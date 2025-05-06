<?php

declare(strict_types=1);

namespace App\Models\PostTypes;

use Vihersalo\Core\PostTypes\Traits\BlockBindings;
use Vihersalo\Core\PostTypes\Traits\Permalink;
use Vihersalo\Core\PostTypes\Traits\RestAPI;
use Vihersalo\Core\Support\Models\PostType;

class Example extends PostType {
    use Permalink;
    use RestAPI;
    use BlockBindings;

    /**
     * Post type slug.
     * @var string
     */
    protected $slug = 'example';

    /**
     * Post type name.
     * @var string
     */
    protected $name = 'Example';

    /**
     * Hidden fields.
     * @var array
     */
    protected $hidden = [];

    /**
     * Set fields for the post type.
     * @return void
     */
    public function fields(): void {
        $this->fields->addText('example_text', 'Example Text Field');

        $this->fields->addCheckbox('example_checkbox', 'Example Checkbox Field');
        $this->fields->addCheckboxGroup('example_checkbox_group', 'Example Checkbox Group', [
            'option1' => 'Option 1',
            'option2' => 'Option 2',
            'option3' => 'Option 3',
        ]);

        $this->fields->addRadioGroup('example_radio', 'Example Radio Field', [
            'option1' => 'Option 1',
            'option2' => 'Option 2',
            'option3' => 'Option 3',
        ]);

        $this->fields->addTextarea('example_textarea', 'Example Textarea Field');
        $this->fields->addSelect('example_select', 'Example Select Field', [
            'option1' => 'Option 1',
            'option2' => 'Option 2',
            'option3' => 'Option 3',
        ]);
        $this->fields->addImage('example_image', 'Example Image Field');

        $this->fields->addRichText('example_rich_text', 'Example Rich Text Field');
        $this->fields->addDate('example_date', 'Example Date Field');
        $this->fields->addNumber('example_number', 'Example Number Field');
    }
}
