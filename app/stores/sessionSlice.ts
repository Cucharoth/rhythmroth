import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Playlist, Session, Song, User } from "@/app/types";

const initialUser: User = {
    id: "",
    userName: "",
    email: "",
    profileImg: "",
};

const recentlyPlayed: Song[] = [];
const fetchedSongs: Song[] = [];
const userPlaylists: Playlist[] = []

const initialState: Session = {
    user: initialUser,
    recentlyPlayed,
    fetchedSongs,
    userPlaylists,
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            console.log("user saved");
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
    },
});

export const { setUser, updateRecentlyPlayed, setFetchedSongs, resetSession } =
    sessionSlice.actions;

export default sessionSlice.reducer;
