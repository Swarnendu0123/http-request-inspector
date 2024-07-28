import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import dompurify from "dompurify";
import { marked } from "marked";
import selectedMessage from "../store/atoms/selectedReq.atom";
import { BACKEND_URL } from "../../config";
import Button from "./Button.component";

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
    <div className="hide-scroll w-full grid justify-center gap-4 overflow-y-auto border h-full border-gray-700 bg-gray-800 text-white text-start">
      <div>
        <p className="font-bold text-center flex  justify-center">
          Suggestions to improve your code
        </p>
        <p className="flex justify-center  items-center">
          <div className="flex justify-between">
            <div className="p-2">
              <div>
                Client side framework/library:
                <select name="" id="" className="bg-gray-800 border-gray-100 rounded-sm font-bold" onChange={handleClientSideChange}>
                  <option value="react-axios">React.js + Axios</option>
                  <option value="react-fetch">React.js + Fetch</option>
                  <option value="react-fetch">Next.js</option>
                  <option value="vue">Vue.js</option>
                  <option value="angular">Angular</option>
                </select>
              </div>
              <div>
                Server side framework/library:
                <select name="" id="" className="bg-gray-800 border-gray-100 rounded-sm font-bold" onChange={handleServerSideChange}>
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
                  <option value="move">Move</option>
                </select>
              </div>
            </div>
            <div className="w-48 p-2">
              <Button text="Generate" onClick={fetchSuggestions} />
            </div>
          </div>
        </p>
      </div>
      {loading ? (
        <div className="w-[15rem]">
          Generating Suggestions...
        </div>
      ) : (
        <div className="text-start p-2 h-[65vh] max-h-[65vh] overflow-y-auto hide-scroll no-tailwindcss">
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
