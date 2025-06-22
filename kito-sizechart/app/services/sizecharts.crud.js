import db from "../db.server";

let sizeCharts = [
  { id: "1", title: "Men's Shirts", content: "Size info here" },
  { id: "2", title: "WoMen's Shirts", content: "Size info here" },
  { id: "3", title: "All Shirts", content: "Size info here" },
];

export async function getCharts() {
  const allCharts = await db.sizeChart.findMany({
    orderBy: { createdAt: "desc" }
  });
  // await db.sizeChart.create({data:{
  //   "title": "AAA",
  //   "content": "AAA",
  // }});
  return allCharts;
}

export async function getChartById(id) {
  return sizeCharts.find(chart => chart.id === id);
}

export async function createChart({ title, content }) {
  // const newChart = { id: String(Date.now()), title, content };
  // sizeCharts.push(newChart);
  
  const newChart = await db.sizeChart.create({
    data: {
      title,
      content
    }
  });

  return newChart;
}

export async function updateChart(id, { title, content }) {
  const chart = await getChartById(id);
  if (chart) {
    chart.title = title;
    chart.content = content;
  }
}