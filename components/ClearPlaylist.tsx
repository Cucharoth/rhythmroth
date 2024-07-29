import { clearPlaylist } from "@/app/stores/playlistSlice";
import { useAppDispatch } from "@/app/stores/store";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@nextui-org/react";
import React from "react";

const ClearPlaylist = () => {
    const dispatch = useAppDispatch();

    const handlePress = () => {
        dispatch(clearPlaylist());
    };

    return (
        <div>
            <Tooltip content={"Clears the current playlist"} className="text-white">
                <Button
                    size="sm"
                    onPress={handlePress}
                    className="bg-opacity-0 text-primary-foreground hover:bg-danger hover:bg-opacity-20 border border-primary-foreground rounded-full shadow-md"
                >
                    <FontAwesomeIcon icon={faBan} size="xl" />
                </Button>
            </Tooltip>
        </div>
    );
};

export default ClearPlaylist;
