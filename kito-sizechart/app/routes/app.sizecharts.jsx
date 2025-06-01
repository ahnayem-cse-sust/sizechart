import { useLoaderData, Link } from '@remix-run/react';
import { getProducts } from "../services/sizecharts.server";


export async function loader( { request} ) {
  
  return await getProducts( { request} );
}



export default function SizeChartsAdmin() {
  
  const { products, hasNextPage, endCursor, hasPreviousPage, startCursor } = useLoaderData();


  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Product List</h1>

      <ul className="space-y-2">
        {products.map(product => (
          <li key={product.id} className="p-3 bg-white shadow rounded">
            {product.title}
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <div className="mt-6">
          <Link
            to={`?after=${endCursor}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Load More
          </Link>
        </div>
      )}
      
      {hasPreviousPage && (
        <div className="mt-6">
          <Link
            to={`?before=${startCursor}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Previous Page
          </Link>
        </div>
      )}
    </div>
  );
}
