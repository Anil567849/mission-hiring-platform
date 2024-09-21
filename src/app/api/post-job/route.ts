import connectDB from "@/lib/db/db";
import Job from "@/lib/db/model/jobSchema";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server"

export async function POST(request: NextRequest){
    const {companyName, aboutCompany, companyMission, companyVision, numberOfPeople, companyLocation, jobRole, primaryTag, tags, employmentType, jobDescription, minSalary, maxSalary} = await request.json();

    try {
        await connectDB();

        // validate and save to database 
        const session = await getServerSession();
        const email = session?.user?.email;
        // console.log({email, companyName, aboutCompany, companyMission, companyVision, numberOfPeople, companyLocation, jobRole, primaryTag, tags, employmentType, jobDescription, minSalary, maxSalary});

        const job = new Job({email, companyName, aboutCompany, companyMission, companyVision, numberOfPeople, companyLocation, jobRole, primaryTag, tags, employmentType, jobDescription, minSalary, maxSalary
        })

        await job.save();
        return Response.json({msg: "done"}, {status: 200});
    } catch (error) {
        return Response.json({msg: []}, {status: 501});
    }

}