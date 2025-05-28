let sizeCharts = [
  { id: "1", title: "Men's Shirts", body: "S: 36-38\nM: 39-41\nL: 42-44" },
];

export async function getCharts() {
  return sizeCharts;
}

export async function createChart({ title, body }) {
  sizeCharts.push({ id: String(Date.now()), title, body });
}