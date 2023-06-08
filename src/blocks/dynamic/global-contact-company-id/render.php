<?php
/**
 * Render global contact company ID (VAT) callback
 * @param mixed $block_attributes 
 * @param mixed $content 
 * @return string|false 
 */
function render_global_contact_company_id($block_attributes, $content) {
    return $block_attributes["options"]['contact-company-id'];
}