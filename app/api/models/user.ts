import mongoose, { Schema } from "mongoose";
import "./playlist";

const userSchema = new Schema(
    {
        id: { type: String, required: true },
        userName: { type: String, required: true },
        email: { type: String, required: true },
        profileImg: { type: String, required: true },
        playlists: { type: [mongoose.Schema.Types.ObjectId], ref: "Playlist", required: true },
    },
    { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
