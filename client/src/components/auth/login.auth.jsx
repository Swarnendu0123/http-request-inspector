import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";
import { auth } from "./firebase.config";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useRecoilState } from "recoil";
import { userAtom } from "../../store/atoms/user.atom";
import { Bounce, toast } from "react-toastify";
import Profile from "../Profile.component";

const provider = new GithubAuthProvider();

const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = useState('opaque');
    const [user, setUser] = useRecoilState(userAtom);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                GithubAuthProvider.credentialFromResult(result);
                const user = result.user;
                setUser(user);
                console.log(user);
                onClose(); // Moved onClose here
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
                console.log(error);
            });
    }



    const handleOpen = (backdrop) => {
        setBackdrop(backdrop);
        onOpen();
    }

    return (
        <>
            <div className="flex flex-wrap gap-3 ml-4 mr-4">

                {user ?
                    <Profile />
                    :
                    <Button
                        key="blur"
                        variant="flat"
                        color="warning"
                        onPress={() => handleOpen("blur")}
                    >
                        <span className="inline-block size-[46px] bg-gray-900 rounded-full overflow-hidden">
                            <svg className="size-full text-gray-700" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white" />
                                <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor" />
                                <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor" />
                            </svg>
                        </span>
                    </Button>
                }


            </div>
            <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose} className="py-3 px-4  items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-900 text-white  sm:col-span-9 col-span-12 flex justify-between">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Authentication</ModalHeader>
                            <ModalBody>

                                <p>
                                    Authenticate your github account to get started
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                {!user &&
                                    <Button color="primary" onPress={handleLogin} className="py-3 px-4 inline-flex items-center gap-x- text-sm font-semibold rounded-lg border border-transparent bg-white text-black hover:bg-gray-100">
                                        <FaGithub className="mr-3 w-7 h-7" />   Authenticate
                                    </Button>}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default Login;
