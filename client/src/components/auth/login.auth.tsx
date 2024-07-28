import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { auth } from "./firebase.config";
import { GithubAuthProvider, signInWithPopup, User } from "firebase/auth";
import { Bounce, toast } from "react-toastify";
import Profile from "../Profile.component";
import { Button } from "@/components/ui/button"

const provider = new GithubAuthProvider();

const Login = () => {
    const [userState, setUserState] = useState<User | null>(null);
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUserState(user);
        });

        return () => unsubscribe();
    }, [setUserState]);

    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                GithubAuthProvider.credentialFromResult(result);
                const user = result.user as User;
                setUserState(user);
                setModal(false);
                toast.success('Successfully logged in', {
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
            })
            .catch((error) => {
                console.error(error);
                toast.error('Unsuccessful login attempt', {
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
            });
    };


    return (
        <>
            <div className="flex flex-wrap gap-3 ml-4 mr-4">

                {userState ?
                    <Profile /> :
                    <div className="flex flex-wrap gap-3">
                        <div
                            onClick={toggleModal}
                            className="capitalize"
                        >
                            <div className="size-[46px] bg-gray-900 rounded-full overflow-hidden cursor-pointer">
                                <svg className="size-full text-gray-700" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white" />
                                    <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor" />
                                    <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </div>
                }

            </div>
            {modal && (
                <div onClick={toggleModal} className="absolute top-0 left-0 min-h-screen min-w-full bg-[#0000009f] z-[2] flex justify-center items-center">
                    <div className="w-fit bg-gray-900 p-6 rounded-xl border-2 border-[#FFFFFF59]">
                        <h3 className="font-bold text-2xl mb-3">Authentication</h3>
                        <p>
                            Authenticate your github account to get started
                        </p>
                        <Button className="mt-4" onClick={handleLogin}>
                            <FaGithub className="mr-3 w-7 h-7" /> Authenticate
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
