import PlaylistModel, { PlaylistDoc } from "@/app/api/models/playlist";
import { SongDoc } from "@/app/api/models/song";
import UserModel from "@/app/api/models/user";
import { Song } from "@/app/types";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
    try {
        const requestJson = await request.json();
        const userId = requestJson.userId;
        const playlistId: string = requestJson.playlistId;
        const songRequest: Song = requestJson.songRequest;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json("Invalid User ID", { status: 400 });
        }
        if (!mongoose.Types.ObjectId.isValid(playlistId)) {
            return NextResponse.json("Invalid Playlist ID", { status: 400 });
        }

        // gets the playlist
        const playlistDoc = await PlaylistModel.findOne({
            _id: playlistId,
        }).populate("songs");

        // finds the element to remove
        const songIndex = playlistDoc.songs.findIndex(
            (song: SongDoc) => song._id == songRequest.id
        );
        if (songIndex == -1) {
            return NextResponse.json("This Song is not in the Playlist", {
                status: 400,
            });
        }

        // removes the song
        const songDocDeleted: SongDoc = playlistDoc.songs.splice(
            songIndex,
            1
        )[0];

        // if the playlist has no songs left, removes the playlist
        if (playlistDoc.songs.length == 0) {
            const _newDoc = await UserModel.findByIdAndUpdate(
                { _id: userId },
                {
                    $pull: { playlists: playlistDoc._id },
                },
                { new: true }
            );
        } else {
            // updates the playlist
            playlistDoc.save();
        }

        const songDeleted: Song = {
            id: songDocDeleted._id,
            playlistId: 0,
            name: songDocDeleted.name,
            artist: songDocDeleted.artist,
            src: songDocDeleted.src,
            duration: songDocDeleted.duration,
            coverSrc: songDocDeleted.coverSrc,
        };

        return NextResponse.json(songDeleted, { status: 200 });
    } catch (error: any) {
        console.error(error.stack);
        return NextResponse.json(error, { status: 500 });
    }
};
