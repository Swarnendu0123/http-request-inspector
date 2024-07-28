import { useRecoilValue } from "recoil";
import selectedMessege from "../store/atoms/selectedReq.atom";
import { useState } from "react";

import { JSONTree } from 'react-json-tree';



const TableView = () => {
    const messege = useRecoilValue(selectedMessege);

    const { url, method, body, headers, params, query, time } = messege;

    return (
        <div className="hide-scroll grid gap-4 overflow-y-auto border border-gray-700 bg-gray-800 text-white text-center">
            <div className="col-span-2 mt-2">
                <div className="col-span-2 bg-gray-800 text-white mb-2">
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
                {method == 'PATCH' && <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-800 text-white">
                    {method}
                </span>}

            </div>
            <div className="col-span-2">
                {url}
            </div>
            <div className="col-span-2 text-white font-bold text-xl">Request Params</div>
            {
                Object.keys(params).map((key, index) => {
                    return (
                        <div key={index} className="grid grid-cols-2 col-span-2 border border-gray-700 hover:bg-gray-900">
                            <div className="col-span-1 font-bold">
                                {key}
                            </div>
                            <div className="col-span-1">
                                {params[key]}
                            </div>
                        </div>
                    )
                })
            }
            <div className="col-span-2 text-white font-bold text-xl">Request Query</div>
            {
                Object.keys(query).map((key, index) => {
                    return (
                        <div key={index} className="grid grid-cols-2 col-span-2 border border-gray-700 hover:bg-gray-900">
                            <div className="col-span-1 font-bold">
                                {key}
                            </div>
                            <div className="col-span-1">
                                {query[key]}
                            </div>
                        </div>
                    )
                })
            }
            <div className="col-span-2 text-white font-bold text-xl">Request Body</div>
            {
                Object.keys(body).map((key, index) => {
                    return (
                        <div key={index} className="grid grid-cols-2 col-span-2 border border-gray-700 hover:bg-gray-900">
                            <div className="col-span-1 font-bold">
                                {key}
                            </div>
                            <div className="col-span-1">
                                {body[key]}
                            </div>
                        </div>
                    )
                })
            }
            <div className="col-span-2 text-white font-bold text-xl">Request Headers</div>
            {
                Object.keys(headers).map((key, index) => {
                    return (
                        <div key={index} className="grid grid-cols-2 col-span-2 border border-gray-700 hover:bg-gray-900">
                            <div className="col-span-1 font-bold">
                                {key}
                            </div>
                            <div className="col-span-1 break-words">
                                {headers[key]}
                            </div>
                        </div>
                    )
                })
            }



        </div>
    )
}


const RequestDetails = () => {
    const messege = useRecoilValue(selectedMessege);
    const [view, setView] = useState('json');

    const { url, method, body, headers, params, query, time } = messege;
    const json = {
        url: url,
        method: method,
        body: body,
        headers: headers,
        params: params,
        query: query,
        time: time
    };

    const theme = {
        valueLabel: {
            textDecoration: 'underline',
        },
        scheme: 'monokai',
        author: 'wimer hazenberg (http://www.monokai.nl)',
        base00: '#272822',
        base01: '#383830',
        base02: '#49483e',
        base03: '#75715e',
        base04: '#a59f85',
        base05: '#f8f8f2',
        base06: '#f5f4f1',
        base07: '#f9f8f5',
        base08: '#f92672',
        base09: '#fd971f',
        base0A: '#f4bf75',
        base0B: '#a6e22e',
        base0C: '#a1efe4',
        base0D: '#66d9ef',
        base0E: '#ae81ff',
        base0F: '#cc6633',
    };

    const setViewHandler = (view) => {
        setView(view);
    }

    return (
        <div className="h-[80vh] flex flex-col border border-gray-700 bg-gray-800 text-white text-start">
            <div className="flex justify-between gap-2">
                <div className='flex items-center gap-2 ml-2'>
                    <div className="close bg-[#fc5b57] w-[13px] h-[13px] rounded-full"></div>
                    <div className="close bg-[#e5bf3c] w-[13px] h-[13px] rounded-full"></div>
                    <div className="close bg-[#57c038] w-[13px] h-[13px] rounded-full"></div>
                </div>
                <div className="flex">
                    <button className={`px-4 py-1  ${view === 'json' ? 'bg-blue-500' : 'bg-blue-400'}`} onClick={() => setViewHandler('json')}>JSON</button>
                    <button className={`px-4 py-1  ${view === 'raw' ? 'bg-blue-500' : 'bg-blue-400'}`} onClick={() => setViewHandler('raw')}>RAW</button>
                    <button className={`px-4 py-1  ${view === 'table' ? 'bg-blue-500' : 'bg-blue-400'}`} onClick={() => setViewHandler('table')}>TABLE</button>
                </div>
            </div>

            <div className="overflow-y-auto hide-scroll h-full">
                {
                    view === 'raw' ? <pre>{JSON.stringify(json, null, 2)}</pre> : null
                }
                {
                    view === 'json' ? <JSONTree data={json} theme={theme} /> : null
                }
                {
                    view === 'table' ? <TableView /> : null
                }
            </div>
        </div>
    )
}

export default RequestDetails;