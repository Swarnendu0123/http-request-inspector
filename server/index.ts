import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
const { v4: uuidv4 } = require("uuid");
import generateRouter from "./routes/suggestion.route";

dotenv.config();

const { BACKEND_URL, FRONTEND_URL } = require("./config");
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/http-request-inspector";

const userModel = require("./database/user.model");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('Connected to database');
  } catch (err) {
    console.error('Error connecting to database', err);
  }
}
connectToMongoDB();

app.use("/v1", (req: Request, res: Response, next: () => void) => {
  if (req.headers.origin === FRONTEND_URL) {
    next();
  } else {
    res.status(403).json({
      error: "Invalid Origin Access",
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
  time: string;
  clientSide: string,
  serverSide: string
};

const appendToStartIndex = async (req: Request, reqURL: String) => {
  const newRequest: RequestProp = {
    url: req.url,
    method: req.method,
    body: req.body,
    headers: req.headers,
    query: req.query,
    params: req.params,
    time: new Date().toLocaleTimeString(),
    clientSide: "",
    serverSide: "",
  };
  const user = await userModel.findOne({ genratedURL: reqURL });
  if (user) {
    user.requests.push(newRequest);
    await user.save();
  }
};

// Generate random path
app.post("/v1", async (req: Request, res: Response) => {
  const name = req.body.name;
  const email = req.body.email;

  const randomPath = uuidv4();
  const reqUrl = `${BACKEND_URL}/req/${randomPath}`;
  id = randomPath;

  const existingUser = await userModel.findOne({ name, email });
  if (!existingUser) {
    await userModel.create({
      name: name,
      email: email,
      genratedURL: reqUrl,
      requests: []
    });
  }
  else {
    await userModel.findOneAndUpdate({ name, email }, { genratedURL: reqUrl });
  }
  res.send(reqUrl);

})

const handleRequest = (req: Request, res: Response) => {
  if (req.params.id === id) {
    const reqURL = `${BACKEND_URL}/req/${id}`;
    appendToStartIndex(req, reqURL);
    res.json({
      status: "success",
      message: `Go to ${FRONTEND_URL} to see the request you just made.`,
    });
    return;
  }
  res.status(400).json({ error: "Session Expired", message: "Please generate a new endpoint URL to make request." });
};

app.get("/req/:id", handleRequest);
app.post("/req/:id", handleRequest);
app.put("/req/:id", handleRequest);
app.delete("/req/:id", handleRequest);
app.patch("/req/:id", handleRequest);

app.post("/allreq", async (req: Request, res: Response) => {
  const name = req.body.name;
  const email = req.body.email;

  const user = await userModel.findOne({ name, email});
  if (user) {
    res.json(user.requests);
  }
  else {
    res.json([]);
  }
});

app.use("/generate", generateRouter);

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
