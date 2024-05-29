<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * 
 * 
 * @package Kotisivu\BlockTheme 
 */

class Metabox {
    /**
     * Nonce
     * @var string
     */
    protected $nonce = 'kotisivu_block_theme_metabox_nonce';

    /**
     * Metabox fields
     * @var array
     */
    protected $fields = [];

    /**
     * Metabox label
     * @var string
     */
    protected $label;

    /**
     * Post types
     * @var array
     */
    protected $post_types = ['post', 'page'];

    /**
     * Position
     * @var string [ normal | advanced | side ]
     * 
     */
    protected $position = 'normal';

    /**
     * Priority
     * @var string
     */
    protected $priority = 'high';

    /**
     * Constructor
     * @param string $type
     * @param string $title
     * @param string $label
     * @return void 
     */
    public function __construct($fields, $title, $post_types = ['post', 'page'], $position = 'normal', $priority = 'high') {
        $this->fields = $fields;
        $this->title = $title;
        $this->post_types = $post_types;
        $this->position = $position;
        $this->priority = $priority;

        add_action('add_meta_boxes', [$this, 'add_metabox']);
        add_action('save_post', [$this, 'save_metabox']);
    }

    /**
     * Add metabox
     * @return void
     */
    public function add_metabox(): void {
        add_meta_box(
            preg_replace('/\s+/', '-', strtolower($this->title)),
            $this->title,
            [$this, 'render_html'],
            $this->post_types,
            $this->position,
            $this->priority
        );
    }

    /**
     * Render metabox
     * @param \WP_Post $post
     * @return void
     */
    public function render_html(\WP_Post $post): void {
        wp_nonce_field(basename(__FILE__), $this->nonce);

        echo '<table class="form-table">';
        echo '<tbody>';

        foreach ($this->fields as $field) :
            switch ($field['type']) {
                case 'checkbox':
                    $checkbox_field = new CheckboxField($field['id'], $field['label'], $post);
                    echo $checkbox_field->get_html();
                    break;

                case 'checkbox-group':
                    $checkbox_group_field = new CheckboxGroupField($field['id'], $field['label'], $post, $field['options']);
                    echo $checkbox_group_field->get_html();
                    break;

                case 'date':
                    $date_field = new DateField($field['id'], $field['label'], $post);
                    echo $date_field->get_html();
                    break;

                case 'image':
                    $image_field = new ImageField($field['id'], $field['label'], $post);
                    echo $image_field->get_html();
                    break;

                case 'number':
                    $number_field = new NumberField($field['id'], $field['label'], $post);
                    echo $number_field->get_html();
                    break;

                case 'radio-group':
                    $radio_group_field = new RadioGroupField($field['id'], $field['label'], $post, $field['options']);
                    echo $radio_group_field->get_html();
                    break;

                case 'rich-text':
                    $rich_text_field = new RichTextField($field['id'], $field['label'], $post);
                    echo $rich_text_field->get_html();
                    break;

                case 'select':
                    $select_field = new SelectField($field['id'], $field['label'], $post, $field['options']);
                    echo $select_field->get_html();
                    break;

                case 'text':
                    $text_field = new TextField($field['id'], $field['label'], $post);
                    echo $text_field->get_html();
                    break;

                case 'textarea':
                    $textarea_field = new TextAreaField($field['id'], $field['label'], $post);
                    echo $textarea_field->get_html();
                    break;

                case 'url':
                    $url_field = new UrlField($field['id'], $field['label'], $post);
                    echo $url_field->get_html();
                    break;

                default:
                    # code...
                    break;
            }
        endforeach;

        echo '</tbody>';
        echo '</table>';
    }

    /**
     * Save metabox
     * @param int $post_id
     * @return int
     */
    public function save_metabox(int $post_id): int {
        /**
         * Validate save function
         */
        if (!isset($_POST[$this->nonce]) || !wp_verify_nonce($_POST[$this->nonce], basename(__FILE__))) {
            return $post_id;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return $post_id;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return $post_id;
        }

        /**
         * Sanitize fields
         */
        foreach ($this->fields as $field) :
            switch ($field['type']) {
                case 'checkbox-group':
                    $checkbox_group = new CheckboxGroupField($field['id']);
                    $checkbox_group->save_group($post_id, $field['options']);
                    break;

                case 'checkbox':
                    $checkbox_field = new CheckboxField($field['id']);
                    $checkbox_field->save($post_id);
                    break;

                case 'date':
                    $date_field = new DateField($field['id']);
                    $date_field->save($post_id);
                    break;

                case 'image':
                    $image_field = new ImageField($field['id']);
                    $image_field->save($post_id);
                    break;

                case 'number':
                    $number_field = new NumberField($field['id']);
                    $number_field->save($post_id);
                    break;

                case 'rich-text':
                    $rich_text_field = new RichTextField($field['id']);
                    $rich_text_field->save($post_id);
                    break;

                case 'radio-group':
                    $radio_group_field = new RadioGroupField($field['id']);
                    $radio_group_field->save($post_id);
                    break;

                case 'select':
                    $select_field = new SelectField($field['id']);
                    $select_field->save($post_id);
                    break;

                case 'text':
                    $text_field = new TextField($field['id']);
                    $text_field->save($post_id);
                    break;

                case 'textarea':
                    $textarea_field = new TextAreaField($field['id']);
                    $textarea_field->save($post_id);
                    break;

                case 'url':
                    $url_field = new UrlField($field['id']);
                    $url_field->save($post_id);
                    break;

                default:
                    # code...
                    break;
            }
        endforeach;

        return $post_id;
    }
}
