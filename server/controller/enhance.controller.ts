import { GoogleGenerativeAI } from "@google/generative-ai";
import { RequestProp } from "..";
import { GEMINI_API } from "../config";
import { generateText, streamText } from "ai";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";

const request = {
	url: "/req/85f61592-0879-40d5-90fe-6587df917510",
	method: "GET",
	body: {
		name: "Swarnendu De",
		age: 25,
		email: "xyz.google,com",
	},
	headers: {
		host: "request-alalyser-b6o4.vercel.app",
		accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
		"accept-encoding": "gzip, deflate, br, zstd",
		"accept-language": "en-US,en;q=0.9,hi;q=0.8",
		dnt: "1",
		forwarded:
			"for=203.110.242.43;host=request-alalyser-b6o4.vercel.app;proto=https;sig=0QmVhcmVyIGNkNjlhNWE3MzkzMTNkMGZlOGFiODhjMjQ0NjU2ZGY2NWJhYWEwYTFlNWRlZWRjZmM1ZGRiN2Y0ZWZjOWQzOGI=;exp=1722070603",
		priority: "u=0, i",
		"sec-ch-ua":
			'"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
		"sec-ch-ua-mobile": "?0",
		"sec-ch-ua-platform": '"Windows"',
		"sec-fetch-dest": "document",
		"sec-fetch-mode": "navigate",
		"sec-fetch-site": "none",
		"sec-fetch-user": "?1",
		"upgrade-insecure-requests": "1",
		"user-agent":
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
		"x-forwarded-for": "203.110.242.43",
		"x-forwarded-host": "request-alalyser-b6o4.vercel.app",
		"x-forwarded-proto": "https",
		"x-real-ip": "203.110.242.43",
		"x-vercel-deployment-url":
			"request-alalyser-b6o4-ppd7poxkx-swarnendus-projects.vercel.app",
		"x-vercel-forwarded-for": "203.110.242.43",
		"x-vercel-id": "bom1::t64rx-1722070303406-75df2e3c421d",
		"x-vercel-ip-as-number": "55847",
		"x-vercel-ip-city": "Kharagpur",
		"x-vercel-ip-continent": "AS",
		"x-vercel-ip-country": "IN",
		"x-vercel-ip-country-region": "WB",
		"x-vercel-ip-latitude": "22.3448",
		"x-vercel-ip-longitude": "87.33",
		"x-vercel-ip-timezone": "Asia/Kolkata",
		"x-vercel-ja4-digest": "t13d1516h2_8daaf6152771_02713d6af862",
		"x-vercel-proxied-for": "203.110.242.43",
		"x-vercel-proxy-signature":
			"Bearer cd69a5a739313d0fe8ab88c244656df65baaa0a1e5deedcfc5ddb7f4efc9d38b",
		"x-vercel-proxy-signature-ts": "1722070603",
		connection: "close",
	},
	query: {},
	params: { id: "85f61592-0879-40d5-90fe-6587df917510" },
	index: 0,
	time: "8:51:43 AM",
};

// interface ApiResponse extends Response {
// 	json: (body: {
// 		success: boolean;
// 		message: string;
// 		data?: any;
// 	}) => Promise<any>;
// }

async function enhance(req: Request, res: any) {
	try {
		const RequestProp: any = req.body;

		/// Enhance the request
		// const response = await enhanceRequest(RequestProp);
		const response = await enhanceRequest(RequestProp);

		if (!response) {
			return res
				.status(400)
				.json({ success: false, message: "Bad Request" });
		}

		res.status(200).json({
			success: true,
			message: "Suggestions fetched successfully",
			data: response,
		});
	} catch (error) {
		console.error("Error fetching suggestions:", error);

		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
}

async function enhanceRequest(request: RequestProp) {
	/// Initialize the Google Generative AI client
	const genAI = new GoogleGenerativeAI(GEMINI_API as string);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	console.log("Api key", GEMINI_API);

	/// Generate content for the request
	const prompt = `
	  Here is a request object:
	  Method: ${request.method}
	  Headers: ${JSON.stringify(request.headers, null, 2)}
	  Body: ${JSON.stringify(request.body, null, 2)}
	  Params: ${JSON.stringify(request.params, null, 2)}
	  Query: ${JSON.stringify(request.query, null, 2)}
  
	  Please review the following Request object and provide feedback on potential improvements. Consider aspects like security, efficiency, and best practices. For example, if the user is sending username and password via params, suggest that it would be better if sent in the body and specifically in JSON format. Another example could be if an API endpoint for getting a product is better sent in the params. The response should contain points and code examples.
	  Format the response properly in markdown.
	`;

	/// Generate content
	try {
		// const result = await streamText({
		// 	model: ("gpt-4-turbo"),
		// 	system: `You are a helpful, respectful and honest assistant.`,
		// 	messages,
		// });
		// // const result = await model.generateContent(prompt);
		// // const response = await result.response;
		// // const text = response.text();

		// return text;

		const { text } = await generateText({
			model: google("models/gemini-1.5-flash-latest"),
			prompt,
		});

		// const { text: newText } = await generateText({
		// 	model: google("models/gemini-1.5-flash-latest"),
		// 	prompt:
		// 		text +
		// 		"Format it properly with html tags and enhance it. Use only htm tags or entities. Replace all new line with <br> tag.",
		// });

		const formattedText = text.replace(/\n/g, "<br>");

		return formattedText;
	} catch (error) {
		console.error("Error generating content:", error);
	}
}

export { enhance };
