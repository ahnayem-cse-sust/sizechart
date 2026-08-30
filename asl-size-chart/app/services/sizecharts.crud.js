import db from "../db.server";

export async function getCharts() {
  const allCharts = await db.chart.findMany({
    orderBy: { createdAt: "desc" }
  });

  return allCharts;
}
