import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Playlist, Song } from "@/app/types";

const playlist: Playlist = {
    id: "",
    name: "",
    songs: [],
};

const initialState = {
    playlist,
    currentSongPlaylistId: 0,
    isOpen: false,
    lastRemovedPlaylistId: 0,
    selectedSongPlaylistId: 0,
    isPaused: false,
    newPlaylistState: false,
};

export const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        addSong(state, action: PayloadAction<Song>) {
            state.playlist.songs?.push(action.payload);
        },
        removeSong(state, action: PayloadAction<Song>) {
            const currentSongIndex = state.playlist.songs?.findIndex(
                (song) => song.playlistId == action.payload.playlistId
            )!;
            state.playlist.songs?.splice(currentSongIndex, 1);
            state.lastRemovedPlaylistId = action.payload.playlistId;
        },
        setCurrentSongPlaylistId(state, action: PayloadAction<number>) {
            state.currentSongPlaylistId = action.payload;
        },
        setSelectedSongPlaylistId(state, action: PayloadAction<number>) {
            state.selectedSongPlaylistId = action.payload;
        },
        setIsOpen(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },
        setIsPaused(state, action: PayloadAction<boolean>) {
            state.isPaused = action.payload;
        },
        resetPlaylist(state) {
            console.log("playlist reset");
            state.playlist = playlist;
            state.currentSongPlaylistId = 1;
            state.selectedSongPlaylistId = 1;
            state.isOpen = false;
            state.isPaused = false;
        },
        setPlaylist(state, action: PayloadAction<Playlist>) {
            console.log("payload playlist");
            console.log(action.payload);
            state.playlist.id = action.payload.id;
            state.playlist.name = action.payload.name;
            state.playlist.songs = action.payload.songs!.map(
                (song: Song, index) => ({
                    ...song,
                    playlistId: index + 2,
                })
            );
            console.log("state playlist");
            console.log(state.playlist);
            state.newPlaylistState = true;
        },
        clearPlaylist(state) {
            console.log("clear playlist")
            state.playlist = playlist;
        },
        setNewPlaylistState(state, action: PayloadAction<boolean>) {
            state.newPlaylistState = action.payload;
        },
    },
});

export const {
    addSong,
    setCurrentSongPlaylistId,
    setSelectedSongPlaylistId,
    setIsOpen,
    removeSong,
    setIsPaused,
    resetPlaylist,
    setPlaylist,
    clearPlaylist,
    setNewPlaylistState
} = playlistSlice.actions;

export default playlistSlice.reducer;
