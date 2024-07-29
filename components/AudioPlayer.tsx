"use client";

import AudioPlayer, {
    ActiveUI,
    AudioData,
    InterfacePlacement,
    PlayList,
} from "react-modern-audio-player";
import AudioPlayerInfo from "./AudioPlayerInfo";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import { PlaylistSong, Song } from "@/app/types";
import { useEffect, useState } from "react";
import {
    resetPlaylist,
    setCurrentSongPlaylistId,
    setNewPlaylistState,
} from "@/app/stores/playlistSlice";

const defaultSong = {
    name: "",
    writer: "",
    img: "https://dl.dropbox.com/scl/fi/b35suhc6g8xrjxt4w7dwr/06.-f-Casket-of-Star.mp3?rlkey=3k75kuwsxkyhb7dr3rxrkmcqh&st=0vtr2m10",
    src: "https://dl.dropbox.com/scl/fi/ekffk5b2ke60f3em5d3kg/le-Grimoire-De-reve.jpg?rlkey=0ibsoz65ked5rqoxp0bdivpqd&st=yabsoiq9",
    id: 1,
};

const interfacePlacement: InterfacePlacement[] = [];
const activeUI: ActiveUI[] = [];
const customInterfacePlacement: InterfacePlacement = {
    templateArea: {
        trackInfo: "row1-2",
        trackTimeCurrent: "row1-3",
        trackTimeDuration: "row1-4",
        progress: "row1-5",
        repeatType: "row1-9",
        volume: "row1-7",
        playButton: "row1-6",
        playList: "row1-8",
    },
    customComponentsArea: {
        playerCustomComponent: "row1-2",
    } as InterfacePlacement<11>,
};
interfacePlacement.push(customInterfacePlacement);

const smallInterfacePlacement: InterfacePlacement = {
    templateArea: {
        progress: "row1-2",
        playButton: "row2-2",
        volume: "row2-3",
    },
    customComponentsArea: {
        playerCustomComponent: "row2-1",
    } as InterfacePlacement<11>,
};
interfacePlacement.push(smallInterfacePlacement);

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

const defaultActiveUi: ActiveUI = {
    playButton: true,
    playList: false,
    prevNnext: true,
    volume: true,
    volumeSlider: true,
    repeatType: true,
    trackTime: true,
    trackInfo: false,
    artwork: false,
    progress: "bar",
};
activeUI.push(defaultActiveUi);

const smallActiveUi: ActiveUI = {
    playButton: true,
    playList: "unSortable",
    prevNnext: true,
    volume: true,
    progress: "bar",
};
activeUI.push(smallActiveUi);

const Player = () => {
    const songs: Song[] | null = useAppSelector(
        (state) => state.playlist.playlist.songs
    );
    const lastRemovedPlaylistId = useAppSelector(
        (state) => state.playlist.lastRemovedPlaylistId
    );
    let selectedSongPlaylistId = useAppSelector(
        (state) => state.playlist.selectedSongPlaylistId
    );
    const newPlaylistState = useAppSelector(
        (state) => state.playlist.newPlaylistState
    );
    const dispatch = useAppDispatch();
    let currentPlaylist: PlayList = [];

    // maps the store playlist to a Player playlist.
    if (songs) {
        currentPlaylist = songs?.map((song: Song) => ({
            name: song.name,
            writer: song.artist,
            img: song.coverSrc,
            src: song.src,
            id: song.playlistId,
        }));
    }

    // sets the initials value that will be used for the Player on load.
    useEffect(() => {
        if (currentPlaylist.length == 0) {
            currentPlaylist.push(defaultSong);
            dispatch(setCurrentSongPlaylistId(1));
            selectedSongPlaylistId = 1;
        } else if (
            songs!.find((song) => song.playlistId == selectedSongPlaylistId) ==
            null
        ) {
            console.error(
                "Selected song '" +
                    selectedSongPlaylistId +
                    "' was not found in playlist Store, check song playlist ID"
            );
            console.log(songs);
            currentPlaylist = [];
            currentPlaylist.push(defaultSong);
            dispatch(resetPlaylist());
            selectedSongPlaylistId = 1;
        }
    }, []);
    const [playlist, setPlaylist] = useState<PlayList>(currentPlaylist);
    const [curPlayId, setCurPlayId] = useState(selectedSongPlaylistId);

    //handles changes on store playlist
    useEffect(() => {
        console.log("change on song");
        console.log(songs);
        if (songs && songs.length == 0) {
            console.log("on song == 0");
            playlist[0] = defaultSong;
            setCurPlayId(1);
            playlist.splice(1);
        }

        // adds song to Player playlist
        if (songs && songs.length > 0 && songs.length == playlist.length + 1) {
            console.log("adding one");
            const newPlaylistSong: PlaylistSong = getLastSongAdded();
            setPlaylist([...playlist, newPlaylistSong]);

            // removes song from Player playlist
        } else if (
            songs &&
            songs.length != 0 &&
            songs.length == playlist.length - 1
        ) {
            console.log("removes song");
            const deletedSongIndex = playlist.findIndex(
                (song) => song.id == lastRemovedPlaylistId
            );

            if (songs.length <= 1) {
                playlist[0] = defaultSong;
                setCurPlayId(1);
            } else {
                playlist.splice(deletedSongIndex, 1);
            }
        }

        if (songs && songs?.length > 0 && newPlaylistState) {
            console.log("add new playlist");
            const newPlaylist = songs.map(
                (song: Song): AudioData => ({
                    id: song.playlistId,
                    name: song.name,
                    writer: song.artist,
                    img: song.coverSrc,
                    src: song.src,
                })
            );
            setPlaylist(newPlaylist);
            dispatch(setCurrentSongPlaylistId(2));
            setCurPlayId(2);
            dispatch(setNewPlaylistState(false));
            console.log(playlist);
        }

        // handles first song added
        if (!newPlaylistState && songs!.length > 0 && playlist[0].name == "") {
            console.log("first song");
            const newPlaylistSong = getLastSongAdded();
            playlist.pop();
            playlist.push(newPlaylistSong);
            setCurPlayId(2);
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

    const getLastSongAdded = (): PlaylistSong => {
        const lastSong = songs![songs!.length - 1];
        const newPlaylistSong: PlaylistSong = {
            id: lastSong.playlistId,
            name: lastSong.name,
            writer: lastSong.artist,
            img: lastSong.coverSrc,
            src: lastSong.src,
        };
        return newPlaylistSong;
    };

    // workaround for resizing Player on demand
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState<number>(
        window.innerHeight
    );
    const [uiIndexValue, setUiIndexValue] = useState<number>(0);

    const updateScreenDimensions = () => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
    };

    // sets up the event listener
    useEffect(() => {
        window.addEventListener("resize", updateScreenDimensions);
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", updateScreenDimensions);
        };
    }, []);

    useEffect(() => {
        if (screenWidth < 640) {
            setUiIndexValue(1);
        } else {
            setUiIndexValue(0);
        }
    }, [screenWidth]);

    return (
        <div className="z-20">
            <AudioPlayer
                playList={playlist}
                audioInitialState={{
                    volume: 0.6,
                    curPlayId: curPlayId,
                }}
                activeUI={activeUI[uiIndexValue]}
                placement={{
                    player: "bottom",
                    playList: "top",
                    volumeSlider: "top",
                    interface: interfacePlacement[uiIndexValue],
                }}
            >
                <AudioPlayer.CustomComponent id="playerCustomComponent">
                    <AudioPlayerInfo />
                </AudioPlayer.CustomComponent>
            </AudioPlayer>
        </div>
    );
};

export default Player;
