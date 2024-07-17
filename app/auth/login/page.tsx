"use client";

import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebaseConfig.js";
import { User } from "@/app/types";
import { useAppDispatch } from "@/app/stores/store";
import { setUser } from "@/app/stores/sessionSlice";

const login = () => {
    const googleProvider = new GoogleAuthProvider();
    const dispatch = useAppDispatch();

    const googleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                console.log(result);
                const userResult = result.user;
                const user: User = {
                    id: userResult.uid,
                    userName: userResult.displayName!,
                    email: userResult.email!,
                };
                dispatch(setUser(user));
            })
            .catch((why) => {
                console.error(why);
            });
    };

    return (
        <div>
            <button onClick={googleLogin}>login</button>
        </div>
    );
};

export default login;
