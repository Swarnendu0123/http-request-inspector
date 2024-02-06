import { useRecoilState, useSetRecoilState } from "recoil";
import reqUrl from "../store/atoms/reqUlr.atom";
import { BACKEND_URL } from "../../config";
import axios from 'axios';
import allMesseges from "../store/atoms/allMeggeges.atom";

const UrlGnerator = () => {
    const [url, setUrl] = useRecoilState(reqUrl);
    const setMesseges = useSetRecoilState(allMesseges);

    const hanldeGnerate = async () => {
        try {
            const res = await axios.get(BACKEND_URL + "/v1");
            console.log(res, BACKEND_URL + "/v1");
            setUrl(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRefresh = async () => {
        const res = await axios.get(BACKEND_URL + "/allreq")
        console.log(res.data);
        setMesseges(res.data);
    }

    const handleCopyText = () => {
        let textToCopy = document.getElementById("urlText").innerText;
        const copyButton = document.getElementById("copyBtn");

        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        if (textToCopy !== "") {
            copyButton.innerText = "Copied!";
        }
        setTimeout(() => {
            copyButton.innerText = "Copy";
        }, 1000);
    };


    return (
        <div className="grid grid-cols-12 gap-4 pb-3">
            <div className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 col-span-9 relative">
                <div id="urlText">{url}</div>
                <span className="bg-teal-500 py-1.5 px-3 rounded-full text-xs cursor-pointer absolute right-4" onClick={handleCopyText} id="copyBtn">Copy</span>
            </div>
            <div className="col-span-2">
                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-white text-black hover:bg-gray-100" onClick={hanldeGnerate}>
                    Generate endpoint URL
                </button>
            </div>
            <div className="col-span-1">
                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-white text-black hover:bg-gray-100" onClick={handleRefresh}>
                    Refresh
                </button>
            </div>
        </div>
    )
}

export default UrlGnerator;
