import { useState, useCallback, useEffect } from "react";
import {
    InlineStack,
    Select,
    Text,
    Button,
    Box,
    InlineError,
} from "@shopify/polaris";
import { EditIcon, CheckIcon, XIcon } from "@shopify/polaris-icons";
import { INTENT, INTENT_UPDATE } from "../../services/constants/global";

export default function EditableCategoryComponent({ template, templateCategories }) {
    const [isEditing, setIsEditing] = useState(false);
    const [category, setCategory] = useState(template.category);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setCategory(template.category);
    }, [template.category]);

    const startEditing = useCallback(() => {
        setCategory(template.category);
        setError("");
        setIsEditing(true);
    }, [template.category]);

    const cancelEditing = useCallback(() => {
        setCategory(template.category);
        setError("");
        setIsEditing(false);
    }, [template.category]);

    const handleCategoryChange = useCallback((value) => setCategory(value), []);

    const handleSave = async () => {
        if (!category) {
            setError("Category is required");
            return;
        }

        setSaving(true);
        setError("");

        const formData = new FormData();
        formData.append(INTENT, INTENT_UPDATE);
        formData.append("id", template.id);
        formData.append("title", template.title);
        formData.append("category", category);

        try {
            const res = await fetch("/app/templates", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                window.location.reload();
            } else {
                setSaving(false);
                setError("Failed to update category.");
            }
        } catch (error) {
            setSaving(false);
            setError("Failed to update category.");
        }
    };

    if (!isEditing) {
        return (
            <InlineStack gap="150" blockAlign="center">
                <Text variant="headingSm" as="h3" tone="subdued">Category:</Text>
                <Text as="span">{template.category}</Text>
                <Button
                    icon={EditIcon}
                    accessibilityLabel="Edit category"
                    variant="tertiary"
                    onClick={startEditing}
                />
            </InlineStack>
        );
    }

    return (
        <Box minWidth="260px">
            <InlineStack gap="150" blockAlign="center" wrap={false}>
                <div style={{ minWidth: "220px" }}>
                    <Select
                        labelHidden
                        label="Category"
                        options={templateCategories}
                        value={category}
                        onChange={handleCategoryChange}
                        disabled={saving}
                    />
                </div>
                <Button
                    icon={CheckIcon}
                    accessibilityLabel="Save category"
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
