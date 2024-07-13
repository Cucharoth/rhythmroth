import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <div className="logo">
                    <h1>logo</h1>
                </div>
                <div className="link-container">
                    <Link href="/">Home</Link>
                    <Link href="/about">about</Link>
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
