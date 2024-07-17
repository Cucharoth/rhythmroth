"use client";

import { useAppSelector } from "@/app/stores/store";
import Link from "next/link";
import React from "react";

const Navbar = () => {
    const user = useAppSelector((state) => state.session.user);

    return (
        <nav>
            <ul>
                <div className="logo">
                    {user != null && <h1>{user.userName}</h1>}
                </div>
                <div className="link-container">
                    <div></div>
                    <Link href="/">Home </Link>
                    <Link href="/auth/login">login </Link>
                    <Link href="/about">about </Link>
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
