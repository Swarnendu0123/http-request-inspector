import { useRecoilValue } from "recoil";
import allMesseges from "../store/atoms/allMeggeges.atom";
import RequestMessege from "./RequestMessege.component";
import React from "react";


const RequestContainer = () => {
    const messeges = useRecoilValue(allMesseges);
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
        <div className="hide-scroll sm:col-span-1 col-span-3  overflow-y-auto text-start max-h-[74vh]">
            {
                messeges.map((item: Messege, index: number) => {
                    return <RequestMessege key={index} messege={item} />
                })
            }
        </div>
    )
}

export default RequestContainer;