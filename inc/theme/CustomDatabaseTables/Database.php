<?php
/**
 * Class for handling custom database tables
 *
 * @link       https://www.kotisivu.dev
 * @since      1.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\CustomDatabaseTables\Database
 */

namespace Kotisivu\BlockTheme\Theme\CustomDatabaseTables;

defined( 'ABSPATH' ) || die();

/**
 * Class for handling custom database tables
 *
 * @since      1.0.0
 * @package    Kotisivu\BlockTheme\Theme\CustomDatabaseTables\Database
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Database {
	/**
	 * Tables
	 *
	 * @since 1.0.0
	 * @access protected
	 * @var array
	 */
	protected $tables;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 * @access public
	 * @return void
	 */
	public function __construct() {
		global $wpdb;

		/**
		 * Set attributes
		 */
		$this->tables = array(
			array(
				'name'   => 'example',
				'schema' => array(
					array(
						'name'           => 'id',
						'type'           => 'int',
						'length'         => 20,
						'unsigned'       => true,
						'not_null'       => true,
						'auto_increment' => true,
						'primary_key'    => true,
					),
					array(
						'name'    => 'longtext_example',
						'type'    => 'longtext',
						'default' => "''",
					),
					array(
						'name' => 'boolean_example',
						'type' => 'boolean',
					),
					array(
						'name'    => 'varchar_example',
						'type'    => 'varchar',
						'length'  => 255,
						'default' => "''",
					),
					array(
						'name'     => 'time_example',
						'type'     => 'datetime',
						'default'  => "'0000-00-00 00:00:00'",
						'not_null' => true,
					),
				),
			),
		);
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
			// phpcs:ignore -- We need to use direct query here
			$table_name_to_exists = $wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $table_name));
			if ( $table_name_to_exists === $sql['table_name'] ) {
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
			// phpcs:ignore -- We need to use direct query here
			$table_name_created = $wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $table_name));
			if ( $table_name_created === $sql['table_name'] ) {
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
						if ( 'boolean' === $value ) {
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
							$primary_key = 'PRIMARY KEY  (' . $properties['name'] . ')';
						}
						break;
					case 'foreign_key':
						$key       = 'FOREIGN KEY  (' . $properties['name'] . ')';
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
