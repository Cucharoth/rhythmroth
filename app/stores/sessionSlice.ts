import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Session, User } from "@/app/types";

const initialState: Session = {
    user: null,
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = sessionSlice.actions;

export default sessionSlice.reducer;
