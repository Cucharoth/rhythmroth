import mongoose, { Schema } from "mongoose";

const songSchema = new Schema(
    {
        _id: { type: Number, required: true },
        name: { type: String, required: true },
        artist: { type: String, required: true },
        src: { type: String, required: true },
        duration: { type: String, required: true },
        coverSrc: { type: String, required: true },
    },
    { timestamps: true }
);

const SongModel = mongoose.models.Song || mongoose.model("Song", songSchema);

export default SongModel;
