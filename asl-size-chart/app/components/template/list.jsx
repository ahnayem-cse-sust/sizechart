import {
    IndexTable,
    Card,
    useIndexResourceState,
    Text,
    Box,
    Pagination,
    Link
} from '@shopify/polaris';
import { useNavigate } from "@remix-run/react";

export function TemplateListComponent({ data }) {
    const templates = data.templates || [];
    const pagination = data.pagination || { currentPage: 1, totalPages: 1 };
    const resourceName = {
        singular: "size chart",
        plural: "size charts",
    };

    const navigate = useNavigate();


    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(templates);

    return (
        <div>
            {templates && (
                <Box paddingBlockEnd="400">
                    <Card>
                        <IndexTable
                            resourceName={resourceName}
                            itemCount={templates.length}
                            selectedItemsCount={
                                allResourcesSelected ? "All" : selectedResources.length
                            }
                            onSelectionChange={handleSelectionChange}
                            headings={[
                                { title: "Title" },
                                // { title: "Rows" },
                                { title: "Created" },
                            ]}
                        >
                            {templates.map((template, index) => (
                                <IndexTable.Row
                                    id={template.id.toString()}
                                    key={template.id}
                                    selected={selectedResources.includes(template.id)}
                                    position={index}
                                >
                                    <IndexTable.Cell>
                                        <Link to={`/admin/templates/${template.id}`}>
                                            <Text variant="bodyMd" fontWeight="medium" as="span">
                                                {template.title}
                                            </Text>
                                        </Link>
                                    </IndexTable.Cell>
                                    {/* <IndexTable.Cell>
                                        {templates.length - 1} rows
                                    </IndexTable.Cell> */}
                                    <IndexTable.Cell>
                                        {new Date(template.createdAt).toLocaleDateString()}
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
                    </Card>
                </Box>)}
        </div>
    );
}
