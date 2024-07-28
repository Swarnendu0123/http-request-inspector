import express, { Request, Response } from "express";
import cors from "cors";
const { v4: uuidv4 } = require("uuid");
import dotenv from "dotenv";
import generateRouter from "./routes/suggestion.route";

dotenv.config();

const { BACKEND_URL, FRONTEND_URL } = require("./config");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/v1", (req: Request, res: Response, next: () => void) => {
  if (req.headers.origin === FRONTEND_URL) {
    next();
  } else {
    res.status(403).json({
      error: "Invalid URL",
      message: `You are not authorized to make this request. Please use ${FRONTEND_URL} to make requests.`,
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
  clientSide: string,
  serverSide: string
};

const reqArray: RequestProp[] = [];

const appendToStartIndex = (req: Request) => {	
  const newRequest: RequestProp = {
    url: req.url,
    method: req.method,
    body: req.body,
    headers: req.headers,
    query: req.query,
    params: req.params,
    index: reqArray.length,
    time: new Date().toLocaleTimeString(),
	clientSide: "",
	serverSide: "",
  };
  reqArray.unshift(newRequest);
};

// Generate random path
app.get("/v1", (req: Request, res: Response) => {
  const randomPath = uuidv4();
  const reqUrl = `${BACKEND_URL}/req/${randomPath}`;
  id = randomPath;
  res.send(reqUrl);
});

const handleRequest = (req: Request, res: Response) => {
  if (req.params.id === id) {
    appendToStartIndex(req);
    res.json({
      status: "success",
      message: `Go to ${FRONTEND_URL} and click on refresh button to see the request you just made.`,
    });
    return;
  }
  res.status(400).json({ error: "Invalid ID" });
};

app.get("/req/:id", handleRequest);
app.post("/req/:id", handleRequest);
app.put("/req/:id", handleRequest);
app.delete("/req/:id", handleRequest);
app.patch("/req/:id", handleRequest);

app.get("/allreq", (req: Request, res: Response) => {
  res.json(reqArray);
});

app.use("/generate", generateRouter);

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
