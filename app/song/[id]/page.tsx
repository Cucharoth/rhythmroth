import React from "react";
import AddSongToPlaylistBtn from "@/components/song/AddSongToPlaylistBtn";
import { commonColors, semanticColors } from "@nextui-org/theme";
import { Button } from "@nextui-org/react";

const songPage = ({ params }) => {
    //console.log(commonColors.white); // #FFFFFF
    //console.log(commonColors.blue[500]); // #006FEE

    console.log(semanticColors.dark); // #FFC107
    //console.log(semanticColors.light.primary.DEFAULT); // #006FEE

    return (
        <div>
            <p>song id: {params.id}</p>
            <AddSongToPlaylistBtn />

            <Button color="primary" className="bg-primary">
                some text
            </Button>
        </div>
    );
};
export default songPage;
