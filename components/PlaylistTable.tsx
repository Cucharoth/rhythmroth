import { Table, TableBody, TableColumn, TableHeader } from "@nextui-org/react";
import React from "react";

const PlaylistTable = () => {
    return (
        <div>
            <Table aria-label="Example empty table">
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>SONGS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            </Table>
        </div>
    );
};

export default PlaylistTable;
