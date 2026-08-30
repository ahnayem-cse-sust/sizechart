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
import { useState } from "react";
import { INTENT,INTENT_DELETE } from '../../services/constants/global';
import { TEMPLATE_BASE_URL, TEMPLATE_CONTENTS_URL } from '../../services/constants/routes';

export function TemplateListComponent({ templates, pagination }) {
    const resourceName = {
        singular: "template",
        plural: "templates",
    };

    const navigate = useNavigate();
    const [deletingId, setDeletingId] = useState(null);

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

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this template? Any charts using it will be affected.")) return;
        setDeletingId(id);
        const res = await deleteOne(id);
        if (res.ok) {
            window.location.reload();
        } else {
            setDeletingId(null);
            alert("Failed to delete.");
        }
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
                        onClick={() => navigate(TEMPLATE_CONTENTS_URL + `${template.id}`)}
                    >
                        <IndexTable.Cell>
                            <Text variant="bodyMd" fontWeight="medium" as="span">
                                {template.title}
                            </Text>
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
                                <Button
                                    url={TEMPLATE_CONTENTS_URL+`${template.id}`}
                                    size="slim"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    View
                                </Button>
                                <Button
                                    size="slim"
                                    tone="critical"
                                    loading={deletingId === template.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(template.id);
                                    }}
                                >
                                    Delete
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
