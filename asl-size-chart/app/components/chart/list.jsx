import {
    IndexTable,
    useIndexResourceState,
    Text,
    Card,
    Box,
    Pagination,
    InlineStack,
    EmptyState,
} from '@shopify/polaris';
import { useNavigate } from "@remix-run/react";
import { INTENT,INTENT_DELETE } from '../../services/constants/global';
import { CHART_BASE_URL, CHART_CONTENTS_URL } from '../../services/constants/routes';

export function ChartListComponent({ charts, pagination }) {
    const resourceName = {
        singular: "size chart",
        plural: "size charts",
    };

    const navigate = useNavigate();

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
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
            <style>{`
                .asc-chart-title {
                    cursor: pointer;
                }
                .asc-chart-title:hover {
                    text-decoration: underline;
                }
            `}</style>
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
                    { title: "Created on" },
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
                        onClick={() => navigate(CHART_CONTENTS_URL + `${chart.id}`)}
                    >
                        <IndexTable.Cell>
                            <span className="asc-chart-title">
                                <Text variant="bodyMd" fontWeight="medium" as="span">
                                    {chart.title}
                                </Text>
                            </span>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            <Text as="span" tone="subdued">
                                {new Date(chart.createdAt).toLocaleDateString()}
                            </Text>
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
