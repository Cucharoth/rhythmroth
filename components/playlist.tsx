"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import {
    setIsOpen,
    setSelectedSongPlaylistId,
} from "@/app/stores/playlistSlice";
import { Song } from "@/app/types";
import { button, Button, Divider } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faList,
    faPlay,
} from "@fortawesome/free-solid-svg-icons";
import RemoveSongFromPlaylistBtn from "./song/RemoveSongFromPlaylistBtn";
import { Image } from "@nextui-org/image";
import CreatePlaylist from "./CreatePlaylist";
import ClearPlaylist from "./ClearPlaylist";

const playlist = () => {
    const dispatch = useAppDispatch();
    const isPlaylistOpen = useAppSelector((state) => state.playlist.isOpen);
    const [isPaused, setIsPaused] = useState(
        useAppSelector((state) => state.playlist.isPaused)
    );
    const [showPlaylistOpen, setShowPlaylistOpen] = useState(false);
    const playlist = useAppSelector((state) => state.playlist.playlist);
    const currentSongPlaylistId = useAppSelector(
        (state) => state.playlist.currentSongPlaylistId
    );
    const songs = playlist.songs;
    const currentUser = useAppSelector((state) => state.session.user!);

    const handleSongPlaylistClick = (song: Song) => {
        dispatch(setSelectedSongPlaylistId(song.playlistId));
    };
    const [isPlaylistRdy, setIsPlaylistRdy] = useState<boolean>(false);

    // controls the playlist delay
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaylistOpen) {
            timer = setTimeout(() => setShowPlaylistOpen(true), 500);
        } else {
            setShowPlaylistOpen(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaylistOpen]);

    // controls the playlist transition
    // useEffect(() => {
    //     setIsPlaylistRdy(false)
    //     setTimeout(() => setIsPlaylistRdy(true), 10000)
    // }, [playlist]);

    const PlaylistOpen = () => {
        return (
            <div className="transition-all">
                <div className="flex min-h-[37px] items-center justify-between">
                    {playlist.name != "" ? (
                        <h2 className="text-lg px-2 text-primary-foreground font-bold transition-all">
                            {playlist.name}
                        </h2>
                    ) : (
                        <h2 className="text-lg px-2 text-primary-foreground font-bold transition-all">
                            Playlist
                        </h2>
                    )}
                    {currentUser.id != "" &&
                        playlist.name == "" &&
                        songs!.length > 0 && (
                            <div className="flex">
                                <CreatePlaylist />
                            </div>
                        )}
                </div>
                <ul>
                    <Divider className="mt-2 mb-4" />
                    {songs?.length == 0 ? (
                        <p className="text-center text-primary-foreground">
                            add some songs~
                        </p>
                    ) : (
                        <>
                            {songs?.map((song: Song, index) => (
                                <li key={song.id}>
                                    <div
                                        className={`flex justify-between items-center group px-2 hover:bg-accent-200 hover:bg-opacity-20 rounded-md transition-colors
                                    ${
                                        song.playlistId ==
                                            currentSongPlaylistId &&
                                        "bg-accent-300 hover:bg-accent-300"
                                    }
                                `}
                                    >
                                        <Image
                                            loading="lazy"
                                            removeWrapper
                                            className="mt-[3px] mr-2 rounded-full"
                                            src={song.coverSrc}
                                            alt="Card background"
                                            width={35}
                                            height={35}
                                        ></Image>
                                        <button
                                            className={`flex-grow justify-start text-sm text-left whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer transition-all text-primary-foreground
                                        
                                        `}
                                            onClick={() =>
                                                handleSongPlaylistClick(song)
                                            }
                                        >
                                            <div className="pt-[2px]">
                                                <p
                                                    className={`${
                                                        song.playlistId ==
                                                            currentSongPlaylistId &&
                                                        "text-background-950"
                                                    }`}
                                                >
                                                    {song.name}
                                                </p>
                                            </div>
                                        </button>
                                        <div
                                            className={`flex justify-center text-primary-foreground items-center min-w-[40px] min-h-[40px]`}
                                        >
                                            <RemoveSongFromPlaylistBtn
                                                song={song}
                                            />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            </div>
        );
    };

    return (
        <div
            className={`grow md:flex md:visible md:bg-opacity-0 md:z-0 md:pt-3 flex-col w-full transition-all md:sticky right-0 p-3 rounded-l-lg md:rounded-none border-l-8 border-primary-200 md:border-l md:border-gray-300 ${
                isPlaylistOpen
                    ? "flex visible playlist absolute min-h-svh bg-black bg-opacity-80 z-50 pt-12 w-[30%] max-w-[370px]"
                    : " hidden md:visible w-[5%] max-w-[82px]"
            }`}
        >
            <Button
                size="sm"
                isIconOnly
                radius="full"
                className="min-h-[36px] mb-3 px-2 mx-2 bg-gradient-to-tr from-accent-300 via-primary-300 to-primary-200 text-background-950 border rounded-full shadow-md"
                onPress={() => dispatch(setIsOpen(!isPlaylistOpen))}
            >
                {isPlaylistOpen ? (
                    <FontAwesomeIcon icon={faArrowRight} size="xl" />
                ) : (
                    <FontAwesomeIcon icon={faArrowLeft} size="xl" />
                )}
            </Button>
            {showPlaylistOpen ? (
                <PlaylistOpen />
            ) : (
                <>
                    {isPlaylistOpen ? (
                        <Button variant="light" isLoading></Button>
                    ) : (
                        <FontAwesomeIcon icon={faList} size="xl" />
                    )}
                </>
            )}

            <div className="flex flex-col w-full bottom-0 mt-auto justify-center items-center">
                <Divider className="my-2" />
                <ClearPlaylist />
            </div>
        </div>
    );
};

export default playlist;
