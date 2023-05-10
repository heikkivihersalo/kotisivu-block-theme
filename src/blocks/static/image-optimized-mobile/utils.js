import { dispatch } from '@wordpress/data';

/**
 * Set active state for block
 *
 * @export
 * @param {*} block
 */
export function setActiveState(block) {
    if (block.attributes.isSelected == true) {
        let e = document.querySelector('[data-block="' + block.clientId + '"]');
        e.dataset.active = true;
    } else {
        let e = document.querySelector('[data-block="' + block.clientId + '"]');
        e.dataset.active = false;
    }
}

/**
 * Set device class for block
 *
 * @export
 * @param {*} block
 * @param {*} device
 */
export function setDeviceClass(block, device) {
    let currentClass = block.attributes?.className;
    if (currentClass == undefined || !currentClass.includes(`is-${device}`)) {
        let classToAdd = currentClass == undefined ? `is-${device}` : currentClass + ' ' + `is-${device}`;
        dispatch('core/block-editor').updateBlockAttributes(block.clientId, { className: classToAdd })
    }
}

/**
 * Set device attributes for block
 *
 * @export
 * @param {*} block
 * @param {*} device
 */
export function setDeviceAttributes(block, device) {
    if (device == 'desktop') {
        dispatch('core/block-editor').updateBlockAttributes(block.clientId, { isSelected: true });
        dispatch('core/block-editor').updateBlockAttributes(block.clientId, { isMobile: false });
    }

    if (device == 'mobile') {
        dispatch('core/block-editor').updateBlockAttributes(block.clientId, { isSelected: false });
        dispatch('core/block-editor').updateBlockAttributes(block.clientId, { isMobile: true });
    }
}