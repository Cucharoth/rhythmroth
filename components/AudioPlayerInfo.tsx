"use client";

import {
    setCurrentSongPlaylistId,
    setIsPaused,
} from "@/app/stores/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import { useEffect } from "react";
import { AudioPlayerStateContext } from "react-modern-audio-player";
import { Image } from "@nextui-org/image";
import { updateRecentlyPlayed } from "@/app/stores/sessionSlice";

const AudioPlayerInfo = ({
    audioPlayerState,
}: {
    audioPlayerState?: AudioPlayerStateContext;
}) => {
    const dispatch = useAppDispatch();
    const storeSongs = useAppSelector((state) => state.playlist.playlist.songs);
    const playlist = audioPlayerState?.playList;
    const currentSongPlaylistId = audioPlayerState?.curPlayId;
    const currentSong = playlist?.find(
        (song) => song.id == currentSongPlaylistId
    );
    const isPaused = audioPlayerState?.elementRefs?.audioEl?.paused;

    // updates the current song playlist ID and the recently played
    useEffect(() => {
        if (currentSongPlaylistId != undefined) {
            const currentSongFromStore = storeSongs?.find(
                (song) => song.playlistId == currentSongPlaylistId
            );
            dispatch(setCurrentSongPlaylistId(currentSongPlaylistId));
            if (currentSongFromStore) {
                dispatch(updateRecentlyPlayed(currentSongFromStore));
            }
        }
    }, [currentSongPlaylistId]);

    // TODO: FIND A WAY TO GET A THE CURRENT AUDIO STATUS, THIS IS ACCURATE ONLY AFTER CLICKING PLAY
    // updates the pause status
    useEffect(() => {
        dispatch(setIsPaused(!isPaused));
    }, [isPaused]);

    //console.log(audioPlayerState?.playList);

    return (
        <div className="flex min-w-[315px] max-w-[315px]">
            <Image
                isBlurred
                src={currentSong?.img}
                alt="cover image"
                className="z-10 mr-5"
                width={45}
                height={45}
            ></Image>
            <div className="mx-3 whitespace-nowrap text-ellipsis overflow-hidden">
                <div>
                    <p>{currentSong?.name}</p>
                </div>
                <div>
                    <p>{currentSong?.writer}</p>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayerInfo;
