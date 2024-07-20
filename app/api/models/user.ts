import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        id: { type: String, required: true },
        userName: { type: String, required: true },
        email: { type: String, required: true },
        profileImg: { type: String, required: true },
    },
    { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;