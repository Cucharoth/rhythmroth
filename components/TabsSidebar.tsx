"use client";

import { setIsOpen } from "@/app/stores/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import { faArrowLeft, faHome, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const TabsSidebar = () => {
    const router = useRouter();
    const currentUser = useAppSelector((state) => state.session.user);
    const dispatch = useAppDispatch();

    return (
        <div
            className={`flex max-h-12 z-50 bg-primary-200 bg-opacity-60 justify-center md:bg-opacity-0 md:max-h-none md:justify-start md:flex-col xl:flex xl:visible md:basis-[12%] w-full transition-all md:sticky left-0 md:p-3 border-r border-gray-300
            }`}
        >
            <div className="flex md:flex-col">
                <Button
                    onPress={() => router.push("/home")}
                    className="flex md:my-2 justify-start bg-opacity-0 hover:bg-primary-200 hover:bg-opacity-50"
                >
                    <div className="max-w-4 min-w-4 text-background-950">
                        <FontAwesomeIcon icon={faHome} />
                    </div>
                    <Divider orientation="vertical" className="bg-black" />
                    <h2 className="basis-[5/6] mt-[4px] font-semibold text-background-950">
                        HOME
                    </h2>
                </Button>
                {currentUser?.id != "" && (
                    <Button
                        onPress={() => router.push("/home/playlist")}
                        className="md:my-1 justify-start bg-opacity-0 hover:bg-primary-200 hover:bg-opacity-50"
                    >
                        <div className="max-w-4 min-w-4 mt-[2px] text-background-950">
                            <FontAwesomeIcon icon={faList} />
                        </div>
                        <Divider orientation="vertical" className="bg-black" />
                        <h2 className="basis-[5/6] mt-[1.5px] font-semibold text-background-950">
                            PLAYLIST
                        </h2>
                    </Button>
                )}
                <div className="flex md:hidden items-center justify-end">
                    <Button
                        isIconOnly
                        size="sm"
                        className="min-h-[36px] px-2 mx-2 bg-gradient-to-tr from-accent-300 via-primary-300 to-primary-200 text-background-950 border rounded-full shadow-md"
                        onPress={() => dispatch(setIsOpen(true))}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} size="xl" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TabsSidebar;
