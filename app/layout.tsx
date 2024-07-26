import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import AudioPlayer from "@/components/AudioPlayer";
import Playlist from "@/components/Playlist";
import TabsSidebar from "@/components/TabsSidebar";

const ReduxProvider = dynamic(() => import("@/app/stores/redux-provider"), {
    ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Rhythmroth",
    description: "Listen to be best music~",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`purple-theme ${inter.className}`}>
                <ReduxProvider>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="bg-gradient-to-tr from-accent-300 to-background-900 to-90% text-white flex justify-between flex-grow max-h-[full-300px]">
                            <TabsSidebar />
                            <div className="w-full p-4">{children}</div>

                            <Playlist />
                        </main>
                        <AudioPlayer />
                    </div>
                </ReduxProvider>
            </body>
        </html>
    );
}
