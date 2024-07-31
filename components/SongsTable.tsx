"use client";

import { Song } from "@/app/types";
import {
    getKeyValue,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Image,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RecentlyPlayedTable = (props: { songs: Song[] }) => {
    const router = useRouter();

    const handleRowCLick = (song: Song) => {
        router.push(`/home/song/${song.id}`)
    };

    const renderCell = React.useCallback(
        (song: Song, columnKey: string | number) => {
            const cellValue = song[columnKey];

            switch (columnKey) {
                case "coverSrc":
                    return (
                        <Image
                            className="min-w-[45px]"
                            src={song.coverSrc}
                            width={50}
                            height={45}
                        ></Image>
                    );
                default:
                    return cellValue;
            }
        },
        []
    );

    return (
        <div className="container border-l-8 bg-black rounded border-primary-200 bg-opacity-20 shadow-md shadow-background-400 decoration-background-200 backdrop-blur-sm overflow-auto">
            <Table
                removeWrapper
                classNames={
                    {
                        th: "bg-transparent rounded border-b h-6 text-primary-foreground",
                        emptyWrapper: "text-black",
                        tbody: "rounded",
                        tr: [],
                        td: "",
                        wrapper: "bg-opacity-0",
                        base: [""]
                    }
                }
                selectionMode="single"
                aria-label="recently played table"
                
            >
                <TableHeader>
                    <TableColumn key={"coverSrc"}>COVER</TableColumn>
                    <TableColumn key={"name"}>NAME</TableColumn>
                    <TableColumn key={"duration"}>DURATION</TableColumn>
                    <TableColumn key={"artist"}>ARTIST</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={"Select a Playlist."}
                    items={props.songs}
                >
                    {(song) => (
                        <TableRow
                            key={song.id}
                            className="cursor-pointer"
                            onClick={() => handleRowCLick(song)}
                            
                        >
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(song, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default RecentlyPlayedTable;
