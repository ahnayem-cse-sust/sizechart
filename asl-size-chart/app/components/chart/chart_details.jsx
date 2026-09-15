import {
    TextField,
    Select,
    Box,
    BlockStack,
    Badge,
    InlineStack,
    Text,
} from "@shopify/polaris";
import AvailableSizeComponent from "./available_size";

export default function ChartDetailsComponent({
    chart,
    templateOptions,
    isEditing,
    title,
    templateId,
    sizeList,
    onTitleChange,
    onTemplateChange,
    onSizeListChange,
}) {
    if (!isEditing) {
        let savedSizes = [];
        try {
            savedSizes = JSON.parse(chart.available_sizes || "[]");
        } catch {
            savedSizes = [];
        }
        return (
            <dl className="asc-details-grid">
                <dt>Title</dt>
                <dd>{chart.title}</dd>
                <dt>Template</dt>
                <dd>{chart.template?.title || "No template linked"}</dd>
                <dt>Available sizes</dt>
                <dd>
                    {savedSizes.length ? (
                        <InlineStack gap="100">
                            {savedSizes.map((s, i) => (
                                <Badge key={i}>{s.value ?? s}</Badge>
                            ))}
                        </InlineStack>
                    ) : (
                        <Text as="span" tone="subdued">None set</Text>
                    )}
                </dd>
            </dl>
        );
    }

    return (
        <Box maxWidth="420px" paddingBlockStart="300">
            <BlockStack gap="300">
                <TextField
                    label="Title"
                    value={title}
                    onChange={onTitleChange}
                    autoComplete="off"
                />
                <Select
                    label="Template"
                    options={[{ label: "Select a template", value: "", disabled: true }, ...templateOptions]}
                    value={templateId}
                    onChange={onTemplateChange}
                    helpText="The content shown on the storefront comes from this template."
                />
                <AvailableSizeComponent sizeList={sizeList} setSizeList={onSizeListChange} />
            </BlockStack>
        </Box>
    );
}
