"use client";

import AudioPlayer from "react-modern-audio-player";
import AudioPlayerSideBar from "@/components/AudioPlayerSideBar";

const playList = [
    {
        name: "name",
        writer: "writer",
        img: "favicon.ico",
        src: "https://dl.dropbox.com/scl/fi/9valmig4pub72gw2zp7n3/Eurobeat-Spirited-Away-A-One.mp3?rlkey=pdmx4ozlp585vuizvytk0zre8&st=x4s3mu77",
        id: 1,
    },
    {
        name: "マンネリウィークエンド feat.花譜＂",
        writer: "FAKE TYPE",
        img: "favicon.ico",
        src: "/assets/songs/FAKE TYPE. ＂マンネリウィークエンド feat.花譜＂ MV.mp3",
        id: 2,
    },
];

const customInterfacePlacement = {
    templateArea: {
        artwork: "row1-2",
        playList: "row1-3",
        trackInfo: "row2-3",
        trackTimeCurrent: "row3-1",
        progress: "row3-2",
        trackTimeDuration: "row3-3",
        playButton: "row4-2",
        repeatType: "row4-1",
        volume: "row4-3",
    },
};

const defaultInterfacePlacement = {
    templateArea: {
        artwork: "row1-1",
        trackInfo: "row1-2",
        trackTimeCurrent: "row1-3",
        trackTimeDuration: "row1-4",
        progress: "row1-5",
        repeatType: "row1-9",
        volume: "row1-7",
        playButton: "row1-6",
        playList: "row1-8",
    },
};

const Player = () => {
    return (
        <AudioPlayer
            playList={playList}
            activeUI={{
                all: true,
                progress: "waveform",
            }}
            placement={{
                player: "bottom",
                playList: "top",
                volumeSlider: "right",
                interface: defaultInterfacePlacement,
            }}
        >
            <AudioPlayer.CustomComponent id="playerCustomComponent">
                <AudioPlayerSideBar />
            </AudioPlayer.CustomComponent>
        </AudioPlayer>
    );
};

export default Player;
