"use client";

import { useAppSelector } from "@/app/stores/store";
import { faHome, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const TabsSidebar = () => {
    const router = useRouter();
    const currentUser = useAppSelector((state) => state.session.user);

    return (
        <div
            className={`flex-col hidden xl:flex xl:visible basis-[12%] w-full transition-all sticky left-0 p-3 border-r border-gray-300
            }`}
        >
            <div className="flex flex-col">
                <Button
                    onPress={() => router.push("/home")}
                    className="flex my-2 justify-start bg-opacity-0 hover:bg-accent-200 hover:bg-opacity-50"
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
                        className="my-1 justify-start bg-opacity-0 hover:bg-accent-200 hover:bg-opacity-50"
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
            </div>
        </div>
    );
};

export default TabsSidebar;
