import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../config/db";
import UserModel from "../../../models/user";
import { User } from "@/app/types";
import { PlaylistDoc } from "@/app/api/models/playlist";
import { SongDoc } from "@/app/api/models/song";

export const POST = async (request: NextRequest) => {
    try {
        const newUser: User = await request.json();
        await connectDB();
        const userEmail = newUser.email;
        const existingUser = await UserModel.findOne({
            email: userEmail,
        });

        // guard
        if (existingUser) {
            // maps and populates the user
            await existingUser.populate({
                path: "playlists",
                populate: { path: "songs" },
            });
            const responseUser: User = {
                id: existingUser._id,
                userName: existingUser.userName,
                email: existingUser.email,
                profileImg: existingUser.profileImg,
                playlists: existingUser.playlists.map(
                    (playlistDoc: PlaylistDoc) => ({
                        id: playlistDoc._id,
                        name: playlistDoc.name,
                        song: playlistDoc.songs.map((songDoc: SongDoc) => ({
                            id: songDoc._id,
                            playlistId: 0,
                            name: songDoc.name,
                            artist: songDoc.artist,
                            src: songDoc.src,
                            duration: songDoc.duration,
                            coverSrc: songDoc.coverSrc,
                        })),
                    })
                ),
            };
            return NextResponse.json(responseUser, { status: 200 });
        }

        const newUserModel = new UserModel({
            id: newUser.id,
            userName: newUser.userName,
            email: newUser.email,
            profileImg: newUser.profileImg,
            playlists: [],
        });

        const savedUser = await newUserModel.save();
        const responseUser: User = {
            id: savedUser._id,
            userName: savedUser.userName,
            email: savedUser.email,
            profileImg: savedUser.profileImg,
            playlists: savedUser.playlists,
        };
        return NextResponse.json(responseUser, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return new NextResponse(error, { status: 500 });
    }
};
