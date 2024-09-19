import { getServerSession } from "next-auth";
import { NextRequest } from "next/server"


export async function POST(request: NextRequest){
    const {tags, company, location, role, salary} = await request.json();

    // validate and save to database 
    const session = await getServerSession();
    const email = session?.user?.email;
    console.log(email, tags, company, location, role, salary);
    
    return Response.json({msg: "done"});
}