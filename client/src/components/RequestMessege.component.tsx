import { useSetRecoilState } from "recoil";
import selectedMessege from "../store/atoms/selectedReq.atom";
import { RequestType } from "../types/types";
import React from "react";


const RequestMessege = ({ messege }: { messege: RequestType }) => {
    const { url, method, time } = messege;
    const setSelectedMessegeIndex = useSetRecoilState(selectedMessege);

    const handleClick = () => {
        setSelectedMessegeIndex(messege);
    }


    return (
        <button type="button" className="hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start p-4 md:p-5  bg-gray-800 hover:bg-gray-900 focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 active w-full border border-gray-700 text-white" id="tabs-with-card-item-1" data-hs-tab="#tabs-with-card-1" aria-controls="tabs-with-card-1" role="tab" onClick={handleClick}>

            <div className={`inline-flex items-center py-1 px-3 rounded-full text-[0.65rem] font-medium text-white ${method === "GET" ? "bg-teal-500"
                : method === "POST" ? "bg-blue-500"
                    : method === "PUT" ? "bg-yellow-500"
                        : method === "DELETE" ? "bg-red-500"
                            : "bg-black"}`}>
                <span>
                    {method}
                </span>
            </div>

            <div className="inline-flex items-center py-1 px-3 ml-5 rounded-full text-[0.65rem] font-medium border border-gray-800 dark:border-gray-200 text-white">
                <span>
                    {time}
                </span>
            </div>
            <div className="flex mt-2">
                <span className="grow ms-1 font-semibold text-sm">
                    URL: &nbsp;
                    <span className="hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 text-gray-200">
                        {url}
                    </span>
                </span>
            </div>
        </button>
    )
}

export default RequestMessege;