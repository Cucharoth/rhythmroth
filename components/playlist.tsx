"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import { addSong } from "@/app/stores/playlistSlice";
import { Song } from "@/app/types";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor } from "@fortawesome/free-solid-svg-icons";

const playlist = () => {
    const dispatch = useAppDispatch();
    const playlist = useAppSelector((state) => state.playlist.playlist);
    const currentSongId = useAppSelector(
        (state) => state.playlist.currentSongId
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
    };

    return (
        <div className="w-full basis-[3%] hover:basis-1/5 transition-all sticky right-0 p-4 border-l border-gray-300">
            <Button
                isIconOnly
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
                <FontAwesomeIcon icon={faAnchor} />
            </Button>
            <h2 className="text-lg font-bold">Playlist</h2>
            {playlist.name != "" && (
                <h2 className="text-lg font-bold mb-4">{playlist.name}</h2>
            )}
            <ul>
                {songs?.map((song: Song) => (
                    <li key={song.id}>
                        <button
                            key={song.id}
                            className={`cursor-pointer ${
                                song.playlistId == currentSongId
                                    ? "text-blue-600 transition-all"
                                    : ""
                            }`}
                            onClick={() => handleSongPlaylistClick(song)}
                        >
                            {song.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default playlist;
