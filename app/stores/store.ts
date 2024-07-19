"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionReducer from "@/app/stores/sessionSlice";
import playlistReducer from "@/app/stores/playlistSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "./storage";

const sessionPersistConfig = {
    key: "root",
    storage: storage,
};

const rootReducer = combineReducers({
    session: persistReducer(sessionPersistConfig, sessionReducer),
    playlist: persistReducer(sessionPersistConfig, playlistReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
