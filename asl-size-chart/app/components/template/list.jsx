import {
    IndexTable,
    useIndexResourceState,
    Text,
    Card,
    Box,
    Pagination,
    Button,
    Badge,
    InlineStack,
    EmptyState,
} from '@shopify/polaris';
import { useNavigate } from "@remix-run/react";
import { INTENT,INTENT_DELETE } from '../../services/constants/global';
import { TEMPLATE_BASE_URL, TEMPLATE_CONTENTS_URL } from '../../services/constants/routes';
import TemplateListPreviewButton from './list_preview_button';

export function TemplateListComponent({ templates, pagination }) {
    const resourceName = {
        singular: "template",
        plural: "templates",
    };

    const navigate = useNavigate();

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(templates);

    const deleteOne = async (id) => {
        const formData = new FormData();
        formData.append(INTENT, INTENT_DELETE);
        formData.append("id", id);

        return fetch(TEMPLATE_BASE_URL, {
            method: "POST",
            body: formData,
        });
    };

    const handleBulkDelete = async () => {
        const ids = allResourcesSelected ? templates.map((t) => t.id) : selectedResources;
        if (!ids.length) return;
        if (!confirm(`Delete ${ids.length} template${ids.length > 1 ? "s" : ""}?`)) return;

        const results = await Promise.all(ids.map((id) => deleteOne(id)));
        if (results.every((r) => r.ok)) {
            window.location.reload();
        } else {
            alert("Some templates failed to delete.");
        }
    };

    if (templates.length === 0) {
        return (
            <Card>
                <EmptyState
                    heading="No templates yet"
                    action={undefined}
                    image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                >
                    <p>Create a template to define reusable size guide content — tables, descriptions, and images — that your charts can reference.</p>
                </EmptyState>
            </Card>
        );
    }

    return (
        <Card padding="0">
            <style>{`
                .asc-template-title {
                    cursor: pointer;
                }
                .asc-template-title:hover {
                    text-decoration: underline;
                }
            `}</style>
            <IndexTable
                resourceName={resourceName}
                itemCount={templates.length}
                selectedItemsCount={
                    allResourcesSelected ? "All" : selectedResources.length
                }
                selectedResources={selectedResources}
                onSelectionChange={handleSelectionChange}
                headings={[
                    { title: "Title" },
                    { title: "Category" },
                    { title: "Created" },
                    { title: "Actions" },
                ]}
                promotedBulkActions={[
                    {
                        content: 'Delete selected',
                        onAction: handleBulkDelete,
                    },
                ]}
            >
                {templates.map((template, index) => (
                    <IndexTable.Row
                        id={template.id}
                        key={template.id}
                        selected={selectedResources.includes(template.id)}
                        position={index}
                        onClick={() => {}}
                    >
                        <IndexTable.Cell>
                            <span
                                className="asc-template-title"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(TEMPLATE_CONTENTS_URL + `${template.id}`);
                                }}
                            >
                                <Text variant="bodyMd" fontWeight="medium" as="span">
                                    {template.title}
                                </Text>
                            </span>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            <Badge>{template.category}</Badge>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            <Text as="span" tone="subdued">
                                {new Date(template.createdAt).toLocaleDateString()}
                            </Text>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            <InlineStack gap="200">
                                <TemplateListPreviewButton
                                    templateId={template.id}
                                    templateTitle={template.title}
                                />
                                <Button
                                    url={TEMPLATE_CONTENTS_URL+`${template.id}`}
                                    size="slim"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Customize
                                </Button>
                            </InlineStack>
                        </IndexTable.Cell>
                    </IndexTable.Row>
                ))}
            </IndexTable>

            {pagination.totalPages > 1 && (
                <Box padding="400" borderBlockStartWidth="025" borderColor="border">
                    <InlineStack align="space-between" blockAlign="center">
                        <Pagination
                            hasPrevious={pagination.currentPage > 1}
                            onPrevious={() => {
                                navigate(`?page=${pagination.currentPage - 1}`);
                            }}
                            hasNext={pagination.currentPage < pagination.totalPages}
                            onNext={() => {
                                navigate(`?page=${pagination.currentPage + 1}`);
                            }}
                        />
                        <Text variant="bodySm" as="p" tone="subdued">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </Text>
                    </InlineStack>
                </Box>
            )}
        </Card>
    );
}
