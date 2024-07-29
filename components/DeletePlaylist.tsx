import { useAppDispatch } from '@/app/stores/store';
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from '@nextui-org/react'
import React from 'react'

const DeletePlaylist = () => {
    const dispatch = useAppDispatch();

    const handlePress = () => {
        //console.log(props.playlist);
        //dispatch();
        //dispatch(setSelectedSongPlaylistId(2));
    };

  return (
    <div>
            <Tooltip content={"Deletes the current playlist"}>
                <Button
                    size="sm"
                    onPress={handlePress}
                    className="bg-opacity-0 text-danger hover:bg-danger hover:bg-opacity-20 border border-danger rounded-full shadow-md"
                >
                    <FontAwesomeIcon icon={faBan} size="xl" />
                </Button>
            </Tooltip>
        </div>
  )
}

export default DeletePlaylist