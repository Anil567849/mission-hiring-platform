import mongoose, { Schema, Document, Model, mongo } from 'mongoose';

interface IJob extends Document {
    email: string;
    companyName: string;
    aboutCompany: string;
    companyMission: string;
    companyVision: string;
    numberOfPeople: string;
    companyLocation: string;
    jobRole: string;
    primaryTag: string;
    tags: string[];
    employmentType: string;
    jobDescription: string;
    minSalary: string;
    maxSalary: string;
    jobSeekerEmail: string[];
    join: Date;
}


const JobSchema: Schema<IJob> = new Schema({
    email: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    aboutCompany: {
        type: String,
        required: true,
    },
    companyMission: {
        type: String,
        required: true,
    },
    companyVision: {
        type: String,
        required: true,
    },
    numberOfPeople: {
        type: String,
        required: true,
    },
    companyLocation: {
        type: String,
        required: true,
    },
    jobRole: {
        type: String,
        required: true,
    },
    primaryTag: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: String,
            required: true,
        }
    ],
    employmentType: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    minSalary: {
        type: String,
        required: true,
    },
    maxSalary: {
        type: String,
        required: true,
    },
    jobSeekerEmail: [
        {
            type: String,
        }
    ],
    join: {
        type: Date,
        default: Date.now,
    }
});

delete mongoose.models.Job;
// Check if the model already exists before creating it
const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);

export default Job;