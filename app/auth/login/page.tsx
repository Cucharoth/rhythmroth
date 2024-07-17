"use client";

import React from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    UserCredential,
} from "firebase/auth";
import { auth } from "@/firebaseConfig.js";
import { User } from "@/app/types";
import { useAppDispatch } from "@/app/stores/store";
import { setUser } from "@/app/stores/sessionSlice";
import { useRouter } from "next/navigation";

const login = () => {
    const googleProvider = new GoogleAuthProvider();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const googleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result: UserCredential) => {
                console.log(result);
                handleLogin(result);
            })
            .catch((why) => {
                console.error(why);
            });
    };

    const handleLogin = async (result: UserCredential) => {
        try {
            const user: User = {
                id: result.user.uid,
                userName: result.user.displayName,
                email: result.user.email,
                profileImg: result.user.photoURL,
            };
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (response.status == 201 || response.status == 200) {
                const user: User = await response.json();
                dispatch(setUser(user));
                router.push("/");
            }
        } catch (error: any) {
            console.error("error: ", error.message);
        }
    };

    return (
        <div>
            <button onClick={googleLogin}>login</button>
        </div>
    );
};

export default login;
