import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import dompurify from "dompurify";
import { marked } from "marked";
import selectedMessage from "../store/atoms/selectedReq.atom";
import { BACKEND_URL } from "../../config";

const Suggestions = () => {
  const message = useRecoilValue(selectedMessage);
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const res = await axios.post(`${BACKEND_URL}/generate/enhance`, {
          method: "POST",
          body: { message },
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

    if (message) {
      fetchSuggestions();
    }
  }, [message]);

  const parsedSuggestion = dompurify.sanitize(marked.parse(suggestions));

  return (
    <div className="hide-scroll w-full grid justify-center gap-4 overflow-y-auto border h-full border-gray-700 bg-gray-800 text-white text-start">
      <p className="font-bold text-center">Suggestions to improve your code</p>
      {loading ? (
        <div className="w-[15rem]">Generating Suggestions...</div>
      ) : (
        <div className="text-start max-w-96 max-h-[70vh] overflow-y-auto hide-scroll no-tailwindcss">
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
