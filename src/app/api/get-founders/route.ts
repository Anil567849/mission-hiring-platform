import { NextRequest } from "next/server"
import connectDB from "@/lib/db/db";
import UserProfile from "@/lib/db/model/userProfileSchema";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest){
    const { email } = await request.json();

    try {

        await connectDB();
        
        const res = await UserProfile.findOne({email})
        
        return Response.json({data: res}, {status: 200});
    } catch (error) {
        return Response.json({data: "somthing went wrong"}, {status: 501});
    }


}

