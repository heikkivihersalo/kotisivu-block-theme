import { __ } from "@wordpress/i18n";
import { addModifiers } from '../../../utils/modifiers';
import {
    PanelRow,
    ToggleControl
} from "@wordpress/components";


const AlignmentReverse = (props) => {
    const {
        attributes: {
            modifiers,
            isReversed,
        },
    } = props;

    return (
        <>
            <PanelRow>
                <ToggleControl
                    label={__('Reverse Block Alignment', 'kotisivu-block-theme')}
                    checked={isReversed}
                    onChange={addModifiers(props, "isReversed", isReversed, "is-reversed", "modifiers", modifiers)}
                />
            </PanelRow>
        </>
    )
}

export { AlignmentReverse }
