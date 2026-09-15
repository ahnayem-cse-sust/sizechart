import { useState } from 'react';
import {
    Box,
    Text,
    Button,
    InlineStack,
    InlineError,
    Icon,
} from "@shopify/polaris";
import { ImageIcon, ViewIcon, CheckIcon } from "@shopify/polaris-icons";

function thumbnailUrl(filename) {
    return filename ? '/uploads/' + filename : null;
}

function PickerThumbnail({ src, alt }) {
    return (
        <div
            style={{
                width: '100%',
                paddingTop: '75%',
                position: 'relative',
                background: 'var(--p-color-bg-surface-secondary, #f6f6f7)',
                borderRadius: 'var(--p-border-radius-200, 8px)',
                overflow: 'hidden',
            }}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon source={ImageIcon} tone="subdued" />
                </div>
            )}
        </div>
    );
}

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
    gap: 12,
};

export default function TemplatePickerComponent({ categories, value, onChange, onPreview, previewLoadingId, error }) {
    const allTemplates = categories.flatMap((c) => c.templates);
    const selectedTemplate = allTemplates.find((t) => String(t.id) === String(value));

    const [activeCategory, setActiveCategory] = useState(
        selectedTemplate ? selectedTemplate.category : null,
    );

    return (
        <Box>
            <style>{`
                .asc-tpl-card {
                    position: relative;
                }
                .asc-tpl-thumb-wrap {
                    position: relative;
                }
                .asc-tpl-hover-actions {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    background: rgba(17, 17, 17, 0.5);
                    border-radius: var(--p-border-radius-200, 8px);
                    opacity: 0;
                    transition: opacity 120ms ease;
                    pointer-events: none;
                }
                .asc-tpl-card:hover .asc-tpl-hover-actions,
                .asc-tpl-card:focus-within .asc-tpl-hover-actions {
                    opacity: 1;
                    pointer-events: auto;
                }
            `}</style>

            <Box paddingBlockEnd="100">
                <Text variant="bodyMd" as="span" fontWeight="medium">Choose template</Text>
            </Box>

            {!categories.length && (
                <Text as="p" tone="subdued">
                    No templates yet — create one from the Templates tab first.
                </Text>
            )}

            {categories.length > 0 && selectedTemplate && (
                <InlineStack gap="200" blockAlign="center">
                    <div style={{ width: 48 }}>
                        <PickerThumbnail src={thumbnailUrl(selectedTemplate.thumbnail)} alt={selectedTemplate.title} />
                    </div>
                    <Text as="span">{selectedTemplate.title}</Text>
                    <Button
                        variant="plain"
                        onClick={() => onChange('')}
                    >
                        Change
                    </Button>
                </InlineStack>
            )}

            {categories.length > 0 && !selectedTemplate && activeCategory && (
                <Box>
                    <Box paddingBlockEnd="200">
                        <Button variant="plain" onClick={() => setActiveCategory(null)}>
                            ← All categories
                        </Button>
                    </Box>
                    <div style={gridStyle}>
                        {(categories.find((c) => c.category === activeCategory)?.templates || []).map((template) => (
                            <div key={template.id} className="asc-tpl-card">
                                <div className="asc-tpl-thumb-wrap">
                                    <PickerThumbnail src={thumbnailUrl(template.thumbnail)} alt={template.title} />
                                    <div className="asc-tpl-hover-actions">
                                        <Button
                                            size="slim"
                                            icon={ViewIcon}
                                            loading={previewLoadingId === template.id}
                                            onClick={() => onPreview(template)}
                                        >
                                            Preview
                                        </Button>
                                        <Button
                                            size="slim"
                                            variant="primary"
                                            icon={CheckIcon}
                                            onClick={() => onChange(String(template.id))}
                                        >
                                            Choose
                                        </Button>
                                    </div>
                                </div>
                                <Box paddingBlockStart="100">
                                    <Text as="span" variant="bodySm">{template.title}</Text>
                                </Box>
                            </div>
                        ))}
                    </div>
                </Box>
            )}

            {categories.length > 0 && !selectedTemplate && !activeCategory && (
                <div style={gridStyle}>
                    {categories.map((cat) => (
                        <div
                            key={cat.category}
                            role="button"
                            tabIndex={0}
                            onClick={() => setActiveCategory(cat.category)}
                            onKeyDown={(e) => { if (e.key === 'Enter') setActiveCategory(cat.category); }}
                            style={{ cursor: 'pointer' }}
                        >
                            <PickerThumbnail src={thumbnailUrl(cat.thumbnail)} alt={cat.category} />
                            <Box paddingBlockStart="100">
                                <Text as="span" variant="bodySm" fontWeight="medium">{cat.category}</Text>
                                <Text as="p" variant="bodySm" tone="subdued">
                                    {cat.templates.length} template{cat.templates.length === 1 ? '' : 's'}
                                </Text>
                            </Box>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <Box paddingBlockStart="200">
                    <InlineError message={error} />
                </Box>
            )}
        </Box>
    );
}
