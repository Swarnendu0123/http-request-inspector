import { GoogleGenerativeAI } from "@google/generative-ai";
import { RequestProp } from "..";
import { GEMINI_API } from "../config";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";


async function enhance(req: Request, res: any) {
	try {
		const RequestProp: any = req.body;
		// console.log(RequestProp);
		
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


	/// Generate content for the request
	// console.log(request.body);
	
	const prompt = `
	  Here is a request object:
	  Method: ${request.method}
	  Headers: ${JSON.stringify(request.headers, null, 2)}
	  Body: ${JSON.stringify(request.body, null, 2)}
	  Params: ${JSON.stringify(request.params, null, 2)}
	  Query: ${JSON.stringify(request.query, null, 2)}
  
	  Please review the following Request object and provide feedback on potential improvements. Consider aspects like security, efficiency, and best practices. For example, if the user is sending username and password via params, suggest that it would be better if sent in the body and specifically in JSON format. Another example could be if an API endpoint for getting a product is better sent in the params. The response should contain points and code examples.
	  Format the response properly in markdown. Also generate the client side request code in ${request.body.clientSide} for the given request object. and the server side code in ${request.body.serverSide} to handle the request.
	`;

	/// Generate content
	try {
		const { text } = await generateText({
			model: google("models/gemini-1.5-flash-latest"),
			prompt,
		});

		const formattedText = text.replace(/\n/g, "<br>");

		return formattedText;
	} catch (error) {
		console.error("Error generating content:", error);
	}
}

export { enhance };
