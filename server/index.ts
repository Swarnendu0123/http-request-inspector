import express from "express";
const { v4: uuidv4 } = require("uuid");
import cors from "cors";
const { BACKEND_URL, FRONTEND_URL } = require("./config");
const app = express();
import { Request, Response } from "express";
import generateRouter from "./routes/suggestion.route";
import dotenv from "dotenv";

/// Load environment variables
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/v1", (req: Request, res: Response, next: () => void) => {
	if (req.rawHeaders.includes(FRONTEND_URL)) {
		next();
	} else {
		res.json({
			error: "Invalid URL",
			messege: `You are not authorized to make this request. Please use ${FRONTEND_URL} to make requests.`,
		});
	}
});

let id: string = "";

export type RequestProp = {
	url: string;
	method: string;
	body: Request["body"];
	headers: Request["headers"];
	query: Request["query"];
	params: Request["params"];
	index: number;
	time: string;
};

const reqArray: RequestProp[] = [];

const appendToStartIndex = (req: RequestProp) => {
	reqArray.unshift({
		url: req.url,
		method: req.method,
		body: req.body,
		headers: req.headers,
		query: req.query,
		params: req.params,
		index: reqArray.length,
		time: new Date().toLocaleTimeString(),
	});
};

// gnerate random path
app.get("/v1", (req: Request, res: Response) => {
	const randomPath = uuidv4();
	const reqUrl = BACKEND_URL + "/req/" + randomPath;
	id = randomPath;
	res.send(reqUrl);
});

app.get("/req/:id", (req: Request, res: Response) => {
	if (req.params.id === id) {
		appendToStartIndex({
			url: req.url,
			method: req.method,
			body: req.body,
			headers: req.headers,
			query: req.query,
			params: req.params,
			index: reqArray.length,
			time: new Date().toLocaleTimeString(),
		});
		console.log(reqArray);
		res.json({
			status: "success",
			messege: `go to ${FRONTEND_URL} and click on refresh button to see the request you just made.`,
		});
		return;
	}
	res.json({ error: "Invalid ID" });
});

app.post("/req/:id", (req: Request, res: Response) => {
	if (req.params.id === id) {
		appendToStartIndex({
			url: req.url,
			method: req.method,
			body: req.body,
			headers: req.headers,
			query: req.query,
			params: req.params,
			index: reqArray.length,
			time: new Date().toLocaleTimeString(),
		});
		console.log(reqArray);
		res.json({
			status: "success",
			messege: `go to ${FRONTEND_URL} and click on refresh button to see the request you just made.`,
		});
		return;
	}
	res.json({ error: "Invalid ID" });
});

app.put("/req/:id", (req: Request, res: Response) => {
	if (req.params.id === id) {
		appendToStartIndex({
			url: req.url,
			method: req.method,
			body: req.body,
			headers: req.headers,
			params: req.params,
			query: req.query,
			index: reqArray.length,
			time: new Date().toLocaleTimeString(),
		});
		console.log(reqArray);
		res.json({
			status: "success",
			messege: `go to ${FRONTEND_URL} and click on refresh button to see the request you just made.`,
		});
		return;
	}
	res.json({ error: "Invalid ID" });
});

app.delete("/req/:id", (req: Request, res: Response) => {
	if (req.params.id === id) {
		appendToStartIndex({
			url: req.url,
			method: req.method,
			body: req.body,
			headers: req.headers,
			params: req.params,
			query: req.query,
			index: reqArray.length,
			time: new Date().toLocaleTimeString(),
		});
		console.log(reqArray);
		res.json({
			status: "success",
			messege: `go to ${FRONTEND_URL} and click on refresh button to see the request you just made.`,
		});
		return;
	}
	res.json({ error: "Invalid ID" });
});

app.patch("/req/:id", (req: Request, res: Response) => {
	if (req.params.id === id) {
		appendToStartIndex({
			url: req.url,
			method: req.method,
			body: req.body,
			headers: req.headers,
			query: req.query,
			params: req.params,
			index: reqArray.length,
			time: new Date().toLocaleTimeString(),
		});
		res.json({
			status: "success",
			messege: `go to ${FRONTEND_URL} and click on refresh button to see the request you just made.`,
		});
		return;
	}
	res.json({ error: "Invalid ID" });
});

app.get("/allreq", (req: Request, res: Response) => {
	res.json(reqArray);
});

app.use("/generate", generateRouter);

app.listen(8000, () => {
	console.log("Server listening on port 8000");
});

[
	{
		url: "/req/85f61592-0879-40d5-90fe-6587df917510",
		method: "GET",
		body: {},
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
	},
];
