"use client";

import { clearPlaylist, setPlaylist } from "@/app/stores/playlistSlice";
import { useAppDispatch } from "@/app/stores/store";
import { Playlist } from "@/app/types";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@nextui-org/react";
import React from "react";

const ChangePlaylist = (props: { playlist: Playlist }) => {
    const dispatch = useAppDispatch();

    const handlePress = () => {
        dispatch(clearPlaylist());
        setTimeout(() => dispatch(setPlaylist(props.playlist)), 200);
    };

    return (
        <div className="flex justify-center items-center">
            <Tooltip content="Add current playlist" className="text-white">
                <Button
                    size="sm"
                    onPress={handlePress}
                    className="bg-gradient-to-tr from-accent-300 via-primary-300 to-primary-200 text-background-950 border rounded-full shadow-md"
                >
                    <FontAwesomeIcon icon={faPlay} size="xl" />
                </Button>
            </Tooltip>
        </div>
    );
};

export default ChangePlaylist;
