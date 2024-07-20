"use client";

import { setCurrentSongId } from "@/app/stores/playlistSlice";
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
    useEffect(() => {
        if (currentSongId != undefined) {
            dispatch(setCurrentSongId(currentSongId));
        }
    }, [currentSongId]);

    return <></>;
};

export default AudioPlayerInfo;
