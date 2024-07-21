"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import {
    setIsOpen,
    setSelectedSongPlaylistId,
} from "@/app/stores/playlistSlice";
import { Song } from "@/app/types";
import { button, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faPlay,
} from "@fortawesome/free-solid-svg-icons";
import RemoveSongFromPlaylistBtn from "./song/RemoveSongFromPlaylistBtn";

const playlist = () => {
    const dispatch = useAppDispatch();
    const isPlaylistOpen = useAppSelector((state) => state.playlist.isOpen);
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
                <h2 className="text-lg px-2 text-primary-foreground font-bold transition-all">
                    Playlist
                </h2>
                {playlist.name != "" && (
                    <h2 className="text-lg px-2 font-bold mb-4">
                        {playlist.name}
                    </h2>
                )}
                <ul>
                    {songs?.map((song: Song) => (
                        <li className="transition-all" key={song.id}>
                            <div
                                className={`flex justify-between group px-2 hover:bg-accent-200 hover:bg-opacity-20 rounded-md 
                                    ${
                                        song.playlistId ==
                                            currentSongPlaylistId &&
                                        "bg-accent-300 hover:bg-accent-300"
                                    }
                                `}
                            >
                                <button
                                    key={song.id}
                                    className={`flex-grow justify-start text-left overflow-hidden cursor-pointer transition-all text-primary-foreground
                                        
                                        ${
                                            song.playlistId ==
                                                currentSongPlaylistId &&
                                            "text-background-950 transition-all"
                                        }`}
                                    onClick={() =>
                                        handleSongPlaylistClick(song)
                                    }
                                >
                                    {song.name}
                                </button>
                                <div
                                    className={`flex justify-center text-primary-foreground items-center min-w-[45px] min-h-[45px]`}
                                >
                                    {song.playlistId !=
                                    currentSongPlaylistId ? (
                                        <RemoveSongFromPlaylistBtn
                                            song={song}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            style={{ color: "#000" }}
                                            icon={faPlay}
                                            beat
                                        />
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div
            className={`flex flex-col w-full transition-all sticky right-0 p-3 border-l border-gray-300 ${
                isPlaylistOpen ? "basis-1/5 max-w-[20%]" : "basis-[3%]"
            }`}
        >
            <Button
                size="sm"
                isIconOnly
                radius="full"
                className=" mb-3 px-2 bg-gradient-to-tr from-accent to-accent-300 text-white shadow-lg"
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
                    {isPlaylistOpen && (
                        <Button variant="light" isLoading></Button>
                    )}
                </>
            )}
        </div>
    );
};

export default playlist;
