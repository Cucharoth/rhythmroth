import { clearPlaylist } from "@/app/stores/playlistSlice";
import { deletePlaylist } from "@/app/stores/sessionSlice";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import { Playlist } from "@/app/types";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@nextui-org/react";
import React from "react";

const DeletePlaylist = (props: { playlist: Playlist }) => {
    const dispatch = useAppDispatch();
    let currentPlaylist = props.playlist;
    const currentUser = useAppSelector((state) => state.session.user);

    const handlePress = async () => {
        try {
            const request = {
                userId: currentUser?.id,
                playlistRequestId: currentPlaylist.id,
            };
            const response = await fetch("/api/playlist", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });
            if (response.status == 200) {
                currentPlaylist = await response.json();
            } else {
                const errorMessage = await response.json();
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error(error);
        }
        dispatch(deletePlaylist(currentPlaylist));
        dispatch(clearPlaylist());
    };

    return (
        <div>
            <Tooltip
                content={"Deletes the current playlist"}
                className="text-white"
            >
                <Button
                    size="sm"
                    onPress={handlePress}
                    className="bg-opacity-0 text-danger hover:bg-danger hover:bg-opacity-20 border border-danger rounded-full shadow-md"
                >
                    <FontAwesomeIcon icon={faBan} size="xl" />
                </Button>
            </Tooltip>
        </div>
    );
};

export default DeletePlaylist;
