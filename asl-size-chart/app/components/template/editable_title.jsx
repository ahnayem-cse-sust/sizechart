import { useState, useCallback, useEffect } from "react";
import {
    InlineStack,
    TextField,
    Text,
    Button,
    Box,
    InlineError,
} from "@shopify/polaris";
import { EditIcon, CheckIcon, XIcon } from "@shopify/polaris-icons";
import { INTENT, INTENT_UPDATE } from "../../services/constants/global";

export default function EditableTitleComponent({ template, suffix = "" }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(template.title);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setTitle(template.title);
    }, [template.title]);

    const startEditing = useCallback(() => {
        setTitle(template.title);
        setError("");
        setIsEditing(true);
    }, [template.title]);

    const cancelEditing = useCallback(() => {
        setTitle(template.title);
        setError("");
        setIsEditing(false);
    }, [template.title]);

    const handleTitleChange = useCallback((value) => setTitle(value), []);

    const handleSave = async () => {
        const trimmed = title.trim();
        if (!trimmed) {
            setError("Title is required");
            return;
        }

        setSaving(true);
        setError("");

        const formData = new FormData();
        formData.append(INTENT, INTENT_UPDATE);
        formData.append("id", template.id);
        formData.append("title", trimmed);
        formData.append("category", template.category);

        try {
            const res = await fetch("/app/templates", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                window.location.reload();
            } else {
                setSaving(false);
                setError("Failed to update title.");
            }
        } catch (error) {
            setSaving(false);
            setError("Failed to update title.");
        }
    };

    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                handleSave();
            } else if (event.key === "Escape") {
                cancelEditing();
            }
        },
        [cancelEditing, title],
    );

    if (!isEditing) {
        return (
            <InlineStack gap="150" blockAlign="center">
                <Text variant="heading2xl" as="h3">
                    {template.title}
                    {suffix}
                </Text>
                <Button
                    icon={EditIcon}
                    accessibilityLabel="Edit title"
                    variant="tertiary"
                    onClick={startEditing}
                />
            </InlineStack>
        );
    }

    return (
        <Box minWidth="260px">
            <InlineStack gap="150" blockAlign="center" wrap={false}>
                <div style={{ minWidth: "220px" }} onKeyDown={handleKeyDown}>
                    <TextField
                        labelHidden
                        label="Title"
                        value={title}
                        onChange={handleTitleChange}
                        autoComplete="off"
                        autoFocus
                        disabled={saving}
                    />
                </div>
                <Button
                    icon={CheckIcon}
                    accessibilityLabel="Save title"
                    variant="primary"
                    loading={saving}
                    onClick={handleSave}
                />
                <Button
                    icon={XIcon}
                    accessibilityLabel="Cancel"
                    variant="tertiary"
                    disabled={saving}
                    onClick={cancelEditing}
                />
            </InlineStack>
            {error && <InlineError message={error} />}
        </Box>
    );
}
