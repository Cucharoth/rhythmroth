"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { Song } from "../types";
import { useAppDispatch } from "../stores/store";
import { addSong } from "../stores/playlistSlice";
import { useRouter } from "next/navigation";

const home = () => {
    const router = useRouter();

    const song1: Song = {
        id: "2",
        name: "Eurobeat-Spirited-Away",
        artist: "A-One",
        src: "https://dl.dropbox.com/scl/fi/9valmig4pub72gw2zp7n3/Eurobeat-Spirited-Away-A-One.mp3?rlkey=pdmx4ozlp585vuizvytk0zre8&st=x4s3mu77",
        duration: 300,
    };

    const song2: Song = {
        id: "3",
        name: "test",
        artist: "test",
        src: "https://dl.dropbox.com/scl/fi/9valmig4pub72gw2zp7n3/Eurobeat-Spirited-Away-A-One.mp3?rlkey=pdmx4ozlp585vuizvytk0zre8&st=x4s3mu77",
        duration: 300,
    };

    const handleSongClick = (song: Song) => {
        router.push(`/song/${song.id}`);
    };

    return (
        <div>
            <Button onPress={() => handleSongClick(song1)}>SONG1</Button>
            <Button onPress={() => handleSongClick(song2)}>SONG2</Button>
        </div>
    );
};

export default home;
