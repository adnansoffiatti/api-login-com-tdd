const dotenv = require("dotenv");
const connectToDatabase = require("./db/connect");
dotenv.config();
connectToDatabase();
const express = require("express");
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({});
});

module.exports = app;