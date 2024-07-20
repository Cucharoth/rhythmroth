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
    currentSongId: "",
};

export const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        addSong(state, action: PayloadAction<Song>) {
            state.playlist.songs?.push(action.payload);
        },
    },
});

export const { addSong } = playlistSlice.actions;

export default playlistSlice.reducer;
