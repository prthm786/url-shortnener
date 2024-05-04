const express = require("express");
const { readFile } = require("fs");
require("dotenv").config();

const { connect } = require("./database");

// creating a connection to mongodb
connect(1, 5);

// Importing the util functions
const { storeUrl, searchUrl } = require("./utils");

const app = express();

const port = process.env.PORT;

// Setting up middlewares to be able to read `req.body`
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    readFile("../Front/Home/index.html", "utf8", (err, data) => {
        if (err) {
            // console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.type("html");
            res.send(data);
        }
    })
})

app.get("/home", function (req, res) {
    readFile("../Front/Home/index.html", "utf8", (err, data) => {
        if (err) {
            // console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.type("html");
            res.send(data);
        }
    })
})

app.get("/home/style", function (req, res) {
    readFile("../Front/Home/style.css", "utf8", (err, data) => {
        if (err) {
            // console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.type("css");
            res.send(data);
        }
    })
})

app.get("/home/script", function (req, res) {
    readFile("../Front/Home/script.js", "utf8", (err, data) => {
        if (err) {
            // console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.type("text/javascript");
            res.send(data);
        }
    })
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
        readFile("../Front/404.html", "utf8", (err, data) => {
            if (err) {
                // console.error(err);
                res.status(500).send("Internal Server Error");
            } else {
                res.type("html");
                res.status(404).send(data);
            }
        })
    }
    else
        res.redirect(url);
});

app.listen(port, () => {
       console.log(`App server is running at ${port}`);
});