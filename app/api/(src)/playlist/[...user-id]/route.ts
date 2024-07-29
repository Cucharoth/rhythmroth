import connectDB from "@/app/api/config/db";
import { PlaylistDoc } from "@/app/api/models/playlist";
import { Playlist, Song } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { SongDoc } from "@/app/api/models/song";
import mongoose from "mongoose";
import UserModel from "@/app/api/models/user";

export const GET = async (request: NextRequest) => {
    try {
        await connectDB();
        const userId = request.nextUrl.pathname.split("/").pop()!;

        // validates the user ID
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json("Invalid User ID", { status: 400 });
        }

        // finds and populates the user info
        const user = await UserModel.findOne({ _id: userId }).populate({
            path: "playlists",
            populate: { path: "songs" },
        });

        // maps the response 
        const response: Playlist[] = user.playlists.map(
            (playlistDoc: PlaylistDoc): Playlist => ({
                id: playlistDoc._id,
                name: playlistDoc.name,
                songs: playlistDoc.songs.map((songDoc: SongDoc): Song => ({
                    id: songDoc._id,
                    playlistId: 0,
                    name: songDoc.name,
                    artist: songDoc.artist,
                    src: songDoc.src,
                    duration: songDoc.duration,
                    coverSrc: songDoc.coverSrc,
                })),
            })
        );

        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return new NextResponse(error, { status: 500 });
    }
};
