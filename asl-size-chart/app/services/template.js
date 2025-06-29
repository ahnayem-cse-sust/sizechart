import db from "../db.server";

export async function getList() {
  const allTemplates = [
        {
        id: '8332217385131',
        title: 'The Inventory Not Tracked Snowboard',
        content: 'https://asl-dev-store.myshopify.com/products/the-inventory-not-tracked-snowboard',
        metafield: { value: '1' }
        },
    ]

  return allTemplates;
}