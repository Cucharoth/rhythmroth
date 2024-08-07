"use client";

import { setUserPlaylist } from "@/app/stores/sessionSlice";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import { Playlist } from "@/app/types";
import ChangePlaylist from "@/components/ChangePlaylist";
import DeletePlaylist from "@/components/DeletePlaylist";
import SongsTable from "@/components/SongsTable";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const PlaylistPage = ({ params }: { params: { playlist: string } }) => {
    const [currentUserPlaylists, setCurrentUserPlaylists] = useState<
        Playlist[]
    >(useAppSelector((state) => state.session.user?.playlists!));
    const currentUser = useAppSelector((state) => state.session.user!);
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>();
    const dispatch = useAppDispatch();
    const userPlaylists = useAppSelector(
        (state) => state.session.user?.playlists
    );
    const [inputValue, setInputValue] = useState<string>("");
    const isPlaylistOpen = useAppSelector((state) => state.playlist.isOpen);

    useEffect(() => {
        if (currentUser.id != "") {
            const fetchPlaylists = async () => {
                try {
                    const response = await fetch(
                        `/api/playlist/user-id/${currentUser.id}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (response.status == 200) {
                        const newUserPlaylists: Playlist[] =
                            await response.json();
                        if (newUserPlaylists.length > 0) {
                            dispatch(setUserPlaylist(newUserPlaylists));
                            setCurrentUserPlaylists(newUserPlaylists);
                        }
                    } else {
                        const errorMessage = await response.json();
                        throw new Error(errorMessage);
                    }
                } catch (error: any) {
                    console.error(error.message);
                }
            };
            fetchPlaylists();
        }
    }, []);

    const handleSelected = (playlistId: React.Key | null) => {
        const currentPlaylist = currentUserPlaylists.find(
            (playlist) => playlist.id == playlistId
        );
        setSelectedPlaylist(currentPlaylist);
    };

    // keeps currentUserPlaylists updated
    useEffect(() => {
        if (!params.playlist[1] && currentUser.id != '') {
            setCurrentUserPlaylists(userPlaylists!);
            setSelectedPlaylist(userPlaylists![0]);
            setInputValue(userPlaylists![0].name);
        }
    }, [userPlaylists]);

    // handles the redirect from /home
    useEffect(() => {
        if (params.playlist) {
            // handle params as an array since is 'catch-all'
            const newSelectedPlaylist = userPlaylists?.find(
                (playlist) => playlist.id == params.playlist[1]
            )!;
            if (newSelectedPlaylist) {
                setSelectedPlaylist(newSelectedPlaylist);
                setInputValue(newSelectedPlaylist.name);
            }
        }
    }, []);

    return (
        <div className={`${isPlaylistOpen && 'blur-sm md:blur-none'}`}>
            <div className="flex justify-start mb-5">
                <div>
                    <Autocomplete
                        onSelectionChange={handleSelected}
                        defaultInputValue={inputValue}
                        classNames={{
                            base: "text-black max-w-xs",
                            listboxWrapper: "max-h-[320px]",
                            selectorButton: "text-default-500",
                        }}
                        items={currentUserPlaylists}
                        inputProps={{
                            classNames: {
                                input: "ml-1 placeholder:text-black",
                                inputWrapper: "h-[48px]",
                                label: "text-primary",
                            },
                        }}
                        listboxProps={{
                            hideSelectedIcon: true,
                            itemClasses: {
                                base: [
                                    "rounded-medium",
                                    "text-black",
                                    "transition-opacity",
                                    "data-[hover=true]:text-black",
                                    "dark:data-[hover=true]:bg-default-50",
                                    "data-[pressed=true]:opacity-70",
                                    "data-[hover=true]:bg-accent-300",
                                    "data-[hover=true]:bg-opacity-50",
                                    "data-[selectable=true]:focus:bg-default-100",
                                    "data-[focus-visible=true]:ring-default-500",
                                ],
                            },
                        }}
                        aria-label="Select a Playlist"
                        placeholder="Search a Playlist"
                        popoverProps={{
                            offset: 10,
                            classNames: {
                                base: "rounded-large",
                                content:
                                    "p-1 border-small border-default-100 bg-primary-200",
                            },
                        }}
                        startContent={<FontAwesomeIcon icon={faList} />}
                        radius="full"
                        color="default"
                        variant="underlined"
                    >
                        {(playlist) => (
                            <AutocompleteItem
                                key={playlist.id}
                                textValue={playlist.name}
                            >
                                {playlist.songs &&
                                    playlist.songs.length > 0 && (
                                        <div className=" justify-start items-center">
                                            <div className="flex gap-2 items-center whitespace-nowrap overflow-hidden text-ellipsis">
                                                <Avatar
                                                    alt={playlist.name}
                                                    className="flex-shrink-0"
                                                    size="sm"
                                                    src={
                                                        playlist.songs[
                                                            playlist.songs
                                                                .length - 1
                                                        ].coverSrc
                                                    }
                                                />
                                                <div className="flex flex-col whitespace-nowrap overflow-hidden text-ellipsis">
                                                    <span className="text-small ">
                                                        {playlist.name}
                                                    </span>

                                                    <span className="text-tiny text-default-400">
                                                        current songs:{" "}
                                                        {playlist.songs?.length}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>
                </div>
                <div className="flex grow justify-between items-center ml-1 md:ml-10 transition-all">
                    {selectedPlaylist?.songs &&
                        selectedPlaylist.songs.length > 0 && (
                            <>
                                <div className="mr-2">
                                    <ChangePlaylist
                                        playlist={selectedPlaylist}
                                    />
                                </div>
                                <DeletePlaylist playlist={selectedPlaylist} />
                            </>
                        )}
                </div>
            </div>
            <div className="min-h-[30px] mb-3 border-b">
                {selectedPlaylist?.name}
            </div>
            {selectedPlaylist?.songs && selectedPlaylist.songs.length > 0 && (
                <SongsTable songs={selectedPlaylist?.songs} />
            )}
        </div>
    );
};

export default PlaylistPage;
