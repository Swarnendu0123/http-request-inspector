// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user.atom";
import { signOut } from "firebase/auth";
import { auth } from "./auth/firebase.config";
import { Bounce, toast } from "react-toastify";
import React from "react";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Profile = () => {
    const [user, setUser] = useRecoilState(userAtom);
    console.log(user);
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
        <div className="flex items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="flex gap-4 cursor-pointer">
                        <div>
                            <Avatar src={user.photoURL} alt={user.displayName} />
                        </div>
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
            {/* <Dropdown placement="bottom-end">
            </Dropdown>
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <div className="flex gap-4 cursor-pointer">
                        <div>
                            <Avatar src={user.photoURL} alt={user.displayName} />
                        </div>
                        <div className="flex items-center">
                            <p>{user.displayName}</p>
                        </div>
                    </div>
                    
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat" className="py-3 px-4  items-center gap-x-2 text-sm rounded-lg border border-transparent  text-white bg-gray-900 sm:col-span-9 col-span-12 flex justify-between">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">Signed in as</p>
                        <p className="font-bold">{user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">
                        History
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
            </Dropdown> */}
        </div>
    );
}


export default Profile;

// import {
//     Cloud,
//     CreditCard,
//     Github,
//     Keyboard,
//     LifeBuoy,
//     LogOut,
//     Mail,
//     MessageSquare,
//     Plus,
//     PlusCircle,
//     Settings,
//     User,
//     UserPlus,
//     Users,
//   } from "lucide-react"
  
//   import { Button } from "@/components/ui/button"
//   import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuPortal,
//     DropdownMenuSeparator,
//     DropdownMenuShortcut,
//     DropdownMenuSub,
//     DropdownMenuSubContent,
//     DropdownMenuSubTrigger,
//     DropdownMenuTrigger,
//   } from "@/components/ui/dropdown-menu"
  
//   export function DropdownMenuDemo() {
//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline">Open</Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56">
//           <DropdownMenuLabel>My Account</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuGroup>
            // <DropdownMenuItem>
            //   <User className="mr-2 h-4 w-4" />
            //   <span>Profile</span>
            //   <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            // </DropdownMenuItem>
//             <DropdownMenuItem>
//               <CreditCard className="mr-2 h-4 w-4" />
//               <span>Billing</span>
//               <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <Settings className="mr-2 h-4 w-4" />
//               <span>Settings</span>
//               <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <Keyboard className="mr-2 h-4 w-4" />
//               <span>Keyboard shortcuts</span>
//               <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
//             </DropdownMenuItem>
//           </DropdownMenuGroup>
//           <DropdownMenuSeparator />
//           <DropdownMenuGroup>
//             <DropdownMenuItem>
//               <Users className="mr-2 h-4 w-4" />
//               <span>Team</span>
//             </DropdownMenuItem>
//             <DropdownMenuSub>
//               <DropdownMenuSubTrigger>
//                 <UserPlus className="mr-2 h-4 w-4" />
//                 <span>Invite users</span>
//               </DropdownMenuSubTrigger>
//               <DropdownMenuPortal>
//                 <DropdownMenuSubContent>
//                   <DropdownMenuItem>
//                     <Mail className="mr-2 h-4 w-4" />
//                     <span>Email</span>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <MessageSquare className="mr-2 h-4 w-4" />
//                     <span>Message</span>
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem>
//                     <PlusCircle className="mr-2 h-4 w-4" />
//                     <span>More...</span>
//                   </DropdownMenuItem>
//                 </DropdownMenuSubContent>
//               </DropdownMenuPortal>
//             </DropdownMenuSub>
//             <DropdownMenuItem>
//               <Plus className="mr-2 h-4 w-4" />
//               <span>New Team</span>
//               <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
//             </DropdownMenuItem>
//           </DropdownMenuGroup>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>
//             <Github className="mr-2 h-4 w-4" />
//             <span>GitHub</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <LifeBuoy className="mr-2 h-4 w-4" />
//             <span>Support</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem disabled>
//             <Cloud className="mr-2 h-4 w-4" />
//             <span>API</span>
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>
//             <LogOut className="mr-2 h-4 w-4" />
//             <span>Log out</span>
//             <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     )
//   }
  
