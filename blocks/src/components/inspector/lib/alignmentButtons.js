import { __ } from "@wordpress/i18n";
import { setLCR } from '../../../utilities/modifiers';
import {
    PanelRow,
    Button,
    ButtonGroup
} from "@wordpress/components";


const AlignmentButtons = (props) => {
    const {
        attributes: {
            cardModifiers,
            alignment,
        },
    } = props;

    return (
        <>
            <PanelRow>
                <ButtonGroup>
                    <Button
                        icon="editor-alignleft"
                        isPressed={alignment == "left" ? true : false}
                        onClick={setLCR(props, "alignment", alignment, "left", "cardModifiers", cardModifiers)}
                    />
                    <Button
                        icon="editor-aligncenter"
                        isPressed={alignment == "center" ? true : false}
                        onClick={setLCR(props, "alignment", alignment, "center", "cardModifiers", cardModifiers)}
                    />
                    <Button
                        icon="editor-alignright"
                        isPressed={alignment == "right" ? true : false}
                        onClick={setLCR(props, "alignment", alignment, "right", "cardModifiers", cardModifiers)}
                    />
                </ButtonGroup>
            </PanelRow>
        </>
    )
}

export { AlignmentButtons }
