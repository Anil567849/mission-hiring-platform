import connectDB from "@/lib/db/db";
import Job from "@/lib/db/model/jobSchema";
import { NextRequest } from "next/server"
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    // secure: true,
    auth: {
        user: process.env.BREVO_USER as string,
        pass: process.env.BREVO_PASS as string,
    }
});


export async function POST(request: NextRequest){
    const formData = await request.formData();   
    // return Response.json({data: 'test'}, {status: 200});
    try {
        await connectDB();

        const jobId = formData.get("jobId") as string;
        const userEmail = formData.get("userEmail") as string;
        const companyEmail = formData.get("companyEmail") as string;
        const desc = formData.get("desc") as string;
        const resume = formData.get("resume") as File;

        const info = await sendEmail(userEmail, companyEmail, desc, resume);

        if(info){
            const job = await Job.updateOne(
                { _id: jobId },
                { $push: { jobSeekerEmail: userEmail } }
            );

            if (job.modifiedCount > 0) {
                return Response.json({data: 'Successfully Submitted'}, {status: 200});
            } else {
                return Response.json({error: 'Failed to update job'}, {status: 400});
            }
        }else{
            return Response.json({data: 'Not Submitted! Email not Sent'}, {status: 500});
        }
    } catch (error) {
        console.log(error);
        return Response.json({data: 'Not Submitted'}, {status: 500});
    }

}

async function sendEmail(userEmail: string, companyEmail: string, desc: string, resume: File){

    const resumeArrayBuffer = await resume.arrayBuffer();
    const resumeBuffer = Buffer.from(resumeArrayBuffer);

    // Define email options
    const mailOptions = {
        from: process.env.BREVO_USER as string, // Sender address
        to: companyEmail, // Recipient address
        subject: 'Job Request From Vision-Mission Hiring Pvt. Ltd.', // Subject line
        text: desc, // Plain text body
        html: `<p>${desc}</p>`, // HTML body
        attachments: [
            {
                filename: 'resume.pdf',
                content: resumeBuffer, // You can pass a Buffer or a base64 string here
                contentType: 'application/pdf',
            },
        ],
    };
    
    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.log(error);
        return null;        
    }

}