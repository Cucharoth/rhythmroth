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
import { useAppDispatch, useAppSelector } from "../stores/store";
import { addSong } from "../stores/playlistSlice";
import { useRouter } from "next/navigation";
import randomGen from "@/utils/RandomGen";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import Loading from "@/components/Loading";
import NextImage from "next/image";
import { setFetchedSongs } from "../stores/sessionSlice";
import RecentlyPlayedTable from "@/components/RecentlyPlayedTable";

const home = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [recentlyPlayed, _setRecentlyPlayed] = useState<Song[]>(
        useAppSelector((state) => state.session.recentlyPlayed)
    );
    const [songs, setSongs] = useState<Song[]>([]);
    const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
                dispatch(setFetchedSongs(data));
            })
            .catch((error) => console.error(error));
    }, []);

    // selects random songs for display
    useEffect(() => {
        if (songs.length > 0) {
            const randomIndexes = randomGen(10, 1, songs.length - 1);
            const randomSongs = randomIndexes.map((index) => songs[index]);
            setSelectedSongs(randomSongs);
            setTimeout(() => setIsLoading(false), 500);
        }
    }, [songs]);

    const handleCardPress = (song: Song) => {
        router.push(`/home/song/${song.id}`);
    };
    
    return (
        <div className="container mx-auto h-full transition-full">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="grid gap-4 min-h-[496px] grid-cols-10 px-10">
                        {selectedSongs.length > 0 &&
                            selectedSongs.map((song: Song) => (
                                <Card
                                    className="col-span-10 sm:col-span-2 max-w-full min-w-full max-h-full min-h-full"
                                    key={song.id}
                                    isFooterBlurred
                                    isPressable
                                    onPress={() => handleCardPress(song)}
                                >
                                    <Image
                                        removeWrapper
                                        className="z-0 w-full h-full object-cover max-w-full min-w-full max-h-full min-h-full"
                                        src={song.coverSrc}
                                        alt="Card background"
                                        width={241}
                                        height={243}
                                        isZoomed
                                    ></Image>
                                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 overflow-hidden">
                                        <div className="text-start overflow-hidden">
                                            <p className="text-xs md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
                                                {song.name}
                                            </p>
                                            <p className="text-xs text-foreground/80">
                                                {song.artist}
                                            </p>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                    </div>
                    <div className="flex justify-center">
                        <Divider className="my-4 max-w-[50%] bg-primary-foreground" />
                    </div>
                    <div className="flex grow min-h-[30%] basis-2/5 px-10">
                        <div className="flex basis-2/5">
                            <h2>PLAYLIST</h2>
                        </div>
                        <div className="flex flex-col grow basis-3/5 px-5 border-l">
                            <h2>RECIENTES</h2>
                            <div className="flex grow justify-center w-full h-full">
                                {recentlyPlayed[0] ? (
                                    <RecentlyPlayedTable />
                                ) : (
                                    <div className="flex justify-center items-center h-full w-full">
                                        <p className="text-center">
                                            listen to some music~
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default home;
