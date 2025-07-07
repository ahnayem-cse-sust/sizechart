

const template_categories = [
  { label: 'Select an option', value: '', disabled: true },
  { label: 'Mens Fashion', value: 'Mens Fashion' },
  { label: 'Womens Fashion', value: 'Womens Fashion'},
  { label: 'Kids Fashion', value: 'Kids Fashion' }
];

export async function getTemplateCategoryList() {
  return template_categories;
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

export async function save() {
  const response = await db.sizeChart.create({data:{
    "title": title,
    "content": content,
  }});

  return response;
}