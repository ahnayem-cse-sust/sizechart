import { useState, useCallback } from 'react';
import {
    Button,
    Popover, ActionList
} from "@shopify/polaris";
import * as content_constants from '../../services/constants/content';

export default function BlockButtonComponent({ btnText, onAddBlock }) {
    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const activator = (
        <Button variant='primary' onClick={togglePopoverActive} disclosure>
            {btnText}
        </Button>
    );

    // Adding a block is purely local now — it's only persisted to the
    // server when the page-level Save button is pressed.
    const addBlock = (contentType) => {
        onAddBlock?.(contentType);
        setPopoverActive(false);
    };

    return (
        <div>
            <Popover
                active={popoverActive}
                activator={activator}
                autofocusTarget="first-node"
                onClose={togglePopoverActive}
            >
                <ActionList
                    actionRole="menuitem"
                    items={[
                        { content: 'Advanced Table', onAction: () => addBlock(content_constants.CONTENT_TYPE_TABLE) },
                        { content: 'Text', onAction: () => addBlock(content_constants.CONTENT_TYPE_DESCRIPTION) },
                        { content: 'Image', onAction: () => addBlock(content_constants.CONTENT_TYPE_IMAGE) }
                    ]}
                />
            </Popover>
        </div>
    );
}
