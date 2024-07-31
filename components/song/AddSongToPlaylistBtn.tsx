"use client";

import { addSong, setSelectedSongPlaylistId } from "@/app/stores/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import { Song } from "@/app/types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import React from "react";

const AddSongToPlaylistBtn = (props: { song: Song }) => {
    const dispatch = useAppDispatch();
    const songs = useAppSelector((state) => state.playlist.playlist.songs);
    const playlistLength = songs?.length;
    const currentPlaylist = useAppSelector((state) => state.playlist.playlist);

    const handleAddSongClick = async (song: Song) => {
        // validates not repeated songs on playlist
        const notOnPlaylist =
            songs?.find((playListSong) => playListSong.id == song.id) == null;

        // sets a new playlist song id
        if (playlistLength != undefined && notOnPlaylist) {
            let currentSong: Song | undefined = song;
            if (currentPlaylist.id != "") {
                try {
                    currentSong = await updatePlaylistDB(song);
                } catch (error: any) {
                    console.error(error);
                }
            }

            // fins a suitable new playlist id
            const newPlaylistId =
                songs!.reduce(
                    (max, song) => Math.max(max, song.playlistId),
                    1
                ) + 1;
            const isFirstSong = songs?.length == 0;
            if (currentSong) {
                const newSong: Song = {
                    id: currentSong.id,
                    name: currentSong.name,
                    artist: currentSong.artist,
                    src: currentSong.src,
                    duration: currentSong.duration,
                    playlistId: newPlaylistId,
                    coverSrc: currentSong.coverSrc,
                };

                dispatch(addSong(newSong));
                if (isFirstSong) {
                    dispatch(setSelectedSongPlaylistId(2));
                }
            }
        }
    };

    const updatePlaylistDB = async (song: Song) => {
        const request = {
            playlistId: currentPlaylist.id,
            songRequest: song,
        };
        const response = await fetch(`/api/playlist`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });
        if (response.status == 200) {
            const newSongAdded: Song = await response.json();
            if (newSongAdded) {
                return newSongAdded;
            }
        } else {
            const errorMessage = await response.json();
            throw new Error(errorMessage);
        }
    };

    return (
        <div>
            <Button
                onPress={() => handleAddSongClick(props.song)}
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
