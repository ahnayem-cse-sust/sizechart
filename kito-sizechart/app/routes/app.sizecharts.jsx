import { useLoaderData, useNavigate } from '@remix-run/react';
import { getProducts } from "../services/sizecharts.server";
import {
  IndexTable,
  Card,
  Text,
  Page,
  useIndexResourceState,
  Pagination
} from '@shopify/polaris';

export async function loader( { request} ) {
  
  return await getProducts( { request} );
}



export default function SizeChartsAdmin() {
  
  const { products, hasNextPage, endCursor, hasPreviousPage, startCursor } = useLoaderData();
  const navigate = useNavigate();

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(products);

  const rowMarkup = products.map(
    (
      {id, title, onlineStorePreviewUrl},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {id}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>{onlineStorePreviewUrl}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

   return (
    <Page fullWidth title="Sales by product">
      <Card>
        <IndexTable
        itemCount={products.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Product ID'},
          {title: 'Product Title'},
          {title: 'Preview Url'},
        ]}
      >
        {rowMarkup}
      </IndexTable>

      <div
        style={{
          maxWidth: '700px',
          margin: 'auto',
          border: '1px solid var(--p-color-border)'
        }}
      >
        <Pagination
          onPrevious={() => {
            navigate(`?before=${startCursor}`);
          }}
          onNext={() => {
            navigate(`?after=${endCursor}`);
          }}
          type="table"
          hasNext={hasNextPage}
          hasPrevious={hasPreviousPage}
          label="1-50 of 8,450 orders"
        />
      </div>

      </Card>
    </Page>

  // return (
  //   <div className="p-6">
  //     <h1 className="text-2xl font-semibold mb-4">Product List</h1>

  //     <ul className="space-y-2">
  //       {products.map(product => (
  //         <li key={product.id} className="p-3 bg-white shadow rounded">
  //           {product.title}
  //         </li>
  //       ))}
  //     </ul>

  //     {hasNextPage && (
  //       <div className="mt-6">
  //         <Link
  //           to={`?after=${endCursor}`}
  //           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  //         >
  //           Next Page
  //         </Link>
  //       </div>
  //     )}
      
  //     {hasPreviousPage && (
  //       <div className="mt-6">
  //         <Link
  //           to={`?before=${startCursor}`}
  //           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  //         >
  //           Previous Page
  //         </Link>
  //       </div>
  //     )}
  //   </div>
  );
}
