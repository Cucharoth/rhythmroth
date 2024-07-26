"use client";

import React, { useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@nextui-org/react";

const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const googleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result: UserCredential) => {
                setIsLoading(true);
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
                console.log(response.status)
                const newUser: User = await response.json();
                setIsLoading(false);
                dispatch(setUser(newUser));
                router.push("/home");
            } else {
                console.error("error: ", response.statusText);
            }
        } catch (error: any) {
            console.error("error: ", error.message);
        }
    };

    return (
        <div>
            <Button isLoading={isLoading} className="bg-white bg-gradient-to-tr from-bg-accent-300 via-primary-300 to-primary-200 text-background-950 rounded-full shadow-md"  onPress={googleLogin}>
                <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faGoogle} />
                    <p className="ml-2">Login</p>
                </div>
            </Button>
        </div>
    );
};

export default googleLogin;
