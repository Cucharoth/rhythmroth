"use client";

import AudioPlayer, {
    InterfacePlacement,
    PlayList,
} from "react-modern-audio-player";
import AudioPlayerInfo from "@/components/AudioPlayerInfo";
import { useAppSelector } from "@/app/stores/store";
import { PlaylistSong, Song } from "@/app/types";
import { useEffect, useState } from "react";

let playlist2: PlayList = [
    {
        src: "https://dl.dropbox.com/scl/fi/9valmig4pub72gw2zp7n3/Eurobeat-Spirited-Away-A-One.mp3?rlkey=pdmx4ozlp585vuizvytk0zre8&st=x4s3mu77",
        id: 1,
        name: "name",
        writer: "writer",
        img: "favicon.ico",
    },
    {
        name: "マンネリウィークエンド feat.花譜",
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

const defaultInterfacePlacement: InterfacePlacement = {
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

const currentPlaylist: PlayList = [
    {
        name: "マンネリウィークエンド feat.花譜",
        writer: "FAKE TYPE",
        img: "favicon.ico",
        src: "/assets/songs/FAKE TYPE. ＂マンネリウィークエンド feat.花譜＂ MV.mp3",
        id: 1,
    },
];

const Player = () => {
    const songs: Song[] | null = useAppSelector(
        (state) => state.playlist.playlist.songs
    );
    let currentPlaylist: PlayList = [];
    if (songs) {
        currentPlaylist = songs?.map((song: Song) => ({
            name: song.name,
            writer: song.artist,
            img: "favicon.ico", //TODO: FIX SONG IMAGE
            src: song.src,
            id: song.playlistId,
        }));
    }

    const [playlist, setPlaylist] = useState<PlayList>(currentPlaylist);

    useEffect(() => {
        if (songs && songs.length > 0 && songs.length != playlist.length) {
            const lastSong = songs[songs?.length - 1];
            const newPlaylistSong: PlaylistSong = {
                id: lastSong.playlistId,
                name: lastSong.name,
                writer: lastSong.artist,
                img: "favicon.ico",
                src: lastSong.src,
            };
            setPlaylist([...playlist, newPlaylistSong]);
        }

        return () => {
            console.log("UNMOUNTED");
        };
    }, [songs]);

    if (playlist == undefined || playlist == null) {
        console.log("PLAYLIST UNDEFINED");
    }
    return (
        <AudioPlayer
            playList={playlist}
            activeUI={{
                all: true,
                progress: "bar",
            }}
            placement={{
                player: "bottom",
                playList: "top",
                volumeSlider: "right",
                interface: defaultInterfacePlacement,
            }}
        >
            <AudioPlayer.CustomComponent id="playerCustomComponent">
                <AudioPlayerInfo />
            </AudioPlayer.CustomComponent>
        </AudioPlayer>
    );
};

export default Player;
