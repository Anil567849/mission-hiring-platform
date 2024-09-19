import { NextRequest } from "next/server"
import { jobListings } from "@/app/(home)/data/dummy";

export async function POST(request: NextRequest){
    const {range} = await request.json();

    // validate and save to database 
    console.log(range[0], range[1]);
    const jobs = jobListings.slice(range[0], range[1])
    
    return Response.json({jobs});
}