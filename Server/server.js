import express, { json, urlencoded } from "express";
import { promises } from "fs";
const { readFile } = promises;
import dotconfig from "dotenv"
dotconfig.config();

import { connect } from "./database.js";

// creating a connection to mongodb
connect(1, 5);

// Importing the util functions
import { storeUrl, searchUrl } from "./utils.js";

const app = express();

const port = process.env.PORT;

// Setting up middlewares to be able to read `req.body`
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", async function (req, res) {
    try {
        const data = await readFile("../Front/Home/index.html", "utf8");
        res.type("html");
        res.send(data);
    } catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

app.get("/home", async function (req, res) {
    try {
        const data = await readFile("../Front/Home/index.html", "utf8");
        res.type("html");
        res.send(data);
    } catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

app.get("/home/style", async function (req, res) {
    try {
        const data = await readFile("../Front/Home/style.css", "utf8");
            res.type("css");
        res.send(data);
    } catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

app.get("/home/script", async function (req, res) {
    try {
        const data = await readFile("../Front/Home/script.js", "utf8");
        res.type("text/javascript");
        res.send(data);
    } catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

app.post('/shorten', async (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'Missing url' });
    }

    const shortUrl = await storeUrl(url);
    res.json(`${process.env.BASE_URL}/${shortUrl}`);
});

app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    const url = await searchUrl(shortUrl);

    if (url === "Not Found") {
        try {
            const data = await readFile("../Front/404.html", "utf8");
            res.type("html");
            res.send(data);
        } catch(err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    }
    else
        res.redirect(url);
});

app.listen(port, () => {
       console.log(`App server is running at ${port}`);
});