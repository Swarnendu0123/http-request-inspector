import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import dompurify from "dompurify";
import { marked } from "marked";
import selectedMessage from "../store/atoms/selectedReq.atom";
import { BACKEND_URL } from "../config";
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

const Suggestions = () => {
  const message = useRecoilValue(selectedMessage);
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsedSuggestion, setParsedSuggestion] = useState("");
  const [clientSide, setClientSide] = useState("react-axios");
  const [serverSide, setServerSide] = useState("express");
  const [openSettings, setOpenSettings] = useState(false);

  const toggleSettings = () => {
    setOpenSettings(!openSettings);
  }

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/generate/enhance`, {
        method: "POST",
        body: { message, clientSide, serverSide },
      });
      let suggestionString = res.data.data;
      //  replace <br> with \n
      suggestionString = suggestionString.replace(/<br>/g, "\n");
      setSuggestions(suggestionString);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const parsedSuggestion = dompurify.sanitize(marked.parse(suggestions));
    setParsedSuggestion(parsedSuggestion);
  }, [suggestions]);

  const handleClientSideChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClientSide(e.target.value);
  }

  const handleServerSideChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServerSide(e.target.value);
  }

  // console.log(clientSide, serverSide);

  return (
    <div className="hide-scroll w-full flex flex-col gap-4 overflow-y-auto border border-gray-700 bg-gray-800 text-white text-start h-[80vh]">
      <div className="flex justify-between gap-3 p-2">
        <div className='flex items-center gap-2'>
          <div className="close bg-[#fc5b57] w-[13px] h-[13px] rounded-full"></div>
          <div className="close bg-[#e5bf3c] w-[13px] h-[13px] rounded-full"></div>
          <div className="close bg-[#57c038] w-[13px] h-[13px] rounded-full"></div>
        </div>
        <div className="cursor-pointer" onClick={toggleSettings}>
          <Settings size={20} />
        </div>
      </div>

      {openSettings && (
        <div className="bg-gray-900">
          <div className="p-2 flex justify-between flex-wrap text-sm">
            <div className="m-2 flex" >
              <p className="p-2">
                Client:
              </p>
              <select name="" id="" className={`px-1 bg-blue-500 rounded-md cursor-pointer`} onChange={handleClientSideChange}>
                <option value="react-axios">React.js + Axios</option>
                <option value="react-fetch">React.js + Fetch</option>
                <option value="react-fetch">Next.js</option>
                <option value="vue">Vue.js</option>
                <option value="angular">Angular</option>
              </select>
            </div>
            <div className="m-2 flex">
              <p className="p-2">
                Server:
              </p>
              <select name="" id="" className={`p-1 bg-blue-500 rounded-md cursor-pointer`} onChange={handleServerSideChange}>
                <option value="express">Express.js</option>
                <option value="next">Next.js</option>
                <option value="node">Node.js</option>
                <option value="flask">Flask</option>
                <option value="django">Django</option>
                <option value="rust">Rust</option>
                <option value="go">Go</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="c">C</option>
                <option value="solidity">Solidity</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="w-fit mx-auto border-b pb-2 border-[#FFFFFF59]">
        <p className="font-bold text-[1.1rem] text-center">Suggestions to improve your code</p>
      </div>
      <div className="pt-2">
        <p className="flex justify-center items-center">
          <div className="flex items-center flex-wrap">
            <div className="ml-4">
              <Button onClick={fetchSuggestions}>
                Generate
              </Button>
            </div>
          </div>
        </p>
      </div>
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-center">Generating Suggestions...</p>
        </div>
      ) : (
        <div className="text-start p-2 overflow-y-auto hide-scroll no-tailwindcss">
          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: parsedSuggestion }}
          />
        </div>
      )}
    </div>
  );
};

export default Suggestions;
