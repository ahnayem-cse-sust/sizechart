import {
    IndexTable,
    useIndexResourceState,
    Text,
    Box,
    Pagination,
    Link,
    Button,
    InlineStack
} from '@shopify/polaris';
import { useNavigate } from "@remix-run/react";
import { INTENT,INTENT_DELETE } from '../../services/constants/global';
import { TEMPLATE_BASE_URL, TEMPLATE_CONTENTS_URL } from '../../services/constants/routes';

export function TemplateListComponent({ templates, pagination }) {
    const resourceName = {
        singular: "size chart",
        plural: "size charts",
    };

    const navigate = useNavigate();

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(templates);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this template?")) return;

        const formData = new FormData();
        formData.append(INTENT, INTENT_DELETE);
        formData.append("id", id);

        const res = await fetch(TEMPLATE_BASE_URL, {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            window.location.reload(); // Or use `navigate()` to refresh
        } else {
            alert("Failed to delete.");
        }
    };

    return (
        <div>
            <Box paddingBlockEnd="400">
                {/* <Card> */}
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
                            { title: "Created" },
                            { title: "Actions" },
                        ]}
                        promotedBulkActions={[
                            {
                                content: 'Delete selected',
                                onAction: () => {
                                    // You can optionally delete selectedResources here
                                    console.log("Delete selected", selectedResources);
                                },
                            },
                        ]}
                    >
                        {templates.map((template, index) => (
                            <IndexTable.Row
                                id={template.id}
                                key={template.id}
                                selected={selectedResources.includes(template.id)}
                                position={index}
                                // onClick={() => {
                                //     console.log("Selected - ", template.id);
                                // }}
                            >
                                <IndexTable.Cell>
                                    {/* <Link to={TEMPLATE_CONTENTS_URL+`${template.id}`}> */}
                                        <Text variant="bodyMd" fontWeight="medium" as="span">
                                            {template.title}
                                        </Text>
                                    {/* </Link> */}
                                </IndexTable.Cell>
                                <IndexTable.Cell>
                                    {new Date(template.createdAt).toLocaleDateString()}
                                </IndexTable.Cell>
                                <IndexTable.Cell>
                                    <InlineStack gap="2">
                                        <Button url={TEMPLATE_CONTENTS_URL+`${template.id}`} size="slim">View</Button>
                                        <Button
                                            size="slim"
                                            tone="critical"
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

                    <div className="flex justify-between items-center px-4 py-3">
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
                        <Text variant="bodySm" as="p">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </Text>
                    </div>
                {/* </Card> */}
            </Box>
        </div>
    );
}
