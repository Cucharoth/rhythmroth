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
    },
});

export const {
    addSong,
    setCurrentSongPlaylistId,
    setSelectedSongPlaylistId,
    setIsOpen,
    removeSong,
    setIsPaused,
} = playlistSlice.actions;

export default playlistSlice.reducer;
