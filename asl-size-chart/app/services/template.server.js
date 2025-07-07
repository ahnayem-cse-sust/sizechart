import db from '../db.server';

const template_categories = [
  { label: 'Select an option', value: '', disabled: true },
  { label: 'Mens Fashion', value: 'Mens Fashion' },
  { label: 'Womens Fashion', value: 'Womens Fashion' },
  { label: 'Kids Fashion', value: 'Kids Fashion' }
];

export async function getTemplateCategoryList() {
  return template_categories;
}

export async function getList() {
  return [];
}

export async function saveTemplate({ title, category }) {
  const response = await db.template.create({
    data: {
      "title": title,
      "category": category,
    }
  });
  return response;
}