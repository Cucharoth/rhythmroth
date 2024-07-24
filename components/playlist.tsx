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

    const handleSongPlaylistClick = (song: Song) => {
        console.log(song);
        dispatch(setSelectedSongPlaylistId(song.playlistId));
    };

    // controls the playlist delay
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaylistOpen) {
            timer = setTimeout(() => setShowPlaylistOpen(true), 700);
        } else {
            setShowPlaylistOpen(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaylistOpen]);

    const PlaylistOpen = () => {
        return (
            <div className="transition-all">
                {playlist.name != "" ? (
                    <h2 className="text-lg px-2 font-bold mb-4">
                        {playlist.name}
                    </h2>
                ) : (
                    <h2 className="text-lg px-2 text-primary-foreground font-bold transition-all">
                        Playlist
                    </h2>
                )}
                <ul>
                    <Divider className="mt-2 mb-4" />
                    {songs?.length == 0 ? (
                        <p className="text-center text-primary-foreground">
                            add some songs~
                        </p>
                    ) : (
                        <>
                            {songs?.map((song: Song) => (
                                <li className="transition-all" key={song.id}>
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
            className={`flex flex-col w-full transition-all sticky right-0 p-3 border-l border-gray-300 ${
                isPlaylistOpen ? "w-[30%] max-w-[370px]" : "w-[5%]"
            }`}
        >
            <Button
                size="sm"
                isIconOnly
                radius="full"
                className=" mb-3 px-2 mx-2 bg-gradient-to-tr from-accent to-accent-300 text-white shadow-lg"
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
        </div>
    );
};

export default playlist;
