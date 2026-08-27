import {
    IndexTable,
    useIndexResourceState,
    Text,
    Card,
    Box,
    Pagination,
    Link,
    Button,
    Badge,
    InlineStack,
    EmptyState,
} from '@shopify/polaris';
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { INTENT,INTENT_DELETE } from '../../services/constants/global';
import { CHART_BASE_URL, CHART_CONTENTS_URL } from '../../services/constants/routes';

export function ChartListComponent({ charts, pagination }) {
    const resourceName = {
        singular: "size chart",
        plural: "size charts",
    };

    const navigate = useNavigate();
    const [deletingId, setDeletingId] = useState(null);

    const { selectedResources, allResourcesSelected, handleSelectionChange, clearSelection } =
        useIndexResourceState(charts);

    const deleteOne = async (id) => {
        const formData = new FormData();
        formData.append(INTENT, INTENT_DELETE);
        formData.append("id", id);

        return fetch(CHART_BASE_URL, {
            method: "POST",
            body: formData,
        });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this chart?")) return;
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
        const ids = allResourcesSelected ? charts.map((c) => c.id) : selectedResources;
        if (!ids.length) return;
        if (!confirm(`Delete ${ids.length} chart${ids.length > 1 ? "s" : ""}?`)) return;

        const results = await Promise.all(ids.map((id) => deleteOne(id)));
        if (results.every((r) => r.ok)) {
            window.location.reload();
        } else {
            alert("Some charts failed to delete.");
        }
    };

    if (charts.length === 0) {
        return (
            <Card>
                <EmptyState
                    heading="No size charts yet"
                    action={undefined}
                    image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                >
                    <p>Create your first chart from one of your templates to start attaching size guides to products.</p>
                </EmptyState>
            </Card>
        );
    }

    return (
        <Card padding="0">
            <IndexTable
                resourceName={resourceName}
                itemCount={charts.length}
                selectedItemsCount={
                    allResourcesSelected ? "All" : selectedResources.length
                }
                selectedResources={selectedResources}
                onSelectionChange={handleSelectionChange}
                headings={[
                    { title: "Title" },
                    { title: "Template" },
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
                {charts.map((chart, index) => (
                    <IndexTable.Row
                        id={chart.id}
                        key={chart.id}
                        selected={selectedResources.includes(chart.id)}
                        position={index}
                    >
                        <IndexTable.Cell>
                            <Link to={CHART_CONTENTS_URL+`${chart.id}`} removeUnderline>
                                <Text variant="bodyMd" fontWeight="medium" as="span">
                                    {chart.title}
                                </Text>
                            </Link>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            {chart.template?.title ? (
                                <Badge>{chart.template.title}</Badge>
                            ) : (
                                <Text as="span" tone="subdued">No template</Text>
                            )}
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            <Text as="span" tone="subdued">
                                {new Date(chart.createdAt).toLocaleDateString()}
                            </Text>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            <InlineStack gap="200">
                                <Button url={CHART_CONTENTS_URL+`${chart.id}`} size="slim">View</Button>
                                <Button
                                    size="slim"
                                    tone="critical"
                                    loading={deletingId === chart.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(chart.id);
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
