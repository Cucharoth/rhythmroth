import connectDB from "@/app/api/config/db";
import SongModel from "@/app/api/models/song";
import { Song } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

export const GET = async (request: NextRequest) => {
    try {
        await connectDB();
        const songId = request.nextUrl.pathname.split("/").pop();
        const songDoc = await SongModel.findById(songId).exec();
        const response: Song = {
            id: songDoc._id,
            name: songDoc.name,
            artist: songDoc.artist,
            src: songDoc.src,
            duration: songDoc.duration,
            coverSrc: songDoc.coverSrc,
            playlistId: 0,
        };
        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return new NextResponse(error, { status: 500 });
    }
};
