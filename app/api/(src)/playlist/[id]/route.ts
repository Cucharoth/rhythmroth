import connectDB from "@/app/api/config/db";
import PlaylistModel from "@/app/api/models/playlist";
import { Song } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import SongModel from "@/app/api/models/song";
import mongoose from "mongoose";

export const GET = async (request: NextRequest) => {
    try {
        await connectDB();
        const playlistId = request.nextUrl.pathname.split("/").pop()!;
        
        // validates the playlist ID
        if (!mongoose.Types.ObjectId.isValid(playlistId)) {
            return NextResponse.json("Invalid playlist ID", { status: 400 });
        }
        
        //TODO: do response.
        const songDoc = await PlaylistModel.findById(playlistId).populate("songs").exec();
        console.log(songDoc)
        return NextResponse.json("soon*", { status: 500 });
    } catch (error: any) {
        console.error(error);
        return new NextResponse(error, { status: 500 });
    }
};