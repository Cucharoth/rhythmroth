"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    Divider,
    Image,
} from "@nextui-org/react";
import { Song } from "../types";
import { useAppDispatch } from "../stores/store";
import { addSong } from "../stores/playlistSlice";
import { useRouter } from "next/navigation";
import randomGen from "@/utils/RandomGen";

const home = () => {
    const router = useRouter();
    const [songs, setSongs] = useState<Song[]>([]);
    const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);

    // fetches songs for display
    useEffect(() => {
        fetch("/api/song/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setSongs(data);
            })
            .catch((error) => console.error(error));
    }, []);

    // selects random songs for display
    useEffect(() => {
        if (songs.length > 0) {
            const randomIndexes = randomGen(10, 1, songs.length - 1);
            const randomSongs = randomIndexes.map((index) => songs[index]);
            setSelectedSongs(randomSongs);
        }
    }, [songs]);

    const handleSongClick = (song: Song) => {
        router.push(`/song/${song.id}`);
    };

    return (
        <div className="container mx-auto h-full ">
            <div className="grid gap-4 grid-cols-10 px-10">
                {selectedSongs.length > 0 &&
                    selectedSongs.map((song) => (
                        <Card
                            className="col-span-10 sm:col-span-2"
                            key={song.id}
                            isFooterBlurred
                        >
                            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                <p>{song.name}</p>
                            </CardHeader>
                            <Image
                                removeWrapper
                                className="z-0 w-full h-full object-cover"
                                src={song.coverSrc}
                                alt="Card background"
                            ></Image>
                            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                                <p>{song.artist}</p>
                            </CardFooter>
                        </Card>
                    ))}
            </div>
            <Divider className="my-4 bg-primary-foreground" />
            <div className="flex grow min-h-[30%] basis-2/5">
                <div className="flex basis-2/5">
                    <h2>RECIENTES</h2>
                </div>
                <div className="flex grow basis-3/5 px-5 border-l">
                    <h2>PLAYLIST</h2>
                </div>
            </div>
        </div>
    );
};

export default home;
