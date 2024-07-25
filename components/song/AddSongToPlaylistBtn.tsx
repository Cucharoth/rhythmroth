"use client";

import { addSong, setSelectedSongPlaylistId } from "@/app/stores/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import { Song } from "@/app/types";
import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import React from "react";

const AddSongToPlaylistBtn = (props: { song: Song }) => {
    const dispatch = useAppDispatch();
    const playlist = useAppSelector((state) => state.playlist.playlist.songs);
    const playlistLength = playlist?.length;
    const handleAddSongClick = (song: Song) => {
        // validates not repeated songs on playlist
        const notOnPlaylist =
            playlist?.find((playListSong) => playListSong.id == song.id) ==
            null;

        // sets a new playlist song id
        if (playlistLength != undefined && notOnPlaylist) {
            // fins a suitable new playlist id
            const newPlaylistId = playlist!.reduce((max, song) =>
                Math.max(max, song.playlistId), 1
            ) + 1;
            const isFirstSong = playlist?.length == 0;
            const newSong: Song = {
                id: song.id,
                name: song.name,
                artist: song.artist,
                src: song.src,
                duration: song.duration,
                playlistId: newPlaylistId,
                coverSrc: song.coverSrc,
            };
            dispatch(addSong(newSong));
            if (isFirstSong) {
                dispatch(setSelectedSongPlaylistId(2));
            }
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
