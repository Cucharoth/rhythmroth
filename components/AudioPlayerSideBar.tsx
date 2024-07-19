"use client";

import { AudioPlayerStateContext } from "react-modern-audio-player";

const AudioPlayerSideBar = ({
    audioPlayerState,
}: {
    audioPlayerState?: AudioPlayerStateContext;
}) => {
    const audioEl = audioPlayerState?.elementRefs?.audioEl;
    const handOverTime = () => {
        if (audioEl) {
            audioEl.currentTime += 30;
        }
    };
    const currentSongId = audioPlayerState?.curPlayId;
    console.log(audioPlayerState);
    return <></>;
};

export default AudioPlayerSideBar;
