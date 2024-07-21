"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import {
    addSong,
    setCurrentSongPlaylistId,
    setIsOpen,
    setSelectedSongPlaylistId,
} from "@/app/stores/playlistSlice";
import { Song } from "@/app/types";
import { button, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAnchor,
    faArrowLeft,
    faArrowRight,
    faCircleChevronLeft,
    faCircleChevronRight,
    faPlay,
    faSquareCaretLeft,
    faSquareCaretRight,
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
    // const song1: Song = {
    //     id: "1",
    //     name: "マンネリウィークエンド feat.花譜",
    //     artist: "FAKE TYPE",
    //     src: "/assets/songs/FAKE TYPE. ＂マンネリウィークエンド feat.花譜＂ MV.mp3",
    //     duration: 300,
    // };
    // const song2: Song = {
    //     id: "2",
    //     name: "Eurobeat-Spirited-Away",
    //     artist: "A-One",
    //     src: "https://dl.dropbox.com/scl/fi/9valmig4pub72gw2zp7n3/Eurobeat-Spirited-Away-A-One.mp3?rlkey=pdmx4ozlp585vuizvytk0zre8&st=x4s3mu77",
    //     duration: 300,
    // };
    //playlist.name = "My playlist";
    // dispatch(addSong(song1));

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
                <h2 className="text-lg font-bold transition-all">Playlist</h2>
                {playlist.name != "" && (
                    <h2 className="text-lg font-bold mb-4">{playlist.name}</h2>
                )}
                <ul>
                    {songs?.map((song: Song) => (
                        <li className="transition-all" key={song.id}>
                            <div className="flex justify-between group">
                                <button
                                    key={song.id}
                                    className={`flex-grow justify-start text-left cursor-pointer transition-all ${
                                        song.playlistId == currentSongPlaylistId
                                            ? "text-blue-600 transition-all"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleSongPlaylistClick(song)
                                    }
                                >
                                    {song.name}
                                </button>
                                <div className="flex justify-center items-center  min-w-[45px] min-h-[45px]">
                                    {song.playlistId !=
                                    currentSongPlaylistId ? (
                                        <RemoveSongFromPlaylistBtn
                                            song={song}
                                        />
                                    ) : (
                                        <FontAwesomeIcon icon={faPlay} beat/>
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
            className={`flex flex-col w-full transition-all sticky right-0 p-4 border-l border-gray-300 ${
                isPlaylistOpen ? "basis-1/5" : "basis-[3%]"
            }`}
        >
            <Button
                size="sm"
                isIconOnly
                radius="full"
                className=" mb-3 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
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
