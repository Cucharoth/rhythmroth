"use client";

import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import {
    faCheck,
    faFloppyDisk,
    faMarker,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tooltip,
    useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Playlist } from "@/app/types";
import { updateUserPlaylist } from "@/app/stores/sessionSlice";
import playlist from "./Playlist";

const CreatePlaylist = () => {
    const dispatch = useAppDispatch();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isInvalid, setIsInvalid] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const userPlaylists = useAppSelector(
        (state) => state.session.user?.playlists!
    );
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
    const temporalPlaylist = useAppSelector((state) => state.playlist.playlist);
    const currentUser = useAppSelector((state) => state.session.user);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setIsInvalid(validateInput(input));
    };

    const validateInput = (input: string) => {
        if (input.length < 6) {
            setErrorMessage("¡The name must be at least 6 characters long!");
            return true;
        } else if (input.length > 25) {
            setErrorMessage(
                "¡The name must not be more than 25 characters long!"
            );
            return true;
        }
        const alreadyExists =
            userPlaylists.find(
                (playlist) => playlist.name.toLowerCase() == input.toLowerCase()
            ) != undefined;
        if (alreadyExists) {
            setErrorMessage("¡You have a Playlist with that name!");
            return true;
        }
        setInputValue(input);
        return false;
    };

    const handleSubmit = async () => {
        try {
            setIsBtnLoading(true);
            const playlistRequest: Playlist = {
                id: "",
                name: inputValue,
                songs: temporalPlaylist.songs,
            };
            const request = {
                userId: currentUser?.id,
                playlistRequest,
            };
            const response = await fetch(`/api/playlist/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            if (response.status == 201) {
                const newPlaylist: Playlist = await response.json();
                setInputValue("");
                setTimeout(() => {
                    onOpenChange();
                    dispatch(updateUserPlaylist(newPlaylist));
                }, 3000);
            } else {
                const errorMessage = await response.json();
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setTimeout(() => {
                setIsBtnLoading(false);
                setIsSaved(true);
            }, 300);
        }
    };

    return (
        <div>
            <Tooltip content="Save Playlist" className="text-white">
                <Button
                    size="sm"
                    className="bg-gradient-to-tr from-accent-300 via-primary-300 to-primary-200 text-background-950 border rounded-full"
                    onPress={onOpen}
                >
                    <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
                </Button>
            </Tooltip>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className="text-black"
                classNames={{
                    base: "bg-primary-200",
                    backdrop:
                        "bg-gradient-to-t from-background-900 to-zinc-900/10 backdrop-opacity-20",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Create Playlist</ModalHeader>
                            <ModalBody>
                                {!isSaved ? (
                                    <Input
                                        autoFocus
                                        isRequired
                                        onChange={handleInputChange}
                                        isInvalid={isInvalid}
                                        errorMessage={errorMessage}
                                        endContent={
                                            <FontAwesomeIcon icon={faMarker} />
                                        }
                                        onKeyUp={(e) => {
                                            if (
                                                e.key === "Enter" &&
                                                !isInvalid
                                            ) {
                                                handleSubmit();
                                            }
                                        }}
                                        placeholder="Insert a Playlist Name"
                                        variant="underlined"
                                        color="primary"
                                        classNames={{
                                            label: "text-primary-200",
                                            input: [
                                                "bg-transparent",
                                                "text-black",
                                                "placeholder:text-black",
                                            ],
                                        }}
                                    />
                                ) : (
                                    <Input
                                        readOnly
                                        autoFocus
                                        placeholder="¡Playlist successfully saved!"
                                        value={inputValue}
                                        className="text-success"
                                        color="primary"
                                        endContent={
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                size="lg"
                                            />
                                        }
                                        variant="underlined"
                                        classNames={{
                                            input: [
                                                "bg-transparent",
                                                "text-black",
                                                "placeholder:text-black",
                                            ],
                                        }}
                                    />
                                )}
                            </ModalBody>
                            <ModalFooter className="">
                                {!isSaved ? (
                                    <div className="flex grow justify-between">
                                        <Button
                                            isDisabled={isInvalid}
                                            onPress={handleSubmit}
                                            isLoading={isBtnLoading}
                                            className="bg-gradient-to-tr from-accent-300 via-primary-300 to-primary-200 text-background-950 border-primary-400 border rounded-full shadow-md"
                                        >
                                            Create
                                        </Button>
                                        <Button
                                            onPress={onClose}
                                            className="bg-gradient-to-tr from-accent-300 via-primary-300 to-primary-200 text-background-950 border-primary-400 border rounded-full shadow-md"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <Button
                                            className="bg-gradient-to-tr from-accent-300 via-primary-300 to-primary-200 text-background-950 border-primary-400 border rounded-full shadow-md"
                                            onPress={onClose}
                                        >
                                            Volver
                                        </Button>
                                    </div>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CreatePlaylist;
