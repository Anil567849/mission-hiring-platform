import { NextRequest } from "next/server"
import connectDB from "@/lib/db/db";
import UserProfile from "@/lib/db/model/userProfileSchema";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest){
    const {about } = await request.json();

    try {
        const session = await getServerSession();

        await connectDB();
        
        const res = new UserProfile({
            email: session?.user?.email,
            about
        })
        
        await res.save();
        return Response.json({data: "saved"}, {status: 200});
    } catch (error) {
        return Response.json({data: "not saved"}, {status: 501});
    }


}

export async function GET(){
    try {
        const session = await getServerSession();

        await connectDB();
        
        const res = await UserProfile.findOne({email: session?.user?.email})
        
        return Response.json({data: res}, {status: 200});
    } catch (error) {
        return Response.json({data: "somthing went wrong"}, {status: 501});
    }


}