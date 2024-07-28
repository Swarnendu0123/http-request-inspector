import { signOut, User } from "firebase/auth";
import { auth } from "./auth/firebase.config";
import { Bounce, toast } from "react-toastify";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react";


const Profile = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [setUser]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            toast.success('Successfully logged out', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {user && (
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex gap-4 cursor-pointer">
                                <Avatar>
                                    <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? 'User'} />
                                    <AvatarFallback>
                                        <div className="size-[46px] bg-gray-900 rounded-full overflow-hidden cursor-pointer">
                                            <svg className="size-full text-gray-700" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white" />
                                                <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor" />
                                                <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex items-center">
                                    <p>{user.displayName}</p>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-4">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <div className="mt-2 border-t py-2">
                                <DropdownMenuItem>
                                    <span className="">{user.email}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>History</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Saved Domains</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>How to use</span>
                                </DropdownMenuItem>
                                <Button className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-center font-semibold" onClick={handleLogout}>
                                    Log Out
                                </Button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </>
    );
}


export default Profile;