import { NextRequest } from "next/server"
import connectDB from "@/lib/db/db";
import Job from "@/lib/db/model/jobSchema";

export async function POST(request: NextRequest){
    const {search} = await request.json();
    
    try {
        await connectDB();
        
        if(search != ""){            
            const jobs = await Job.find({
                $or: [
                  { primaryTag: search },
                  { tags: search }
                ]
              })
              return Response.json({jobs}, {status: 200});
        }else{
            const jobs = await Job.find();
            return Response.json({jobs}, {status: 200});
        }
        

    } catch (error) {
        return Response.json({jobs: []}, {status: 501});
    }


}