import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user.atom";
import { signOut } from "firebase/auth";
import { auth } from "./auth/firebase.config";
import { Bounce, toast } from "react-toastify";

const Profile = () => {
    const [user, setUser] = useRecoilState(userAtom);

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
    };

    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-end">
            </Dropdown>
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <User
                        as="button"
                        avatarProps={{
                            isBordered: true,
                            src: user.photoURL,
                            alt: user.displayName
                        }}
                        className="transition-transform"
                        description={user.email}
                        name={user.displayName}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat" className="py-3 px-4  items-center gap-x-2 text-sm rounded-lg border border-transparent  text-white bg-gray-900 sm:col-span-9 col-span-12 flex justify-between">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">Signed in as</p>
                        <p className="font-bold">{user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">
                        My History
                    </DropdownItem>
                    <DropdownItem key="analytics">
                        Saved Domains
                    </DropdownItem>
                    <DropdownItem key="configurations">
                        How to use
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" className="bg-red-600 rounded-lg text-center font-semibold" onClick={handleLogout}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}


export default Profile;