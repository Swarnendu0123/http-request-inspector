import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import dompurify from "dompurify";
import { marked } from "marked";
import selectedMessage from "../store/atoms/selectedReq.atom";
import { BACKEND_URL } from "../../config";

const Suggestions = () => {
  const message = useRecoilValue(selectedMessage);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const res = await axios.post(`${BACKEND_URL}/generate/enhance`, {
          method: "POST",
          body: { message },
        });
        const suggestionsArray = res.data.data.split("<br>");
        setSuggestions(suggestionsArray);
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

  const parseSuggestions = (suggestionsArray: string[]) => {
    return suggestionsArray.map((item) => {
      return dompurify.sanitize(marked.parse(item));
    });
  };

  return (
    <div className="hide-scroll w-full grid justify-center gap-4 overflow-y-auto border h-full border-gray-700 bg-gray-800 text-white text-start">
      {loading ? (
        <div className="w-[15rem]">Generating Suggestions...</div>
      ) : (
        <div className="text-start max-w-96 max-h-[70vh] overflow-y-auto hide-scroll">
          {parseSuggestions(suggestions).map((item, index) => (
            <div
              className="prose dark:prose-invert"
              key={index}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Suggestions;
