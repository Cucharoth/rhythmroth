import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Session, User } from "@/app/types";

const SET_USER = "SET_USER";

const initialUser: User = {
    id: "",
    userName: "",
    email: "",
    profileImg: "",
};

const initialState: Session = {
    user: initialUser,
};

export function setUser2(user: User) {
    return {
        type: SET_USER,
        payload: { user },
    };
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
    },
});

export const { setUser } = sessionSlice.actions;

export default sessionSlice.reducer;
