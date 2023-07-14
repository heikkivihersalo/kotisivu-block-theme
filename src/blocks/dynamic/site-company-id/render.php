<?php

/**
 * Render global contact company ID (VAT) callback
 * @param mixed $block_attributes 
 * @param mixed $content 
 * @return string|false 
 */
function render_site_company_id($block_attributes, $content) {
    return isset($block_attributes["options"]['contact-company-id']) ? $block_attributes["options"]['contact-company-id'] : '';
}
