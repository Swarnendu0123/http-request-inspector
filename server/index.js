const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const { BACKEND_URL, FRONTEND_URL } = require('./config');
const app = express();


app.use(cors())
app.use(express.json());
app.use("/v1", (req, res, next) => {
    if (req.rawHeaders.includes(FRONTEND_URL)) {
        next();
    } else {
        res.json({ error: "Invalid URL" })
    }
});


let id = '';

const reqArray = [];

const appendToStartIndex = (req) => {
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
app.get('/v1', (req, res) => {
    const randomPath = uuidv4();
    reqUrl = BACKEND_URL + '/req/' + randomPath;
    id = randomPath;
    res.send(reqUrl);
});

app.get("/req/:id", (req, res) => {
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
        res.json({ messege: "success" });
        return;
    }
    res.json({ error: "Invalid ID" });
});


app.post("/req/:id", (req, res) => {
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
        res.json({ messege: "success" });
        return;
    }
    res.json({ error: "Invalid ID" });
});


app.put("/req/:id", (req, res) => {
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
        res.json({ messege: "success" });
        return;
    }
    res.json({ error: "Invalid ID" });
});


app.delete("/req/:id", (req, res) => {
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
        res.json({ messege: "success" });
        return;
    }
    res.json({ error: "Invalid ID" });
});


app.patch("/req/:id", (req, res) => {
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
        res.json({ messege: "success" });
        return;
    }
    res.json({ error: "Invalid ID" });
});


app.get('/allreq', (req, res) => {
    res.json(reqArray);
});


app.listen(8000, () => {
    console.log('Server listening on port 8000');
});

