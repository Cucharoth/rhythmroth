import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Session, Song, User } from "@/app/types";

const initialUser: User = {
    id: "",
    userName: "",
    email: "",
    profileImg: "",
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
                    
                    // if the song already exists, reorders the array
                } else if (existingSongIndex != -1) {
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
    },
});

export const { setUser, updateRecentlyPlayed, setFetchedSongs } =
    sessionSlice.actions;

export default sessionSlice.reducer;
