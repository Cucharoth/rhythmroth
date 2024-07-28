"use client";

import { useAppDispatch, useAppSelector } from "@/app/stores/store";
import Link from "next/link";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/navbar";
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
} from "@nextui-org/react";
import GoogleLogin from "./GoogleLogin";
import { useRouter } from "next/navigation";
import { resetSession } from "@/app/stores/sessionSlice";
import { resetPlaylist } from "@/app/stores/playlistSlice";
import SearchBar from "./SearchBar";
import logoImage from "@/app/assets/images/logo.png";

const NavbarComponent = () => {
    const router = useRouter();
    const user = useAppSelector((state) => state.session.user);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(resetPlaylist());
        dispatch(resetSession());
        router.push("/home");
    };

    return (
        <Navbar className="flex flex-row bg-primary-200 px-7" maxWidth="full">
            <NavbarBrand className="max-w-15">
                <Link href="/home">
                    <Image
                        src={logoImage.src}
                        width={50}
                        height={45}
                    >

                    </Image>
                </Link>
            </NavbarBrand>

            <NavbarContent
                className="hidden sm:flex flex-1 gap-4"
                justify="center"
            >
                <NavbarItem>
                    <SearchBar />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent as="div" justify="end">
                {user?.id == "" ? (
                    <GoogleLogin />
                ) : (
                    <>
                        <NavbarItem>
                            <h2>{user?.userName}</h2>
                        </NavbarItem>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="secondary"
                                    name="Jason Hughes"
                                    size="sm"
                                    src={user?.profileImg!}
                                />
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Profile Actions"
                                variant="flat"
                                className="text-primary-foreground"
                            >
                                <DropdownItem
                                    key="profile"
                                    className="h-14 gap-2"
                                >
                                    <p className="font-semibold">
                                        Signed in as
                                    </p>
                                    <p className="font-semibold">
                                        {user?.email}
                                    </p>
                                </DropdownItem>
                                <DropdownItem
                                    onPress={() => handleLogout()}
                                    key="logout"
                                    color="danger"
                                >
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
};

export default NavbarComponent;
