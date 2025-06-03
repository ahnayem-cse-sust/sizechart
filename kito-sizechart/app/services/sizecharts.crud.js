import { authenticate } from "../shopify.server";

let sizeCharts = [
  { id: "1", title: "Men's Shirts", content: "Size info here" },
];

export async function getCharts() {
  return sizeCharts;
}

export async function getChartById(id) {
  return sizeCharts.find(chart => chart.id === id);
}

export async function createChart({ title, content }) {
  const newChart = { id: String(Date.now()), title, content };
  sizeCharts.push(newChart);
  return newChart;
}

export async function updateChart(id, { title, content }) {
  const chart = await getChartById(id);
  if (chart) {
    chart.title = title;
    chart.content = content;
  }
}