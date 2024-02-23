const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const { BACKEND_URL, FRONTEND_URL } = require('./config');
const app = express();
import { Request, Response } from 'express';


app.use(cors())
app.use(express.json());
app.use("/v1", (req: Request, res: Response, next: () => void) => {
    if (req.rawHeaders.includes(FRONTEND_URL)) {
        next();
    } else {
        res.json({ error: "Invalid URL", messege: `You are not authorized to make this request. Please use ${FRONTEND_URL} to make requests.`})
    }
});


let id: string = '';

type RequestProp = {
    url: string;
    method: string;
    body:  Request['body'];
    headers: Request['headers'];
    query: Request['query'];
    params: Request['params'];
    index: number;
    time: string;
}

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
}


// gnerate random path
app.get('/v1', (req: Request, res: Response) => {
    const randomPath = uuidv4();
    const reqUrl = BACKEND_URL + '/req/' + randomPath;
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
            messege: `go to ${FRONTEND_URL} and click on refresh button to see the request you just made.`
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
            messege: `go to ${FRONTEND_URL} and click on refresh button to see the request you just made.`
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
            messege: `go to ${FRONTEND_URL} and click on refresh button to see the request you just made.`
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
            messege: `go to ${FRONTEND_URL} and click on refresh button to see the request you just made.`
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
        console.log(reqArray);
        res.json({
            status: "success",
            messege: `go to ${FRONTEND_URL} and click on refresh button to see the request you just made.`
        });
        return;
    }
    res.json({ error: "Invalid ID" });
});


app.get('/allreq', (req: Request, res: Response) => {
    res.json(reqArray);
});


app.listen(8000, () => {
    console.log('Server listening on port 8000');
});

