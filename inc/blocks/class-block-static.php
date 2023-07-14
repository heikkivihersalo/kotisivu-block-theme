<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

class BlockStatic extends Blocks {
    /**
     * 
     */
    protected $path;

    /**
     * 
     */
    protected $parent_path;

    /**
     * 
     */
    protected $config;

    /**
     * Constructor
     * @return void 
     */
    public function __construct($path, $parent_path, $config) {
        parent::__construct($path, $parent_path, $config);
    }

    /**
     * Register static blocks
     * @return void 
     */
    public function register_static_blocks(): void {
        foreach ($this->config['blocks']['static'] as $block) :
            try {
                register_block_type($this->get_block_path($block, 'static'));
            } catch (\Exception $e) {
                $this->write_log($e->getMessage());
            }

            if ($this->config["blocks"]["translations"]) :
                if (class_exists('Translation')) new Translation($block, 'kotisivu-block-theme');
            endif;
            
        endforeach;
    }

    /**
	 * Get path to block folder. Checks child theme first, if not found, uses parent theme blocks folder.
	 * @param string $block name of the block with namespace 
	 * @param string $type type of block (static or dynamic)
	 * @return string path to block folder 
	 */
	private function get_block_path(string $block, string $type): string {
		$_name = explode('/', $block)[1];
        $_path = $this->path . '/src/blocks';
		$_parent_path = $this->parent_path . '/src/blocks';

		return file_exists("{$_path}/{$type}/{$_name}")
			? "{$_path}/{$type}/{$_name}"
			: "{$_parent_path}/{$type}/{$_name}";
	}

    
    /**
     * Write to log
     * @param string $message 
     * @return void 
     */
    private function write_log($log): void {
        if ( is_array( $log ) || is_object( $log ) ) {
            error_log( print_r( $log, true ) );
         } else {
            error_log( $log );
         }
    }


    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        if (!function_exists('register_block_type')) return;
        if (!$this->config['blocks']['static']) return;

        /* Check if block translations are set */
        if ($this->config["blocks"]["translations"]) require_once dirname(__FILE__) . '/class-blocks-translation.php';

        /* Register blocks */
        add_action('init', [$this, 'register_static_blocks']);
    }
}
