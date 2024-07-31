"use client";

import React, { useEffect, useState } from "react";
import {
    Card,
    CardFooter,
    Divider,
    Image,
    Tooltip,
} from "@nextui-org/react";
import { Song } from "../types";
import { useAppDispatch, useAppSelector } from "../stores/store";
import { useRouter } from "next/navigation";
import randomGen from "@/utils/RandomGen";
import Loading from "@/components/Loading";
import { setFetchedSongs } from "../stores/sessionSlice";
import RecentlyPlayedTable from "@/components/SongsTable";
import PlaylistTable from "@/components/PlaylistTable";

const home = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const recentlyPlayed = useAppSelector(
        (state) => state.session.recentlyPlayed
    );
    const userPlaylists = useAppSelector(
        (state) => state.session.user?.playlists
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
            setTimeout(() => setIsLoading(false), 300);
        }
    }, [songs]);

    const handleCardPress = (song: Song) => {
        router.push(`/home/song/${song.id}`);
    };

    return (
        <div className="container mx-auto h-full transition-full overflow-auto 2xl:overflow-hidden">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="grid gap-4 min-h-[496px] grid-cols-10 px-10">
                        {selectedSongs.length > 0 &&
                            selectedSongs.map((song: Song) => (
                                <Card
                                    className="col-span-10 xl:col-span-2 md:col-span-5 max-w-full min-w-full max-h-full min-h-full"
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
                                            <Tooltip
                                                content={song.name}
                                                className="text-white"
                                            >
                                                <p className="text-xs md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
                                                    {song.name}
                                                </p>
                                            </Tooltip>
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
                    <div className="grid grid-cols-10 max-h-[30%] basis-2/5 px-10 overflow-auto">
                        <div className="flex col-span-10 xl:col-span-4 h-auto basis-2/5 flex-col px-0 xl:pr-5">
                            <h2>PLAYLISTS</h2>
                            <div className="flex justify-center w-full h-full overflow-auto">
                                {userPlaylists?.length != 0 ? (
                                    <PlaylistTable playlists={userPlaylists!} />
                                ) : (
                                    <div className="flex justify-center items-center h-full w-full">
                                        <p className="text-center">
                                            make some playlist~
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="md:hidden grow justify-center">
                            <Divider className="md:hidden my-4 md:max-w-0 bg-primary-foreground" />
                        </div>
                        <div className="flex col-span-10 xl:col-span-6 px-0 max-h-[100%] flex-col basis-3/5 xl:pl-5 xl:border-l ">
                            <h2>RECIENTES</h2>
                            <div
                                id="grid"
                                className="flex grow justify-center w-full h-full overflow-auto"
                            >
                                {recentlyPlayed[0] ? (
                                    <RecentlyPlayedTable
                                        songs={recentlyPlayed}
                                    />
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
