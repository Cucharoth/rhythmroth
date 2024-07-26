"use client";

import { useAppSelector } from "@/app/stores/store";
import { Song } from "@/app/types";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Autocomplete,
    AutocompleteItem,
    Avatar,
    Button,
    Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {
    const router = useRouter();
    const [fetchedSongs, setFetchedSongs] = useState(
        useAppSelector((state) => state.session.fetchedSongs)
    );

    const handleSelected = (id: React.Key | null) => {
        if (id) {
            router.push(`/home/song/${id}`);
        }
    };

    return (
        <Autocomplete
            onSelectionChange={handleSelected}
            classNames={{
                base: "max-w-xs",
                listboxWrapper: "max-h-[320px]",
                selectorButton: "text-default-500",
            }}
            defaultItems={fetchedSongs}
            inputProps={{
                classNames: {
                    input: "ml-1",
                    inputWrapper: "h-[48px]",
                },
            }}
            listboxProps={{
                hideSelectedIcon: true,
                itemClasses: {
                    base: [
                        "rounded-medium",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[hover=true]:bg-default-200",
                        "data-[selectable=true]:focus:bg-default-100",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                },
            }}
            aria-label="Select a song"
            placeholder="Search a Song"
            popoverProps={{
                offset: 10,
                classNames: {
                    base: "rounded-large",
                    content:
                        "p-1 border-small border-default-100 bg-background",
                },
            }}
            startContent={<FontAwesomeIcon icon={faSearch} />}
            radius="full"
            variant="bordered"
        >
            {(song) => (
                <AutocompleteItem
                    onPress={() => handleSelected(song.name)}
                    key={song.id}
                    textValue={song.name}
                >
                    <div className=" justify-start items-center">
                        <div className="flex gap-2 items-center whitespace-nowrap overflow-hidden text-ellipsis">
                            <Avatar
                                alt={song.name}
                                className="flex-shrink-0"
                                size="sm"
                                src={song.coverSrc}
                            />
                            <div className="flex flex-col whitespace-nowrap overflow-hidden text-ellipsis">
                                <span className="text-small ">{song.name}</span>

                                <span className="text-tiny text-default-400">
                                    {song.artist}
                                </span>
                            </div>
                        </div>
                    </div>
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
};

export default SearchBar;
