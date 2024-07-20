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
    currentSongId: 0,
};

export const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        addSong(state, action: PayloadAction<Song>) {
            state.playlist.songs?.push(action.payload);
        },
        setCurrentSongId(state, action: PayloadAction<number>) {
            state.currentSongId = action.payload;
        },
    },
});

export const { addSong, setCurrentSongId } = playlistSlice.actions;

export default playlistSlice.reducer;
