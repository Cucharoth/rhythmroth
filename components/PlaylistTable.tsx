import { Playlist, Song } from "@/app/types";
import {
    Table,
    TableBody,
    TableColumn,
    TableHeader,
    Image,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

const PlaylistTable = (props: { playlists: Playlist[] }) => {
    const router = useRouter();

    const handleRowCLick = (playlist: Playlist) => {
        router.push(`/home/playlist/${playlist.id}`);
    };

    const renderCell = React.useCallback(
        (playlist: Playlist, columnKey: string | number) => {
            const cellValue = playlist[columnKey];

            switch (columnKey) {
                case "coverSrc":
                    return (
                        <Image
                            className="min-w-[45px]"
                            src={
                                playlist.songs![playlist.songs!.length - 1]
                                    .coverSrc
                            }
                            width={50}
                            height={45}
                        ></Image>
                    );
                case "songs":
                    return <p>{playlist.songs?.length}</p>;
                default:
                    return cellValue;
            }
        },
        []
    );

    return (
        <div className="container border-l-8 bg-black rounded border-primary-200 bg-opacity-20 shadow-md shadow-background-400 decoration-background-200 backdrop-blur-sm">
            <Table
                removeWrapper
                classNames={{
                    th: "bg-transparent rounded border-b h-6 text-primary-foreground",
                    emptyWrapper: "text-black",
                    tbody: "rounded",
                    tr: [],
                    td: "",
                    wrapper: "bg-opacity-0",
                    base: [""],
                }}
                selectionMode="single"
                aria-label="recently played table"
            >
                <TableHeader>
                    <TableColumn key={"coverSrc"}>COVER</TableColumn>
                    <TableColumn key={"name"}>NAME</TableColumn>
                    <TableColumn key={"songs"}>SONGS</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={"Select a Playlist."}
                    items={props.playlists}
                >
                    {(playlist) => (
                        <TableRow
                            key={playlist.id}
                            className="cursor-pointer"
                            onClick={() => handleRowCLick(playlist)}
                        >
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(playlist, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default PlaylistTable;
