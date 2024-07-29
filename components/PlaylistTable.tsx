import { Song } from "@/app/types";
import { Table, TableBody, TableColumn, TableHeader } from "@nextui-org/react";
import React from "react";

const PlaylistTable = (props { songs: Song[]}) => {
    return (
        <div>
            <Table aria-label="Example empty table">
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>SONGS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
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

export default PlaylistTable;
