import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/api/config/db";
import SongModel from "../../../models/song";
import { Song } from "@/app/types";

export const GET = async (request: NextRequest) => {
    try {
        await connectDB();
        // TODO: randomize fetch
        const songsDocs = await SongModel.find().limit(100).exec();
        const songs: Song[] = songsDocs.map((song) => ({
            id: song._id,
            playlistId: 0,
            name: song.name,
            artist: song.artist,
            src: song.src,
            duration: song.duration,
            coverSrc: song.coverSrc,
        }));

        return NextResponse.json(songs, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return new NextResponse(error, { status: 500 });
    }
};
