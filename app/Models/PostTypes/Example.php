<?php

namespace Kotisivu\BlockTheme\PostTypes;

use HeikkiVihersalo\CustomPostTypes\PostType;
use HeikkiVihersalo\CustomPostTypes\Interfaces\PostTypeInterface;

class Example extends PostType implements PostTypeInterface {
    /**
     * @inheritDoc
     */
    public function register(): void {
        $this->register_custom_post_type();
    }
}
