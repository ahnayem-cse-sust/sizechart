import { useState, useCallback } from 'react';
import {
    Button,
    Popover, ActionList
} from "@shopify/polaris";

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

    const addTableBlock = async (templateId)=>{

        const formData = new FormData();
        formData.append("intent", "ADD_TABLE");
        formData.append("template_id", templateId);

        const res = await fetch("/app/templates/"+templateId, {
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
                    items={[{ content: 'Advanced Table', onAction:() => addTableBlock(templateId)}, { content: 'Text' }]}
                />
            </Popover>
        </div>
    );
}