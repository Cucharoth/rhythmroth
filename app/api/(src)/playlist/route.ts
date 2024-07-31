import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import PlaylistModel, { PlaylistDoc } from "../../models/playlist";
import { Playlist, Song } from "@/app/types";
import SongModel, { SongDoc } from "../../models/song";

export const PATCH = async (request: NextRequest) => {
    try {
        const requestJson = await request.json();
        const playlistId: string = requestJson.playlistId;
        const songRequest: Song = requestJson.songRequest;

        if (!mongoose.Types.ObjectId.isValid(playlistId)) {
            return NextResponse.json("Invalid Playlist ID", { status: 400 });
        }
        const songDoc: SongDoc | null = await SongModel.findById(
            songRequest.id
        );
        if (!songDoc) {
            return NextResponse.json("Invalid Song ID", { status: 400 });
        }

        const playlistDoc = await PlaylistModel.findOne({ _id: playlistId });
        playlistDoc?.songs.push(songRequest.id);
        playlistDoc.save();

        const songAdded: Song = {
            id: songDoc._id,
            playlistId: 0,
            name: songDoc.name,
            artist: songDoc.artist,
            duration: songDoc.duration,
            src: songDoc.src,
            coverSrc: songDoc.coverSrc,
        };

        return NextResponse.json(songAdded, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
    }
};

export const DELETE = async (request: NextRequest) => {
    try {
        const requestJson = await request.json();
        const userId = requestJson.userId;
        const playlistId: string = requestJson.playlistRequestId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json("Invalid User ID", { status: 400 });
        }
        if (!mongoose.Types.ObjectId.isValid(playlistId)) {
            return NextResponse.json("Invalid Playlist ID", { status: 400 });
        }

        const deletedPlaylistDoc: PlaylistDoc | null =
            await PlaylistModel.findByIdAndDelete(playlistId);

        if (!deletedPlaylistDoc) {
            return NextResponse.json("Invalid Playlist ID", { status: 400 });
        }
        const deletedPlaylist: Playlist = {
            id: deletedPlaylistDoc._id,
            name: deletedPlaylistDoc.name,
            songs: [],
        };
        return NextResponse.json(deletedPlaylist, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
    }
};
