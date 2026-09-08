import {
    TextField,
    Select,
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
            <dl className="asc-details-grid">
                <dt>Title</dt>
                <dd>{template.title}</dd>
                <dt>Category</dt>
                <dd>{template.category}</dd>
            </dl>
        );
    }

    return (
        <Box maxWidth="360px" paddingBlockStart="300">
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
