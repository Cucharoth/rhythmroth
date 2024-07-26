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

const RecentlyPlayedTable = (props: { recentlyPlayed: Song[] }) => {
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
        <div className="container">
            <Table
                removeWrapper
                hideHeader
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
                    emptyContent={"No rows to display."}
                    items={props.recentlyPlayed}
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
