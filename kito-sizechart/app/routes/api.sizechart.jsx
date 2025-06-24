import db from "../db.server";
import { cors } from "remix-utils/cors";


export async function loader ({ request }){
    const url = new URL(request.url);
    const chartId = url.searchParams.get("chartId");

    let returnResponse;

    if (!chartId){
        returnResponse = Response.json({
            status: 400,
            success: false,
            message: "Missing chartId",
            data:{
                content:"",
            },
        });
    }
    else{
        const chart = await db.sizeChart.findFirst({
            where:{id:Number(chartId)},
        });

        if(!chart){
            returnResponse = Response.json({
                status: 404,
                success: false,
                message: "No sizechart found with this id.",
                data:{
                    content:"",
                },
            });
        } else{
            returnResponse = Response.json({
                    status: 200,
                    success: true,
                    message: "",
                    data:{
                        content:chart.content
                    }
            });
        } 
    }

    return cors(request,returnResponse);

}