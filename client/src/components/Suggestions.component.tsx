import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import dompurify from "dompurify";
import { marked } from "marked";
import selectedMessage from "../store/atoms/selectedReq.atom";
import { BACKEND_URL } from "../config";
import { Button } from "@/components/ui/button"

const Suggestions = () => {
  const message = useRecoilValue(selectedMessage);
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsedSuggestion, setParsedSuggestion] = useState("");
  const [clientSide, setClientSide] = useState("react-axios");
  const [serverSide, setServerSide] = useState("express");

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
    if (message) {
      fetchSuggestions();
    }
  }, [message]);

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

  console.log(clientSide, serverSide);

  return (
    <div className="hide-scroll w-full grid justify-center gap-4 overflow-y-auto border border-gray-700 bg-gray-800 text-white text-start h-[80vh]">
      <div className="pt-2">
        <p className="font-bold text-center flex  justify-center">
          Suggestions to improve your code
        </p>
        <p className="flex justify-center items-center">
          <div className="flex items-center flex-wrap">
            <div className="p-2 flex flex-wrap">
              <div className="m-2 flex" >
                <p className="p-2">
                  Client:
                </p>
                <select name="" id="" className={`px-4 py-1 bg-blue-500 rounded-md`} onChange={handleClientSideChange}>
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
                <select name="" id="" className={`px-4 py-1 bg-blue-500 rounded-md`} onChange={handleServerSideChange}>
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
            <div className="ml-4">
              <Button onClick={fetchSuggestions}>
                Generate
              </Button>
            </div>
          </div>
        </p>
      </div>
      {loading ? (
        <div className="">
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
