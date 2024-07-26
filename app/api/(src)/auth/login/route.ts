import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../config/db";
import UserModel from "../../../models/user";
import { User } from "@/app/types";

export const POST = async (request: NextRequest) => {
    const newUser: User = await request.json();
    await connectDB();
    const userEmail = newUser.email;
    const existingUser: User | null = await UserModel.findOne({
        email: userEmail,
    });

    //guard
    console.log(existingUser)
    if (existingUser) {
        const responseUser: User = {
            id: existingUser.id,
            userName: existingUser.userName,
            email: existingUser.email,
            profileImg: existingUser.profileImg,
        };
        return NextResponse.json(responseUser, { status: 200 });
    }

    const newUserModel = new UserModel({
        id: newUser.id,
        userName: newUser.userName,
        email: newUser.email,
        profileImg: newUser.profileImg,
    });

    try {
        const savedUser = await newUserModel.save();
        const responseUser: User = {
            id: savedUser.id,
            userName: savedUser.userName,
            email: savedUser.email,
            profileImg: savedUser.profileImg,
        };
        return NextResponse.json(responseUser, { status: 201 });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
};
