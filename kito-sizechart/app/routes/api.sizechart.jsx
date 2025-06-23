import db from "../db.server";

export async function loader ({ request }){
    const url = new URL(request.url);
    const chartId = url.searchParams.get("chartId");

    if (!chartId){
        return Response.json({
            status: 400,
            success: false,
            message: "Missing chartId",
            data:{
                content:"",
            },
        });
    }

    const chart = await db.sizeChart.findFirst({
        where:{id:Number(chartId)},
    });

    if(!chart){
        return Response.json({
            status: 404,
            success: false,
            message: "No sizechart found with this id.",
            data:{
                content:"",
            },
        });
    }

    return Response.json({
            status: 200,
            success: true,
            message: "",
            data:{
                content:chart.content
            }
    });

}