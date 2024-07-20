import React from "react";
import AddSongToPlaylistBtn from "@/components/song/AddSongToPlaylistBtn";

const songPage = ({ params }) => {
    return (
        <div>
            <p>song id: {params.id}</p>
            <AddSongToPlaylistBtn />
        </div>
    );
};
export default songPage;
