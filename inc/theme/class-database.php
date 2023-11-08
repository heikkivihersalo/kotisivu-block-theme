<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * 
 * @package Kotisivu\BlockTheme
 */

class Database {
    /**
     * Tables
     * @var array
     */
    protected $tables;

    /**
     * Constructor
     * @return void
     */
    public function __construct($tables) {
        global $wpdb;

        /**
         * Set attributes
         */
        $this->tables = $tables;
    }

    /**
     * Create new table to database if not exists
     * @return void
     */
    public function create_database_tables(): void {
        /**
         * Guard clauses
         */
        if (get_option('kotisivu-block-theme_first_theme_activation') === true) return;

        /**
         * Create new table
         */
        global $wpdb;

        /**
         * Loop over custom database tables
         */
        foreach ($this->tables as $table) {
            $name = $wpdb->prefix . $table['name'];
            $schema = $this->get_schema($table['schema']);

            /**
             * Set SQL query
             */
            $charset_collate = $wpdb->get_charset_collate();
            $sql = "CREATE TABLE $name ($schema) $charset_collate;";

            var_dump($sql);

            /**
             * Run SQL query
             */
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }

        /**
         * Update database version and first theme activation status
         */
        add_option('kotisivu-block-theme_db_version', '1.0');
        add_option('kotisivu-block-theme_first_theme_activation', true);
    }

    /**
     * Get SQL query
     * @param array $schema
     * @return string
     */
    public function get_schema($schema): string {
        /**
         * Set SQL query
         */
        $sql = '';

        /**
         * Loop over schema
         */
        foreach ($schema as $properties) :
            /**
             * Set name
             */
            $sql .= $properties['name'] . ' ';

            /**
             * Loop over properties
             */
            foreach ($properties as $property => $value) :
                switch ($property):
                    case 'type':
                        $sql .= ' ' . $value;
                        break;
                    case 'length':
                        $sql .= '(' . $value . ') ';
                        break;
                    case 'not_null':
                        $sql .= $value ? ' NOT NULL' : '';
                        break;
                    case 'auto_increment':
                        $sql .= $value ? ' AUTO_INCREMENT' : '';
                        break;
                    case 'default':
                        /* Make sure default values has quotes around them */
                        $sql .= ' DEFAULT ' . "'" . str_replace("'", "", $value) . "'";
                        break;
                    case 'primary_key':
                        if ($value) {
                            $primary_key = 'PRIMARY KEY ' . '(' . $properties['name'] . ')';
                        }
                        break;
                    default:
                        break;
                endswitch;
            endforeach;

            /**
             * Add comma and end line
             */
            $sql .= ', ';
        endforeach;

        /**
         * Add primary key to SQL query
         */
        if ($primary_key) {
            $sql .= ' ' . $primary_key;
        }

        return $sql;
    }

    /**
     * Initialize
     * @return void
     */
    public function init() {
        add_action('after_switch_theme', [$this, 'create_database_tables']);
    }
}
