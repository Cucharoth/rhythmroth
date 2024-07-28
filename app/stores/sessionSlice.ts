import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Playlist, Session, Song, User } from "@/app/types";

const initialUser: User = {
    id: "",
    userName: "",
    email: "",
    profileImg: "",
    playlists: [],
};

const recentlyPlayed: Song[] = [];
const fetchedSongs: Song[] = [];

const initialState: Session = {
    user: initialUser,
    recentlyPlayed,
    fetchedSongs,
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        updateRecentlyPlayed(state, action: PayloadAction<Song>) {
            if (state.recentlyPlayed[0]) {
                // checks for duplicates in recentlyPlayed
                const existingSongIndex = state.recentlyPlayed.findIndex(
                    (stateSong) => stateSong.id == action.payload.id
                );

                // caps recentlyPlayed at 10
                if (state.recentlyPlayed.length == 10) {
                    state.recentlyPlayed.pop();
                }

                // if the song already exists, reorders the array
                if (existingSongIndex != -1) {
                    state.recentlyPlayed.splice(existingSongIndex, 1);
                }
                state.recentlyPlayed.unshift(action.payload);
            } else {
                state.recentlyPlayed.push(action.payload);
            }
        },
        setFetchedSongs(state, action: PayloadAction<Song[]>) {
            state.fetchedSongs = action.payload;
        },
        resetSession(state) {
            state.fetchedSongs = [];
            state.recentlyPlayed = [];
            state.user = initialUser;
        },
        updateUserPlaylist(state, action: PayloadAction<Playlist>) {
            state.user?.playlists.push(action.payload);
        },
        setUserPlaylist(state, action: PayloadAction<Playlist[]>) {
            state.user!.playlists = action.payload;
        },
    },
});

export const {
    setUser,
    updateRecentlyPlayed,
    setFetchedSongs,
    resetSession,
    updateUserPlaylist,
    setUserPlaylist
} = sessionSlice.actions;

export default sessionSlice.reducer;
