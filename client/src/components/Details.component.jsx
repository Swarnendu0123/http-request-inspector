import { useRecoilValue } from "recoil";
import selectedMessege from "../store/atoms/selectedRed.atom";
const Details = ({ messeges }) => {
    const messegesIndex = useRecoilValue(selectedMessege);
    const messege = messeges[messegesIndex];
    const { url, method, body, headers, params, query, index, time } = messege;

    return (
        <div className="grid gap-4 grid-cols-2 max-h-[70vh] overflow-y-auto border border-gray-200">
            <div className="col-span-2 mt-2">
                <div className="col-span-2 bg-black text-white mb-2">
                    {time}
                </div>
                {method == 'GET' && <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-500 text-white">
                    {method}
                </span>}
                {method == 'POST' && <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-500 text-white">
                    {method}
                </span>}
                {method == 'PUT' && <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-500 text-white">
                    {method}
                </span>}
                {method == 'DELETE' && <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white">
                    {method}
                </span>}
                {method == 'PATCH' && <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-black text-white">
                    {method}
                </span>}

            </div>
            <div className="col-span-2">
                {url}
            </div>
            <div className="col-span-2 bg-black text-white">Request Quary</div>
            {
                Object.keys(query).map((key, index) => {
                    return (
                        <div key={index} className="grid grid-cols-2 col-span-2 border border-grey-200 hover:bg-gray-200">
                            <div className="col-span-1">
                                {key}
                            </div>
                            <div className="col-span-1">
                                {query[key]}
                            </div>
                        </div>
                    )
                })
            }
            <div className="col-span-2 bg-black text-white">Request Body</div>
            {
                Object.keys(body).map((key, index) => {
                    return (
                        <div key={index} className="grid grid-cols-2 col-span-2 border border-green-200 hover:bg-gray-200">
                            <div className="col-span-1">
                                {key}
                            </div>
                            <div className="col-span-1">
                                {body[key]}
                            </div>
                        </div>
                    )
                })
            }
            <div className="col-span-2 bg-black text-white">Request Headers</div>
            {
                Object.keys(headers).map((key, index) => {
                    return (
                        <div key={index} className="grid grid-cols-2 col-span-2 border border-green-200 hover:bg-gray-200">
                            <div className="col-span-1">
                                {key}
                            </div>
                            <div className="col-span-1">
                                {headers[key]}
                            </div>
                        </div>
                    )
                })
            }
            <div className="col-span-2 bg-black text-white">Request Params</div>
            {
                Object.keys(params).map((key, index) => {
                    return (
                        <div key={index} className="grid grid-cols-2 col-span-2 border border-green-200 hover:bg-gray-200">
                            <div className="col-span-1">
                                {key}
                            </div>
                            <div className="col-span-1">
                                {params[key]}
                            </div>
                        </div>
                    )
                })
            }
           

        </div>
    )
}

export default Details;