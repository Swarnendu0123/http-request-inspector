import { useRecoilValue } from "recoil";
import selectedMessege from "../store/atoms/selectedReq.atom";
import { BACKEND_URL } from "../../config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "../../node_modules/react-markdown/index";

const Suggestions = () => {
	const messege = useRecoilValue(selectedMessege);
	const [suggestion, setSuggestion] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchSuggestions();
	}, [messege]);

	const fetchSuggestions = async () => {
		setLoading(true);
		const res = await axios.post(BACKEND_URL + "/generate/enhance", {
			method: "POST",
			body: { messege },
		});
		console.log(res);

		const suggestion = res.data.data.split("<br>");
		setSuggestion(suggestion);
		setLoading(false);
	};

	return (
		<div className="hide-scroll w-full grid justify-center gap-4 overflow-y-auto border h-full border-gray-700 bg-gray-800 text-white">
			<h1 className="font-semibold">Suggestions</h1>
			{loading ? (
				<div className="w-[15rem]">Loading...</div>
			) : (
				<div className="text-start">
					{suggestion.map((item, index) => {
						return <Markdown className={""} key={index}>{item}</Markdown>;
					})}
				</div>
			)}
		</div>
	);
};

export default Suggestions;
