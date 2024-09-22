import connectDB from "@/lib/db/db";
import Job from "@/lib/db/model/jobSchema";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server"

export async function POST(request: NextRequest){
    const {id} = await request.json();

    try {
        await connectDB();

        const job = await Job.findOne({_id: id})

        return Response.json({startup: job}, {status: 200});
    } catch (error) {
        return Response.json({msg: []}, {status: 501});
    }

}