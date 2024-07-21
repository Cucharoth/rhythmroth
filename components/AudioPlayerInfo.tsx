"use client";

import { setCurrentSongPlaylistId } from "@/app/stores/playlistSlice";
import { useAppDispatch } from "@/app/stores/store";
import { useEffect } from "react";
import { AudioPlayerStateContext } from "react-modern-audio-player";

const AudioPlayerInfo = ({
    audioPlayerState,
}: {
    audioPlayerState?: AudioPlayerStateContext;
}) => {
    const dispatch = useAppDispatch();
    const currentSongId = audioPlayerState?.curPlayId;

    // TODO: FIND A WAY TO GET A THE CURRENT AUDIO STATUS, THIS IS ACCURATE ONLY AFTER CLICKING PLAY
    // const isPlaying = audioPlayerState?.elementRefs?.audioEl?.paused;
    // console.log(isPlaying);

    // updates the current song playlist ID
    useEffect(() => {
        if (currentSongId != undefined) {
            dispatch(setCurrentSongPlaylistId(currentSongId));
        }
    }, [currentSongId]);
    //console.log(audioPlayerState?.playList);

    return <></>;
};

export default AudioPlayerInfo;
