<?php

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */
class Database {
	/**
	 * Tables
	 *
	 * @var array
	 */
	protected $tables;

	/**
	 * Constructor
	 *
	 * @return void
	 */
	public function __construct( $tables ) {
		global $wpdb;

		/**
		 * Set attributes
		 */
		$this->tables = $tables;
	}

	/**
	 * Create new table to database if not exists
	 *
	 * @return void
	 */
	public function create_database_tables(): void {
		global $wpdb;

		/**
		 * Guard clauses
		 */
		// if (get_option('kotisivu-block-theme_first_theme_activation') === true) return;

		/**
		 * Create new table
		 */
		$query = array();

		/**
		 * Add tables
		 */
		foreach ( $this->tables as $table ) :
			$name            = $wpdb->prefix . $table['name'];
			$schema          = $this->get_schema( $table['schema'], $wpdb->prefix );
			$charset_collate = $wpdb->get_charset_collate();
			$query[]         = array(
				'table_name' => $name,
				'query'      => "CREATE TABLE IF NOT EXISTS $name ($schema) $charset_collate",
			);
		endforeach;

		/**
		 * Run query
		 */
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

		foreach ( $query as $sql ) :
			$table_name = $sql['table_name'];
			$query      = $sql['query'];

			/**
			 * Check if table already exists
			 */
			if ( $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) == $sql['table_name'] ) {
				add_action(
					'admin_notices',
					function () use ( $table_name ) {
						echo '<div class="notice notice-warning is-dismissible">
                             <p>' . sprintf( __( 'Table %1$s already exists', 'kotisivu-block-theme' ), esc_html( $table_name ) ) . '</p>
                        </div>';
					}
				);
				continue;
			}

			/**
			 * Create table if not exists
			 */
			dbDelta( $query );

			/**
			 * Check if table was created succesfully
			 */
			if ( $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) == $sql['table_name'] ) {
				add_action(
					'admin_notices',
					function () use ( $table_name ) {
						echo '<div class="notice notice-success is-dismissible">
                             <p>' . sprintf( __( 'Table %1$s created succesfully', 'kotisivu-block-theme' ), esc_html( $table_name ) ) . '</p>
                        </div>';
					}
				);
			} else {
				add_action(
					'admin_notices',
					function () use ( $table_name ) {
						echo '<div class="notice notice-error is-dismissible">
                             <p>' . sprintf( __( 'Table %1$s creation failed', 'kotisivu-block-theme' ), esc_html( $table_name ) ) . '</p>
                        </div>';
					}
				);
			}
		endforeach;

		/**
		 * Update database version and first theme activation status
		 */
		add_option( 'kotisivu-block-theme_db_version', '1.0' );
		add_option( 'kotisivu-block-theme_first_theme_activation', true );
	}

	/**
	 * Get SQL query
	 *
	 * @param array $schema Schema
	 * @return string
	 */
	public function get_schema( $schema, $prefix ): string {
		/**
		 * Set SQL query
		 */
		$sql = '';

		/**
		 * Store foreign keys to temporary array
		 */
		$foreign_keys = array();

		/**
		 * Loop over schema
		 */
		foreach ( $schema as $properties ) :
			/**
			 * Set name
			 */
			$sql .= $properties['name'] . ' ';

			/**
			 * Loop over properties
			 */
			foreach ( $properties as $property => $value ) :
				switch ( $property ) :
					case 'type':
						// Default boolean to bit(1)
						if ( $value === 'boolean' ) {
							$value = 'bit(1)';
						}
						// Other types
						$sql .= ' ' . $value;
						break;
					case 'length':
						$sql .= '(' . $value . ') ';
						break;
					case 'unsigned':
						$sql .= $value ? ' UNSIGNED' : '';
						break;
					case 'unique':
						$sql .= $value ? ' UNIQUE' : '';
						break;
					case 'not_null':
						$sql .= $value ? ' NOT NULL' : '';
						break;
					case 'auto_increment':
						$sql .= $value ? ' AUTO_INCREMENT' : '';
						break;
					case 'default':
						/* Make sure default values has quotes around them */
						$sql .= ' DEFAULT ' . "'" . str_replace( "'", '', $value ) . "'";
						break;
					case 'primary_key':
						if ( $value ) {
							$primary_key = 'PRIMARY KEY  ' . '(' . $properties['name'] . ')';
						}
						break;
					case 'foreign_key':
						$key       = 'FOREIGN KEY  ' . '(' . $properties['name'] . ')';
						$reference = 'REFERENCES ' . $prefix . $value['table'] . '(' . $value['column'] . ')';
						$on_delete = isset( $value['on_delete'] ) ? 'ON DELETE ' . $value['on_delete'] : '';
						$on_update = isset( $value['on_update'] ) ? 'ON UPDATE ' . $value['on_update'] : '';

						$foreign_keys[] = $key . ' ' . $reference . ' ' . $on_delete . ' ' . $on_update;
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
		if ( $primary_key ) {
			$sql .= ' ' . $primary_key;
		}

		/**
		 * Add foreign key to SQL query
		 */

		if ( count( $foreign_keys ) > 0 ) {
			foreach ( $foreign_keys as $key ) {
				$sql .= ', ';
				$sql .= $key;
			}
		}

		return $sql;
	}

	/**
	 * Initialize
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'after_switch_theme', array( $this, 'create_database_tables' ) );
	}
}
