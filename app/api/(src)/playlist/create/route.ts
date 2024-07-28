import connectDB from "@/app/api/config/db";
import PlaylistModel, { PlaylistDoc } from "@/app/api/models/playlist";
import { SongDoc } from "@/app/api/models/song";
import UserModel from "@/app/api/models/user";
import { Playlist, Song } from "@/app/types";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

export const POST = async (request: NextRequest) => {
    try {
        await connectDB();
        const requestJson = await request.json();
        const userId = requestJson.userId;
        const playlistRequest = requestJson.playlistRequest;

        // validates the user ID
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json("Invalid User ID", { status: 400 });
        }

        // finds the user
        const userDoc = await UserModel.findOne({ _id: userId }).populate(
            "playlists"
        );

        // guard, user cannot have more than one playlist with the same name
        const existingPlaylist = userDoc.playlists.find(
            (playlist: PlaylistDoc) => playlist.name == playlistRequest.name
        );
        if (existingPlaylist) {
            return NextResponse.json(
                "The user already has a playlist with that name",
                { status: 400 }
            );
        }
        if (playlistRequest.songs.length == 0) {
            return NextResponse.json("The playlist is empty", { status: 400 });
        }

        // creates an array of Songs IDs to relation playlist with
        const songIds: number[] = playlistRequest.songs?.map(
            (song: Song) => song.id
        );

        // creates a new playlist and saves it in DB
        const newPlaylist = await PlaylistModel.create({
            name: playlistRequest.name,
            songs: songIds,
        });

        // adds the recently created playlist to the user
        userDoc.playlists.push(newPlaylist._id);
        userDoc.save();

        // populates and maps the response
        await newPlaylist.populate("songs");
        const response: Playlist = {
            id: newPlaylist._id,
            name: newPlaylist.name,
            songs: newPlaylist.songs.map((songDoc: SongDoc) => ({
                id: songDoc._id,
                playlistId: 0,
                name: songDoc.name,
                artist: songDoc.artist,
                src: songDoc.src,
                duration: songDoc.duration,
                coverSrc: songDoc.coverSrc,
            })),
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(error.message, { status: 500 });
    }
};
