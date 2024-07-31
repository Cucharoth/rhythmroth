"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import { Song } from "@/app/types";
import { removeSong } from "@/app/stores/playlistSlice";
import { deletePlaylist } from "@/app/stores/sessionSlice";

const RemoveSongFromPlaylistBtn = (props: { song: Song }) => {
    const playlist = useAppSelector((state) => state.playlist.playlist);
    const currentSongId = useAppSelector(
        (state) => state.playlist.currentSongPlaylistId
    );
    const currentUser = useAppSelector((state) => state.session.user);
    const dispatch = useAppDispatch();

    const handleRemoveSongClick = async () => {
        let currentSong = props.song;
        if (playlist.id != "") {
            try {
                const request = {
                    userId: currentUser?.id,
                    playlistId: playlist.id,
                    songRequest: currentSong,
                };
                const response = await fetch("/api/playlist/song", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(request),
                });

                if (response.status == 200) {
                    currentSong = await response.json();
                    if (playlist.songs?.length == 1) {
                        dispatch(deletePlaylist(playlist));
                    }
                } else if (response.status == 400) {
                    const errorMessage = await response.json();
                    throw new Error(errorMessage);
                } else {
                    throw new Error(response.statusText);
                }
            } catch (error: any) {
                console.error(error);
            }
        }
        dispatch(removeSong(currentSong));
    };

    return (
        <div className="transition-all max-w-[35px] max-h-[35px] group">
            <Button
                onPress={() => handleRemoveSongClick()}
                isIconOnly
                size="sm"
                className="opacity-0 group-hover:opacity-100 bg-opacity-0 hover:bg-accent-700 hover:bg-opacity-80 transition-opacity duration-300 max-w-[30px]"
            >
                <FontAwesomeIcon icon={faXmark} />
            </Button>
        </div>
    );
};

export default RemoveSongFromPlaylistBtn;
