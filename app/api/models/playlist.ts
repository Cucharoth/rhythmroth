import mongoose, { Schema } from "mongoose";
import "./song";
import { SongDoc } from "./song";

export interface PlaylistDoc {
    _id: string;
    name: string;
    songs: SongDoc[];
}

const schema = new Schema(
    {
        name: { type: String, required: true },
        songs: [{ type: mongoose.Schema.Types.Number, ref: "Song" }],
    },
    { timestamps: true }
);

const PlaylistModel =
    mongoose.models.Playlist || mongoose.model("Playlist", schema);

export default PlaylistModel;
