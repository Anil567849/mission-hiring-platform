import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
    email: string;
    about: string;
    join: Date;
}


const UserSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    join: {
        type: Date,
        default: Date.now,
    }
});

// Check if the model already exists before creating it
const UserProfile: Model<IUser> = mongoose.models.UserProfile || mongoose.model<IUser>('UserProfile', UserSchema);

export default UserProfile;