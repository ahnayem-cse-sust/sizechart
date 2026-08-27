import db from "../db.server";

export async function getCharts() {
  const allCharts = await db.chart.findMany({
    orderBy: { createdAt: "desc" }
  });

  return allCharts;
}

export async function getChartById(id) {

  return await db.sizeChart.findUnique({
    where: {
      id:Number(id)
    }
  });
}

export async function createChart({ title, content }) {
  
  const response = await db.sizeChart.create({data:{
    "title": title,
    "content": content,
  }});

  return response;
}

export async function updateChart(id, { title, content }) {
  const updateChart = await db.sizeChart.update({
    where: {
      id: Number(id),
    },
    data: {
      title: title,
      content: content
    },
  });
  return updateChart;
}