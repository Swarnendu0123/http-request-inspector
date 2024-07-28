import { useRecoilState, useSetRecoilState } from "recoil";
import reqUrl from "../store/atoms/reqUlr.atom";
import { BACKEND_URL } from "../config";
import axios from 'axios';
import allMesseges from "../store/atoms/allMeggeges.atom";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import selectedMessege from "../store/atoms/selectedReq.atom";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "./auth/firebase.config";
import { use } from "marked";


const UrlGnerator = () => {
    const [url, setUrl] = useRecoilState(reqUrl);
    const setSelectedMessege = useSetRecoilState(selectedMessege);
    const setMesseges = useSetRecoilState(allMesseges);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [setUser]);

    const hanldeGnerate = async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/v1`, {
                name: user?.displayName,
                email: user?.email,
            });
            setUrl(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    // if user exist call handleRefresh in every 3 seconds
    useEffect(() => {
        if (user) {
            const interval = setInterval(() => {
                handleRefresh();
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [user]);

    const handleRefresh = async () => {
        const res = await axios.post(`${BACKEND_URL}/allreq`, {
            name: user?.displayName,
            email: user?.email,
        })
        if (res.data.length === 0) {
            toast.error('NO request found', {
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
            return;
        }
        setMesseges(res.data);
        setSelectedMessege(res.data[0])
    }

    useEffect(() => {
        if (user) {
            handleRefresh();
        }
    }, [user]);



    const handleCopy = () => {
        const copyText = url;
        navigator.clipboard.writeText(copyText);
        toast.success('URL copied to clipboard', {
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
    }

    return (
        <div className="flex items-center gap-6 mb-8">
            <div className="w-full py-3 px-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 sm:col-span-9 col-span-12 flex justify-between">
                {url}
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <button type="button" className="js-clipboard p-1 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border   shadow-sm  disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
                    onClick={handleCopy}>
                    <svg className="js-clipboard-default w-4 h-4 group-hover:rotate-6 transition" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg>
                </button>
            </div>

            <div className="sm:col-span-2 col-span-7">
                <Button onClick={hanldeGnerate}>Generate endpoint URL</Button>
            </div>
            <div className="sm:col-span-1 col-span-5">
                <Button onClick={handleRefresh}>Sync</Button>
            </div>
        </div>
    )
}

export default UrlGnerator;
