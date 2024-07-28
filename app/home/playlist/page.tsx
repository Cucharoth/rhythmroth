"use client";

import { setUserPlaylist } from "@/app/stores/sessionSlice";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import { Playlist } from "@/app/types";
import PlaylistTable from "@/components/PlaylistTable";
import React, { useEffect } from "react";

const PlaylistPage = () => {
    const userPlaylist = useAppSelector(
        (state) => state.session.user?.playlists!
    );
    const currentUser = useAppSelector((state) => state.session.user!);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userPlaylist.length == 0 && currentUser.id != '') {
            const fetchPlaylists = async () => {
                try {
                    const response = await fetch(
                        `/api/playlist/user-id/${currentUser.id}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (response.status == 200) {
                        const newUserPlaylist: Playlist[] =
                            await response.json();
                        if (newUserPlaylist.length > 0) {
                            dispatch(setUserPlaylist(newUserPlaylist));
                        }
                    } else {
                        const errorMessage = await response.json();
                        throw new Error(errorMessage);
                    }
                } catch (error: any) {
                    console.error(error.message);
                }
            };
            fetchPlaylists();
        }
    }, []);

    return (
        <div>
            {userPlaylist.map((playlist: Playlist) => (
                <div key={playlist.id}>
                    <p>{playlist.name}</p>
                </div>
            ))}
            <PlaylistTable />
        </div>
    );
};

export default PlaylistPage;
