<?php

namespace PostTypes;

defined('ABSPATH') or die();

/**
 * Metabox
 *
 * Extension for PostTypes class to create metabox easily.
 *
 * @author  heikkivihersalo
 * @link    https://www.kotisivu.dev
 */

class Metabox {

    /**
     * User inputted options. Required fields are: 'id', 'title'
     * @var array
     */

    private $options;

    /**
     * Metabox ID
     * @var string
     */
    private $id;

    /**
     * Metabox title
     * @var string
     */
    private $title;

    /**
     * Post type or post types in array
     * @var string|array
     */
    private $screen;

    /**
     * Position (normal, side, advanced)
     * @var string
     */
    private $position;

    /**
     * Priority (default, low, high, core)
     * @var string
     */
    private $priority;

    /**
     * User inputted markup for metabox. Required fields are: 'id'
     * @var array
     */
    private $markup;

    /**
     * WordPress nonce to validate form submission
     * @var string
     */
    private $nonce;


    /**
     * Constructor
     * @param array $options
     * @param array $markup
     */
    public function __construct($options, $markup) {
        if (!is_admin()) {
            return;
        };

        $this->set_options($options);
        $this->markup = $markup;
        $this->nonce = 'DvMKb3rnpPsFeZo7XKTg';
    }


    /**
     * Set options
     * @param array $options
     */
    public function set_options($options) {
        $required = [
            'id',
            'title',
            'screen',
            'position',
            'priority'
        ];

        foreach ($required as $key) {
            if (isset($options[$key])) {
                $this->$key = $options[$key];
                continue;
            }

            if ($key === 'screen') {
                $name = ['post'];
            }

            if ($key === 'position') {
                $name = 'normal';
            }

            if ($key === 'priority') {
                $name = 'default';
            }

            $this->$key = $name;
        }
    }


    /**
     * Create Metabox
     */
    public function create_metabox() {
        add_meta_box(
            $this->id, // metabox ID
            __($this->title, 'kotisivu-block-theme'), // title
            [$this, 'create_html'], // callback function
            $this->screen, // post type or post types in array
            $this->position, // position (normal, side, advanced)
            $this->priority // priority (default, low, high, core)
        );
    }


    /**
     * Create HTML content for the metabox
     * @param object $post
     */
    public function create_html($post) {
?>
        <div>
            <?php wp_nonce_field($this->nonce, '_ksdnonce'); ?>
            <?php foreach ($this->markup as $data) : ?>
                <?php $field = $this->validate_field($data); ?>
                <?php echo $this->create_field($post, $field) ?>
            <?php endforeach; ?>
        </div>
    <?php
    }

    public function create_field($post, $field) {
        ob_start(); ?>
        <div class="metabox__input-wrapper">
            <label for="<?php echo $field['id']; ?>"><?php echo __($field['label'], 'kotisivu-block-theme'); ?></label>
            <?php if ($field['type'] == 'text' || $field['type'] == 'url' || $field['type'] == 'number') : ?>
                <!-- Text, URL, Number --->
                <input type="<?php echo $field['type'] ?>" id="<?php echo $field['id'] ?>" name="<?php echo $field['id'] ?>" value="<?php echo esc_attr(get_post_meta($post->ID, $field['id'], true)) ?>">
            <?php endif ?>

            <?php if ($field['type'] == 'checkbox') : ?>
                <!-- Checkbox --->
                <input type="<?php echo $field['type'] ?>" id="<?php echo $field['id'] ?>" name="<?php echo $field['id'] ?>" value="1" <?php checked(1, esc_attr(get_post_meta($post->ID, $field['id'], true))) ?>>
            <?php endif; ?>

            <?php if ($field['type'] == 'select') : ?>
                <?php $meta_values = get_post_meta($post->ID, $field['id'], true); ?>
                <!-- Select --->
                <select name="<?php echo $field['id'] ?>">
                    <?php var_dump($field); ?>
                    <?php foreach ($field['options'] as $option) : ?>
                        <option value="<?php echo $option['value'] ?>" <?php selected($meta_values, $option['value']); ?>><?php echo $option['label'] ?></option>
                    <?php endforeach; ?>
                </select>
            <?php endif; ?>
        </div>

<?php $buffer = ob_get_contents();
        ob_end_clean();
        return $buffer;
    }


    /**
     * Validate field and return formatted values for metabox
     * @param array $data User inputted array
     * @return array $field Formatted array for metabox
     */
    public function validate_field($data) {
        $options = [
            'id',
            'label',
            'type',
            'options'
        ];

        $field = [];

        foreach ($options as $key) {
            if (isset($data[$key])) {
                $field[$key] = $data[$key];
                continue;
            }

            // Validate label
            $name = $key === 'label' ? ucwords(strtolower(str_replace(['-', '_'], ' ', $data['id']))) : '';

            // Validate type
            $name = $key === 'type' ? 'text' : '';

            // Validate value
            $name = $key === 'value' ? isset($data['value']) : '';

            // Validate options
            $name = $key === 'options' ? isset($data['options']) : [];

            /**
             * Set field 
             */
            $field[$key] = $name;
        }

        return $field;
    }

    /**
     * Save Metabox
     * @param object $post
     * @param string $post_id
     */
    public function save_metabox($post_id, $post) {
        if (!isset($_POST['_ksdnonce']) || !wp_verify_nonce($_POST['_ksdnonce'], $this->nonce)) {
            return $post_id;
        }

        /* Check current use permissions */
        $post_type = get_post_type_object($post->post_type);

        if (!current_user_can($post_type->cap->edit_post, $post_id)) {
            return $post_id;
        }

        /* Do not save the data if autosave */
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return $post_id;
        }

        /** 
         * Get current fields
         */
        foreach ($this->markup as $field) {
            /* Sanitize Fields */
            if ($field['type'] == 'url') {
                $content = sanitize_url($_POST[$field['id']]);
            }

            if ($field['type'] == 'text') {
                $content = sanitize_text_field($_POST[$field['id']]);
            }

            if ($field['type'] == 'checkbox') {
                $content = sanitize_text_field($_POST[$field['id']]);
            }

            if ($field['type'] == 'number') {
                $content = sanitize_text_field($_POST[$field['id']]);
            }

            if ($field['type'] == 'select') {
                $content = sanitize_text_field($_POST[$field['id']]);
            }

            /* Save to database */
            if (isset($_POST[$field['id']])) {
                update_post_meta($post->ID, $field['id'], $content);
            } else {
                delete_post_meta($post->ID, $field['id']);
            }
        }

        return $post_id;
    }

    /**
     * Register Metabox
     */
    public function register() {
        add_action('add_meta_boxes', [$this, 'create_metabox']);
        add_action('save_post', [$this, 'save_metabox'], 10, 2);
    }
}
