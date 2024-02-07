import { __ } from "@wordpress/i18n";
import { useState, useEffect, useRef } from '@wordpress/element';

import { link, linkOff } from '@wordpress/icons';

import {
    BlockControls,
    __experimentalLinkControl as LinkControl
} from "@wordpress/block-editor";

import {
    ToolbarButton,
    Popover
} from "@wordpress/components";

const Inspector = (props) => {
    const {
        attributes: {
            post,
            linkUrl,
            linkTarget,
            linkRel
        },
        isSelected,
        setAttributes,
    } = props;

    const blockPropsRef = useRef();
    const richTextRef = useRef();
    const [isEditingURL, setIsEditingURL] = useState(false);
    const opensInNewTab = linkTarget === '_blank';
    const isURLSet = !!linkUrl;

    const onToggleOpenInNewTab = (value) => {
        const newLinkTarget = value ? '_blank' : undefined;

        let updatedRel = linkRel;
        if (newLinkTarget && !linkRel) {
            updatedRel = 'noreferrer noopener';
        } else if (!newLinkTarget && linkRel === 'noreferrer noopener') {
            updatedRel = undefined;
        }

        setAttributes({
            linkTarget: newLinkTarget,
            linkRel: updatedRel,
        });
    }

    const unlink = () => {
        setAttributes({
            post: undefined,
            linkUrl: undefined,
            linkTarget: undefined,
            linkRel: undefined
        });
        setIsEditingURL(false);
    }

    const startEditing = (event) => {
        event.preventDefault();
        setIsEditingURL(true);
    }

    useEffect(() => {
        if (!isSelected) {
            setIsEditingURL(false);
        }
    }, [isSelected]);

    return (
        <>
            <BlockControls group="block">
                {!isURLSet && (
                    <ToolbarButton
                        name="link"
                        icon={link}
                        title={__('Link')}
                        onClick={startEditing}
                    />
                )}
                {isURLSet && (
                    <ToolbarButton
                        name="link"
                        icon={linkOff}
                        title={__('Unlink')}
                        onClick={unlink}
                        isActive={true}
                    />
                )}
            </BlockControls>
            {isSelected && (isEditingURL || isURLSet) && (
                <Popover
                    position="bottom center"
                    onClose={() => {
                        setIsEditingURL(false);
                        richTextRef.current?.focus();
                    }}
                    anchorRef={blockPropsRef?.current}
                    focusOnMount={isEditingURL ? 'firstElement' : false}
                    __unstableSlotName={'__unstable-block-tools-after'}
                >
                    <LinkControl
                        value={post}
                        onChange={(newPost) => {
                            setAttributes({
                                post: newPost,
                                linkUrl: newPost.url,
                                linkTitle: newPost.title
                            });

                            if (opensInNewTab !== newPost.opensInNewTab) {
                                onToggleOpenInNewTab(newPost.opensInNewTab);
                            }
                        }}
                        onRemove={() => {
                            unlink();
                            richTextRef.current?.focus();
                        }}
                        forceIsEditingLink={isEditingURL}
                    />
                </Popover>
            )}
        </>
    )
}

export default Inspector
