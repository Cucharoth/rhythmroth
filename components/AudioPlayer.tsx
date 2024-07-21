"use client";

import AudioPlayer, {
    InterfacePlacement,
    PlayList,
} from "react-modern-audio-player";
import AudioPlayerInfo from "./AudioPlayerInfo";
import { useAppSelector } from "@/app/stores/store";
import { PlaylistSong, Song } from "@/app/types";
import { useEffect, useState } from "react";

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

const Player = () => {
    const songs: Song[] | null = useAppSelector(
        (state) => state.playlist.playlist.songs
    );
    const lastRemovedPlaylistId = useAppSelector(
        (state) => state.playlist.lastRemovedPlaylistId
    );
    const selectedSongPlaylistId = useAppSelector(
        (state) => state.playlist.selectedSongPlaylistId
    );
    let currentPlaylist: PlayList = [];

    // maps the store playlist to a Player playlist.
    if (songs) {
        currentPlaylist = songs?.map((song: Song) => ({
            name: song.name,
            writer: song.artist,
            img: "favicon.ico", //TODO: FIX SONG IMAGE
            src: song.src,
            id: song.playlistId,
        }));
    }
    // sets the initials value that will be used for the Player on load.
    const [playlist, setPlaylist] = useState<PlayList>(currentPlaylist);
    const [curPlayId, setCurPlayId] = useState(selectedSongPlaylistId);

    //handles changes on store playlist
    useEffect(() => {
        // adds song to Player playlist
        if (songs && songs.length > 0 && songs.length > playlist.length) {
            const lastSong = songs[songs?.length - 1];
            const newPlaylistSong: PlaylistSong = {
                id: lastSong.playlistId,
                name: lastSong.name,
                writer: lastSong.artist,
                img: "favicon.ico",
                src: lastSong.src,
            };
            setPlaylist([...playlist, newPlaylistSong]);

        // removes song from Player playlist
        } else if (
            songs &&
            songs.length > 0 &&
            songs.length < playlist.length
        ) {
            const lastRemovedIndex = lastRemovedPlaylistId - 1;
            playlist.splice(lastRemovedIndex, 1);
        }
    }, [songs]);

    // handles changes on the current song
    useEffect(() => {
        if (selectedSongPlaylistId) {
            setCurPlayId(selectedSongPlaylistId);
        }
    }, [selectedSongPlaylistId]);

    if (playlist == undefined || playlist == null) {
        console.log("PLAYLIST UNDEFINED");
    }
    return (
        <AudioPlayer
            playList={playlist}
            audioInitialState={{
                volume: 0.7,
                curPlayId: curPlayId,
            }}
            activeUI={{
                all: true,
                progress: "bar",
            }}
            placement={{
                player: "bottom",
                playList: "top",
                volumeSlider: "top",
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
