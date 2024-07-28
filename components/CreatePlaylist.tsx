"use client";

import { useAppSelector } from "@/app/stores/store";
import { faFloppyDisk, faMarker } from "@fortawesome/free-solid-svg-icons";
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

const CreatePlaylist = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isInvalid, setIsInvalid] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const userPlaylists = useAppSelector(
        (state) => state.session.userPlaylists
    );
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
    const temporalPlaylist = useAppSelector((state) => state.playlist.playlist);

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
            userPlaylists.find((playlist) => playlist.name == input) !=
            undefined;
        if (alreadyExists) {
            setErrorMessage("¡You have a Playlist with that name!");
            return true;
        }
        setInputValue(input);
        return false;
    };

    const handleSubmit = () => {
        const newPlaylist: Playlist = {
            id: "",
            name: inputValue,
            songs: temporalPlaylist.songs
        }

        fetch(`/api/playlist/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPlaylist),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setIsBtnLoading(false);
            })
            .catch((error) => console.error(error));
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
                                <Input
                                    autoFocus
                                    isRequired
                                    onChange={handleInputChange}
                                    isInvalid={isInvalid}
                                    errorMessage={errorMessage}
                                    endContent={
                                        <FontAwesomeIcon icon={faMarker} />
                                    }
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
                                ></Input>
                            </ModalBody>
                            <ModalFooter className="">
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
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CreatePlaylist;
