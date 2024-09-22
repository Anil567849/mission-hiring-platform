import { NextRequest } from "next/server"
import { jobListings } from "@/app/(home)/data/dummy";
import connectDB from "@/lib/db/db";
import Job from "@/lib/db/model/jobSchema";

export async function POST(request: NextRequest){
    const {range} = await request.json();

    try {
        await connectDB();
        
        // console.log(range[0], range[1]);
        // const jobs = jobListings.slice(range[0], range[1]) // dummy

        const totalCount = await Job.countDocuments();
        // console.log(totalCount, range[0]);
        
        if(range[0] > totalCount){
            return Response.json({jobs: []}, {status: 200});
        }
        const jobs = await Job.find().skip(range[0]).limit(range[1] - range[0]);
        return Response.json({jobs}, {status: 200});
    } catch (error) {
        return Response.json({jobs: []}, {status: 501});
    }


}