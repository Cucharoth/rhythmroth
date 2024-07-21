import React from "react";
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
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const songPage = ({ params }) => {
    return (
        <div className="flex grow w-full justify-center items-center min-h-[590px]">
            {/* <p>song id: {params.id}</p>
            <AddSongToPlaylistBtn /> */}

            <Card
                className="border-none min-h-full bg-opacity-0"
                shadow="none"
                fullWidth
            >
                <CardHeader className="mx-10"></CardHeader>
                <CardBody>
                    <div className="grid grid-cols-4 md:grid-cols-12 p-10 items-center justify-center">
                        <div className=" flex justify-center items-center col-span-6 md:col-span-5">
                            <Image
                                isBlurred
                                isZoomed
                                src={
                                    "https://dl.dropbox.com/scl/fi/9mmz5b8eyh6son7a9l2l0/Offering-to-The-Sukhavati.jpg?rlkey=ybr6xwdcntf7l846163imk05r&st=666go1nt"
                                }
                                alt="cover image"
                                width={500}
                            ></Image>
                        </div>

                        <div className="flex flex-col col-span-6 md:col-span-7 bg-primary-200 bg-opacity-0  border-spacing-0 p-5 rounded-lg">
                            <div className="flex items-start">
                                <div className="flex grow flex-col gap-0">
                                    <h3 className="font-semibold text-foreground/100">
                                        SONG NAME
                                    </h3>
                                    <Divider className="my-1" />
                                    <p className="text-small text-foreground/80">
                                        ARTISTA
                                    </p>
                                    <h1 className="text-large font-medium mt-2">
                                        SOMETHING SOMETHING
                                    </h1>
                                </div>
                            </div>
                            <Divider className="my-2" />
                            <div className="flex flex-col mt-3 gap-1">
                                <div className="flex flex-row">
                                    <div className="mr-2">
                                        <AddSongToPlaylistBtn />
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
        </div>
    );
};
export default songPage;
