import React from "react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import { Song } from "@/app/types";
import { removeSong } from "@/app/stores/playlistSlice";

const RemoveSongFromPlaylistBtn = (props: { song: Song }) => {
    const playlist = useAppSelector((state) => state.playlist.playlist.songs);
    const currentSongId = useAppSelector(
        (state) => state.playlist.currentSongPlaylistId
    );
    const dispatch = useAppDispatch();

    const handleRemoveSongClick = () => {
        console.log(props.song);
        dispatch(removeSong(props.song));
    };

    return (
        <div className="transition-all min-w-[40px] min-h-[40px] group">
            <Button
                onPress={() => handleRemoveSongClick()}
                isIconOnly
                variant="light"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <FontAwesomeIcon icon={faXmark} />
            </Button>
        </div>
    );
};

export default RemoveSongFromPlaylistBtn;
