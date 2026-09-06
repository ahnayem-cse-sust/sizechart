import {
    InlineStack,
    TextField,
    Select,
    Text,
    Box,
    BlockStack,
} from "@shopify/polaris";

export default function TemplateDetailsComponent({
    template,
    templateCategories,
    isEditing,
    title,
    category,
    onTitleChange,
    onCategoryChange,
}) {
    if (!isEditing) {
        return (
            <BlockStack gap="150">
                <InlineStack gap="150" blockAlign="center">
                    <Text variant="headingSm" as="h3" tone="subdued">Title:</Text>
                    <Text as="span">{template.title}</Text>
                </InlineStack>
                <InlineStack gap="150" blockAlign="center">
                    <Text variant="headingSm" as="h3" tone="subdued">Category:</Text>
                    <Text as="span">{template.category}</Text>
                </InlineStack>
            </BlockStack>
        );
    }

    return (
        <Box maxWidth="360px">
            <BlockStack gap="300">
                <TextField
                    label="Title"
                    value={title}
                    onChange={onTitleChange}
                    autoComplete="off"
                />
                <Select
                    label="Category"
                    options={templateCategories}
                    value={category}
                    onChange={onCategoryChange}
                />
            </BlockStack>
        </Box>
    );
}
