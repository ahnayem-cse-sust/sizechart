import db from "../db.server";

const template_categories = [
  'Mens Fashion',
  'Womens Fashion',
  'Kids Fashion'
];

export async function geTemplateCategoryList() {
  return Response.json(template_categories);
}

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