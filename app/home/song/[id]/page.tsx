"use client";

import React, { useEffect, useState } from "react";
import AddSongToPlaylistBtn from "@/components/song/AddSongToPlaylistBtn";
import { commonColors, semanticColors } from "@nextui-org/theme";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
} from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { faList, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { Song } from "@/app/types";
import { useAppSelector } from "@/app/stores/store";
import Loading from "@/components/Loading";

const songPage = ({ params } : {params: { id: number}}) => {
    const router = useRouter();
    const fetchedSongs = useAppSelector((state) => state.session.fetchedSongs);
    const [currentSong, setCurrentSong] = useState<Song>();
    const [isLoading, setIsLoading] = useState(true);
    const song = fetchedSongs.find((song) => song.id == params.id)

    // fetches song if the store happens to be empty or is not found in the store.
    useEffect(() => {
        if (fetchedSongs.length == 0 || song == undefined) {
            fetch(`/api/song/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setCurrentSong(data);
                    setIsLoading(false);
                })
                .catch((error) => console.error(error));
        } else {
            setCurrentSong(song);
            setTimeout(() => setIsLoading(false), 300);
        }
    }, []);

    return (
        <div className="flex grow w-full justify-center items-center min-h-[590px]">
            {isLoading ? (
                <Loading />
            ) : (
                <Card
                    className="border-none min-h-full bg-opacity-0"
                    shadow="none"
                    fullWidth
                >
                    <CardHeader className="mx-10">
                        <Button
                            variant="faded"
                            className="rounded-full bg-primary-200 text-black"
                            onPress={() => router.back()}
                        >
                            <FontAwesomeIcon icon={faReply} size="xl" />
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <div className="grid grid-cols-4 md:grid-cols-12 p-10 items-center justify-center">
                            <div className=" flex justify-center items-center col-span-6 md:col-span-5">
                                <Image
                                    isBlurred
                                    src={currentSong?.coverSrc}
                                    alt="cover image"
                                    className="z-10"
                                    width={500}
                                ></Image>
                            </div>

                            <div className="flex flex-col col-span-6 md:col-span-7 bg-primary-200 bg-opacity-0  border-spacing-0 p-5 rounded-lg">
                                <div className="flex items-start">
                                    <div className="flex grow flex-col gap-0">
                                        <h2 className="font-semibold text-large text-foreground/100">
                                            {currentSong?.name}
                                        </h2>
                                        <Divider className="my-1" />
                                        <p className="text-small text-foreground/80">
                                            {currentSong?.duration}
                                        </p>
                                        <h3 className="text-small font-medium mt-2">
                                            {currentSong?.artist}
                                        </h3>
                                    </div>
                                </div>
                                <Divider className="my-2" />
                                <div className="flex flex-col mt-3 gap-1">
                                    <div className="flex flex-row">
                                        <div className="mr-2">
                                            <AddSongToPlaylistBtn song={currentSong!} />
                                        </div>

                                        <Button
                                            className="bg-gradient-to-tr from-bg-accent-300 via-primary-300 to-primary-200 text-background-950 border rounded-full"
                                            variant="shadow"
                                        >
                                            <p className="mt-0.4">save</p>
                                            <FontAwesomeIcon icon={faList} />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-center"></div>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter></CardFooter>
                </Card>
            )}
        </div>
    );
};
export default songPage;
