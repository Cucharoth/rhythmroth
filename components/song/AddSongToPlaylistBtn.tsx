"use client";

import { addSong } from "@/app/stores/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import { Song } from "@/app/types";
import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import React from "react";

const AddSongToPlaylistBtn = () => {
    const dispatch = useAppDispatch();
    const playlistLength = useAppSelector(
        (state) => state.playlist.playlist.songs?.length
    );
    const song: Song = {
        id: "2",
        playlistId: 0,
        name: "Eurobeat-Spirited-Away",
        artist: "A-One",
        src: "https://dl.dropbox.com/scl/fi/9valmig4pub72gw2zp7n3/Eurobeat-Spirited-Away-A-One.mp3?rlkey=pdmx4ozlp585vuizvytk0zre8&st=x4s3mu77",
        duration: 300,
    };

    const song2: Song = {
        id: "3",
        playlistId: 0,
        name: "test",
        artist: "test",
        src: "https://dl.dropbox.com/scl/fi/9valmig4pub72gw2zp7n3/Eurobeat-Spirited-Away-A-One.mp3?rlkey=pdmx4ozlp585vuizvytk0zre8&st=x4s3mu77",
        duration: 300,
    };

    const song3: Song = {
        id: "6",
        playlistId: 0,
        name: "testoooooooo",
        artist: "testoooooooooo",
        src: "https://dl.dropbox.com/scl/fi/9valmig4pub72gw2zp7n3/Eurobeat-Spirited-Away-A-One.mp3?rlkey=pdmx4ozlp585vuizvytk0zre8&st=x4s3mu77",
        duration: 300,
    };

    const handleAddSongClick = (song: Song) => {
        if (playlistLength != undefined) {
            song.playlistId = playlistLength + 1;
            //dispatch(addSong(song));
        }
    };

    return (
        <div>
            <Button
                onPress={() => handleAddSongClick(song3)}
                variant="shadow"
                className="bg-gradient-to-tr from-bg-accent-300 via-primary-300 to-primary-200 text-background-950 border rounded-full"
            >
                <p>add to playlist</p>
                <div className="mb-[1px]">
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </Button>
        </div>
    );
};

export default AddSongToPlaylistBtn;
