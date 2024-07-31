import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import allMesseges from "../store/atoms/allMeggeges.atom";
import RequestMessege from "./RequestMessege.component";
import { User } from "firebase/auth";
import { auth } from "./auth/firebase.config";


const RequestContainer = () => {
    const [user, setUser] = useState<User | null>(null);
    const messeges = useRecoilValue(allMesseges);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [setUser]);

    type Messege = {
        url: string;
        method: string;
        body: Request['body'];
        headers: Request['headers'];
        query: Request['query'];
        params: Request['params'];
        index: number;
        time: string;
    }

    return (
        <div className="hide-scroll sm:col-span-1 col-span-3  overflow-y-auto text-start max-h-[80vh]">
            {user ? messeges.map((item: Messege, index: number) => {
                return <RequestMessege key={index} messege={item} />
            })
                :
                <RequestMessege  messege={messeges[0]} />
            }
        </div>
    )
}

export default RequestContainer;