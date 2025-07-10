import { useState, useCallback } from 'react';
import {
    Button,
    Popover, ActionList
} from "@shopify/polaris";
import {
    CONTENT_TYPE_DESCRIPTION,
    CONTENT_TYPE_TABLE,
    CONTENT_TYPE_IMAGE
} from '../../services/utils/defines';

export default function BlockButtonComponent({ btnText, templateId }) {
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

    const addBlock = async (contentType,templateId) => {

        const formData = new FormData();
        formData.append("intent", "ADD_BLOCK");
        formData.append("template_id", templateId);
        formData.append("content_type", contentType);

        const res = await fetch("/app/templates/" + templateId, {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            window.location.reload(); // Or use `navigate()` to refresh
        } else {
            alert("Failed to add sizetable.");
        }
    }

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
                        { content: 'Advanced Table', onAction: () => addBlock(CONTENT_TYPE_TABLE,templateId) },
                        { content: 'Text', onAction: () => addBlock(CONTENT_TYPE_DESCRIPTION,templateId) },
                        { content: 'Image', onAction: () => addBlock(CONTENT_TYPE_IMAGE,templateId) }
                    ]}
                />
            </Popover>
        </div>
    );
}